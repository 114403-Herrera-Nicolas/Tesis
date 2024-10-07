import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinSearchComponent } from './cabin-search.component';

describe('CabinSearchComponent', () => {
  let component: CabinSearchComponent;
  let fixture: ComponentFixture<CabinSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CabinSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CabinSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
