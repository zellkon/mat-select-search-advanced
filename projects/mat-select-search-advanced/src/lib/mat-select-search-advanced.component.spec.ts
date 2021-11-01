import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSelectSearchAdvancedComponent } from './mat-select-search-advanced.component';

describe('MatSelectSearchAdvancedComponent', () => {
  let component: MatSelectSearchAdvancedComponent;
  let fixture: ComponentFixture<MatSelectSearchAdvancedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatSelectSearchAdvancedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatSelectSearchAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
