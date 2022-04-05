import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableHotelComponent } from './available-hotel.component';

describe('AvailableHotelComponent', () => {
  let component: AvailableHotelComponent;
  let fixture: ComponentFixture<AvailableHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
