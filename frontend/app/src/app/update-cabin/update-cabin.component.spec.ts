import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCabinComponent } from './update-cabin.component';

describe('UpdateCabinComponent', () => {
  let component: UpdateCabinComponent;
  let fixture: ComponentFixture<UpdateCabinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCabinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCabinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
