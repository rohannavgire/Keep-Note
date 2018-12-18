import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryOpenerComponent } from './create-category-opener.component';

describe('CreateCategoryOpenerComponent', () => {
  let component: CreateCategoryOpenerComponent;
  let fixture: ComponentFixture<CreateCategoryOpenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCategoryOpenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategoryOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
