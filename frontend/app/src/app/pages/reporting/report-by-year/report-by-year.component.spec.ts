import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByYearComponent } from './report-by-year.component';

describe('ReportByYearComponent', () => {
  let component: ReportByYearComponent;
  let fixture: ComponentFixture<ReportByYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportByYearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
