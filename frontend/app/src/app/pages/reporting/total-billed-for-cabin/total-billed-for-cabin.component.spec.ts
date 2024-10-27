import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalBilledForCabinComponent } from './total-billed-for-cabin.component';

describe('TotalBilledForCabinComponent', () => {
  let component: TotalBilledForCabinComponent;
  let fixture: ComponentFixture<TotalBilledForCabinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalBilledForCabinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalBilledForCabinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
