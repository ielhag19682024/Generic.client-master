import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-etl-upload',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './etl-upload.component.html',
  styleUrls: ['./etl-upload.component.css'],
})
export class EtlUploadComponent {
  etlForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.etlForm = this.fb.group({
      country: [''],
      dbType: [''],
      dbServerName: [''],
      dbName: [''],
      tableName: [''],
      tableType: [''],
      file: [null],
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.etlForm.patchValue({ file: input.files[0] });
    }
  }

  onUpload(): void {
    const formData = this.etlForm.value;
    alert(`User Inputs:
    Country: ${formData.country}
    DB Type: ${formData.dbType}
    DB Server Name: ${formData.dbServerName}
    DB Name: ${formData.dbName}
    Table Name: ${formData.tableName}
    Table Type: ${formData.tableType}
    File: ${formData.file?.name || 'No file selected'}
    `);
  }
}
