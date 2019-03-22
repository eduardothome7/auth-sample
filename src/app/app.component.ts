import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { AuthService } from './services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private auth: AuthService,
    private menuCtrl: MenuController
    ) {
      
      this.initializeApp();
    var messaging = firebase.messaging();

    messaging.usePublicVapidKey("BPJ3p7WHW3POnqTy5QyWzzVyto46MDSlK9_SDwVkwE_hJuAP1GbFuRX9UthmeTj61iRXdvqBsTEgs9N5G9VcfYY");
    
    messaging.requestPermission()
    .then(function() {
      return this.messaging.getToken();
    })
    .catch(function(err) {
      console.log('Unable to get permission to notify.', err);
    });
    
    messaging.onMessage(function(payload){
      console.log('payload:'+payload);
    });
    
  }

  initializeApp() {
    
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });

    this.auth.fAuth.authState
      .subscribe(
        user => {
          if (user) {
            this.router.navigate(['inside', { token: this.auth.uid }]);
          } else {
            this.router.navigate(['login']);
          }
        },
        () => {
          this.router.navigate(['login']);
        }
      );    
  }

  logout(){
    this.menuCtrl.enable(false);
    this.auth.signOut();
    this.router.navigate(['login']);
  }

  getAuth(){
    return this.auth
  }
}
