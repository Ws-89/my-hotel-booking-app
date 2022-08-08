import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestReservationListComponent } from './guest-reservation-list.component';

describe('GuestReservationListComponent', () => {
  let component: GuestReservationListComponent;
  let fixture: ComponentFixture<GuestReservationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestReservationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestReservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
