import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppComponent } from 'src/app/app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import * as firebase from 'firebase';
import { snapshotToArray } from '../../helpers/util';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.page.html',
  styleUrls: ['./inside.page.scss'],
})
export class InsidePage implements OnInit {

  posts : any[];
  private user :any;
  load : boolean = false;
  private ref :any;
  form: FormGroup;

  constructor(public auth: AuthService, 
              private router: Router, 
              private currentRouter: ActivatedRoute,
              private formBuilder: FormBuilder, 
              private menuCtrl: MenuController) { 
  }
  
  ngOnInit() {
    
    this.menuCtrl.enable(true);
    
    this.user = this.currentRouter.snapshot.paramMap.get("token");
    this.ref  = firebase.database().ref(`users/`+this.user+`/posts/`);  
    
    this.fetchAll();
    
    this.form = this.formBuilder.group({
      title: ['', [Validators.required ]],
      description: ['', [Validators.required ]]
    });
  }
  
  fetchAll(){
    this.ref.on('value', resp =>{
      this.posts = snapshotToArray(resp);
    });
    this.load = true;  
  }

  onSubmit(){
    let data = this.form.value;
		let post = {
			title: data.title,
      description: data.description
		};
    this.ref.push(post);
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['login']);
  }

}
