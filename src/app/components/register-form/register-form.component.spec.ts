import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterFormComponent } from './register-form.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthenticationService } from '../../services/authentication.service';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<RegisterFormComponent>;

  beforeEach(async () => {

    const authStub = {};

    await TestBed.configureTestingModule({
      imports: [RegisterFormComponent, NoopAnimationsModule],
      providers: [provideHttpClientTesting(), {provide: AuthenticationService, useValue: authStub}, provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validates correctyly inputs', () =>{
    const emailInput = debugElement.query(By.css('[data-testid="email"]'));
    emailInput.nativeElement.value = 'armando';
    emailInput.nativeElement.dispatchEvent(new Event('input'));
    emailInput.nativeElement.dispatchEvent(new Event('blur')); // Mark as touched
    fixture.detectChanges();

    const emailError = debugElement.query(By.css('[data-testid="email-error"]'));
    expect(emailError).not.toBeNull();
  })
});
