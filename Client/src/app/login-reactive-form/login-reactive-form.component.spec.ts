import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginReactiveFormComponent } from './login-reactive-form.component';

describe('LoginReactiveFormComponent', () => {
  let component: LoginReactiveFormComponent;
  let fixture: ComponentFixture<LoginReactiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginReactiveFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
