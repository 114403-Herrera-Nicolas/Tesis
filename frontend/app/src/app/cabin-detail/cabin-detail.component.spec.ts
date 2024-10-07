import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinDetailComponent } from './cabin-detail.component';

describe('CabinDetailComponent', () => {
  let component: CabinDetailComponent;
  let fixture: ComponentFixture<CabinDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CabinDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CabinDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
