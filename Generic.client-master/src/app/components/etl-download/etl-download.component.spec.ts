import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtlDownloadComponent } from './etl-download.component';

describe('EtlDownloadComponent', () => {
  let component: EtlDownloadComponent;
  let fixture: ComponentFixture<EtlDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtlDownloadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtlDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
