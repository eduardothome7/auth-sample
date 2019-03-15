import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { AuthService } from './services/auth.service';

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
  }

  initializeApp() {
    
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });

    this.auth.fAuth.authState
      .subscribe(
        user => {
          if (user) {
            this.router.navigate(['inside']);
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
