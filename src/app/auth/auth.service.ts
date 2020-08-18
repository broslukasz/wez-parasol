import { Injectable } from '@angular/core';
import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ui: firebaseui.auth.AuthUI;

  constructor(
      private afAuth: AngularFireAuth,
  ) { }

  getFirebaseUI(): firebaseui.auth.AuthUI {
    if (this.ui) {
      return this.ui;
    }

    return this.createFirebaseUIInstance();
  }

  private createFirebaseUIInstance(): firebaseui.auth.AuthUI {
    this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);

    return this.ui;
  }
}
