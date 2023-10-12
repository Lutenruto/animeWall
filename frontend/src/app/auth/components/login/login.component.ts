import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // onLogin() {
  //   if (this.loginForm.valid) {
  //     const email = this.loginForm.get('email')?.value;
  //     const password = this.loginForm.get('password')?.value;
  //     this.authService.login(email,password);      
  //   }
  // }
  onLogin() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService.login(email, password).subscribe(response => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        // Utilisez le token et le userId comme vous le souhaitez
        console.log('Token : ', token);
        console.log('UserId : ', userId);        
      });
    }
  }

  // onSignup() {
  //   if (this.signupForm.valid) {
  //     const email = this.signupForm.get('email')?.value;
  //     const password = this.signupForm.get('password')?.value;
  //     // Appeler le service pour se connecter
  //     this.authService.signup(email,password)
  //   }
  // }

}
