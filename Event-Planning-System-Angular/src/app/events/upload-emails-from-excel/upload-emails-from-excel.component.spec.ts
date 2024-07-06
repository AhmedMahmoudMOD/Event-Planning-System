import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadEmailsFromExcelComponent } from './upload-emails-from-excel.component';

describe('UploadEmailsFromExcelComponent', () => {
  let component: UploadEmailsFromExcelComponent;
  let fixture: ComponentFixture<UploadEmailsFromExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadEmailsFromExcelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadEmailsFromExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
