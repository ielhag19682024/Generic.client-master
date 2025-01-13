import { Component } from '@angular/core';
import { EtlDataProcessingComponent } from '../etl-data-processing/etl-data-processing.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [EtlDataProcessingComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
