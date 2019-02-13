import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-inside',
  templateUrl: './inside.page.html',
  styleUrls: ['./inside.page.scss'],
})
export class InsidePage implements OnInit {

  constructor(public auth: AuthService, private router: Router, private menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['login']);
  }

}
