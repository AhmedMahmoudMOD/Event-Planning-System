import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittoDoListComponent } from './editto-do-list.component';

describe('EdittoDoListComponent', () => {
  let component: EdittoDoListComponent;
  let fixture: ComponentFixture<EdittoDoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdittoDoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdittoDoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
