import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-etl-download',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './etl-download.component.html',
  styleUrls: ['./etl-download.component.css'],
})
export class EtlDownloadComponent {
  downloadForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.downloadForm = this.fb.group({
      symbol: [''],
      dateRange: [''],
      columns: [''],
      reportType: [''],
    });
  }

  onDownload(): void {
    const formData = this.downloadForm.value;
    alert(`User Inputs:
    Symbol: ${formData.symbol}
    Date Range: ${formData.dateRange || 'Not selected'}
    Columns: ${formData.columns}
    Report Type: ${formData.reportType}`);
  }
}
