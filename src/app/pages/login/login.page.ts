import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { InsidePage } from '../inside/inside.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentialsForm: FormGroup;
  loginError: string;
  splash = true;

  constructor(private navController: NavController, 
              private formBuilder: FormBuilder,
              private auth: AuthService,
              private menuCtrl: MenuController,
              private router: Router) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
    
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // this.splash = false;
    setTimeout(() => { this.splash = false }, 6000)

  }

  onSubmit(){
    let data = this.credentialsForm.value;

    let credentials = {
			email: data.email,
			password: data.password
    };

    this.auth.signInWithEmail(credentials)
      .then(
        () => this.router.navigate(['inside']),
        error => this.loginError = error.message
      );
  }

  register(){
    let data = this.credentialsForm.value;
		let credentials = {
			email: data.email,
			password: data.password
		};
		this.auth.signUp(credentials).then(
      () => this.router.navigate(['inside']),
			error => this.loginError = error.message
		);
  }

  resetPassword() {
    this.router.navigate(['resetpassword'])
  }
  
}
