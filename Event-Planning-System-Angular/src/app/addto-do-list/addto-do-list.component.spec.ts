import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtoDoListComponent } from './addto-do-list.component';

describe('AddtoDoListComponent', () => {
  let component: AddtoDoListComponent;
  let fixture: ComponentFixture<AddtoDoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddtoDoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddtoDoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
