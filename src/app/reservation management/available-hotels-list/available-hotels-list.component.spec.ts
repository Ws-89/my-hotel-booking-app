import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvailableHotelsListComponent } from './available-hotels-list.component';



describe('AvailabilityListComponent', () => {
  let component: AvailableHotelsListComponent;
  let fixture: ComponentFixture<AvailableHotelsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableHotelsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableHotelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
