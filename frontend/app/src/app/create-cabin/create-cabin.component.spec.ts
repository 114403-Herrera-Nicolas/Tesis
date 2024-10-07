import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCabinComponent } from './create-cabin.component';

describe('CreateCabinComponent', () => {
  let component: CreateCabinComponent;
  let fixture: ComponentFixture<CreateCabinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCabinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCabinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
