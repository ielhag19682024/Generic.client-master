import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtlDataProcessingComponent } from './etl-data-processing.component';

describe('EtlDataProcessingComponent', () => {
  let component: EtlDataProcessingComponent;
  let fixture: ComponentFixture<EtlDataProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtlDataProcessingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtlDataProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
