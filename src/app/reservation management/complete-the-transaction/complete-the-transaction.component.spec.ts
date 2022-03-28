import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTheTransactionComponent } from './complete-the-transaction.component';

describe('CompleteTheTransactionComponent', () => {
  let component: CompleteTheTransactionComponent;
  let fixture: ComponentFixture<CompleteTheTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteTheTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteTheTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
