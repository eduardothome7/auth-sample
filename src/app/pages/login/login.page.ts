import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
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

  constructor(private navController: NavController, 
              private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
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

}
