import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {

    ui: firebaseui.auth.AuthUI;

    constructor(
        private ngZone: NgZone,
        private afAuth: AngularFireAuth,
        private nav: NavController,
    ) {
    }

    ngOnInit() {
        const uiConfig: firebaseui.auth.Config = {
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],

            callbacks: {
                signInSuccessWithAuthResult: this.onLoginSuccessfull.bind(this),
            }
        };

        this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);

        this.ui.start('#firebaseui-auth-container', uiConfig);
    }

    ngOnDestroy() {
        this.ui.delete();
    }

    private onLoginSuccessfull() {
        this.ngZone.run(() => {
            this.nav.navigateRoot('/weather/forecast');
        });
    }

}
