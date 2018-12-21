import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserViewComponent } from './create-user-view.component';

describe('CreateUserViewComponent', () => {
  let component: CreateUserViewComponent;
  let fixture: ComponentFixture<CreateUserViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
