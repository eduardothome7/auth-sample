import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {

  credentialsForm: FormGroup;
  loginError: string;

  constructor(private navController: NavController, 
              private formBuilder: FormBuilder,
              private auth: AuthService,
              private menuCtrl: MenuController,
              private router: Router) { }
              
  ngOnInit() {
    
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
              
  }

  onSubmit(){
    let data = this.credentialsForm.value;

    this.auth.resetPassword(data.email)
    .then(
      () => this.loginError = "Email enviado com instruções"
    )

  }
}
