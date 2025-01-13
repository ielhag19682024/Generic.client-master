import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtlUploadComponent } from './etl-upload.component';

describe('EtlUploadComponent', () => {
  let component: EtlUploadComponent;
  let fixture: ComponentFixture<EtlUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtlUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtlUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
