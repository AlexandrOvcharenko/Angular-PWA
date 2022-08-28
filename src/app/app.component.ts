import { Component } from '@angular/core';
import { ServiceWorkerService } from './service-worker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-pwa-1';
  constructor(serviceWorker: ServiceWorkerService) {
  }
}
