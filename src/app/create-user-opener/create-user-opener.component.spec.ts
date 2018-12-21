import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserOpenerComponent } from './create-user-opener.component';

describe('CreateUserOpenerComponent', () => {
  let component: CreateUserOpenerComponent;
  let fixture: ComponentFixture<CreateUserOpenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserOpenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
