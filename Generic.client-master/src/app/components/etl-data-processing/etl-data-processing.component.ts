import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtlUploadComponent } from '../etl-upload/etl-upload.component';
import { EtlDownloadComponent } from '../etl-download/etl-download.component';

@Component({
  selector: 'app-etl-data-processing',
  standalone: true,
  imports: [EtlUploadComponent, EtlDownloadComponent, CommonModule],
  templateUrl: './etl-data-processing.component.html',
  styleUrl: './etl-data-processing.component.css'
})
export class EtlDataProcessingComponent {
  selectedView: 'upload' | 'download' = 'upload';

  switchView(view: 'upload' | 'download'): void {
    this.selectedView = view;
  }
}
