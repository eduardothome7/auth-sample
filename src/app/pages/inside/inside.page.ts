import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
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
  load : boolean = false;
  ref = firebase.database().ref('posts/');
  query = firebase.database().ref('posts').orderByChild("uid").equalTo(this.auth.getAuthToken());
  form: FormGroup;

  constructor(public auth: AuthService, private router: Router, private formBuilder: FormBuilder, private menuCtrl: MenuController) { 
    this.fetchAll();
  }
  
  ngOnInit() {
    this.menuCtrl.enable(true);

    this.form = this.formBuilder.group({
      title: ['', [Validators.required ]],
      description: ['', [Validators.required ]]
    });
  }

  fetchAll(){
    this.query.on('value', resp =>{
      this.posts = snapshotToArray(resp);
    });
    this.load = true;  
  }

  onSubmit(){
    let data = this.form.value;
		let post = {
			title: data.title,
      description: data.description,
      uid: this.auth.getAuthToken()
		};
    this.ref.push(post);
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['login']);
  }

}
