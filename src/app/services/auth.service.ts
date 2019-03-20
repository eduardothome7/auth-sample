import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: firebase.User;
  public uid;

  constructor(public fAuth: AngularFireAuth) { 
    fAuth.authState.subscribe(user => {
      this.user = user;
      this.uid = user.uid;
    });
  }

  resetPassword(email: string) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }
  
  getEmail() {
    return this.user && this.user.email;
  }

  getAuthToken(){
    return this.user && this.user.uid;
  } 

  get authenticated(): boolean {
    return this.user !== null;
  }

  isAuthenticated() {
    return this.user;
  }

  signInWithEmail(credentials){
    return this.fAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  signUp(credentials) {
    return this.fAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);  
  }

  signOut(): Promise<void>{
    return this.fAuth.auth.signOut();
  }

}
