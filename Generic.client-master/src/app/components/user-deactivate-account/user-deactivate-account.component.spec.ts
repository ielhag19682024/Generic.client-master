import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeactivateAccountComponent } from './user-deactivate-account.component';

describe('UserDeactivateAccountComponent', () => {
  let component: UserDeactivateAccountComponent;
  let fixture: ComponentFixture<UserDeactivateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDeactivateAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDeactivateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
