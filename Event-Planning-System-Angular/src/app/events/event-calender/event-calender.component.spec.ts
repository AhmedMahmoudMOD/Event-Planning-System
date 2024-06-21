import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCalenderComponent } from './event-calender.component';

describe('EventCalenderComponent', () => {
  let component: EventCalenderComponent;
  let fixture: ComponentFixture<EventCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCalenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
