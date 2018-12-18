import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryViewComponent } from './create-category-view.component';

describe('CreateCategoryViewComponent', () => {
  let component: CreateCategoryViewComponent;
  let fixture: ComponentFixture<CreateCategoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCategoryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
