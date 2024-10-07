import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCabinPageComponent } from './search-cabin-page.component';

describe('SearchCabinPageComponent', () => {
  let component: SearchCabinPageComponent;
  let fixture: ComponentFixture<SearchCabinPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCabinPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchCabinPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
