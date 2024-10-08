import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureFilterComponent } from './feature-filter.component';

describe('FeatureFilterComponent', () => {
  let component: FeatureFilterComponent;
  let fixture: ComponentFixture<FeatureFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeatureFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
