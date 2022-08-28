import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate, VersionDetectedEvent } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first, tap, switchMap, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceWorkerService {

  constructor(appRef: ApplicationRef, updates: SwUpdate) {
    // Allow the app to stabilize first, before starting
    // polling for updates with `interval()`.
    const appIsStable$ = appRef.isStable.pipe(
      first(isStable => isStable === true)
    );
    concat(appIsStable$, interval(5000)).subscribe(() => updates.checkForUpdate());

    updates.versionUpdates.pipe(
      filter(({ type }) => type === 'VERSION_DETECTED'),
      map((res) => alert(`New version ${(res as VersionDetectedEvent).version.hash} detected`)),
    ).subscribe();

    updates.versionUpdates.pipe(
      filter(({ type }) => type === 'VERSION_READY'),
      map(() => confirm("New version loaded. Update to the New Version?")),
      filter(Boolean),
      switchMap(() => updates.activateUpdate()),
      filter(Boolean),
      tap(() => document.location.reload()),
    ).subscribe();
  }
}
