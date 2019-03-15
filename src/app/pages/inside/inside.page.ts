import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import * as firebase from 'firebase';


@Component({
  selector: 'app-inside',
  templateUrl: './inside.page.html',
  styleUrls: ['./inside.page.scss'],
})
export class InsidePage implements OnInit {

  itens = [];
  ref = firebase.database().ref('posts/');

  constructor(public auth: AuthService, private router: Router, private menuCtrl: MenuController) { 
    this.ref.on('value', resp =>{
      this.itens = this.snapshotToArray(resp);
    });
    console.log(this.itens);
  }
  
  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
  };

  logout() {
    this.auth.signOut();
    this.router.navigate(['login']);
  }

}
