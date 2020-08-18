import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

    ui: firebaseui.auth.AuthUI;

    constructor(
        private authService: AuthService,
    ) {
    }

    ngOnInit() {
        const uiConfig = {
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],

            callbacks: {
                signInSuccessWithAuthResult: this.onLoginSuccessfull.bind(this),
            }
        };

        this.ui = this.authService.getFirebaseUI();

        this.ui.start('#firebaseui-auth-container', uiConfig);
    }

    private onLoginSuccessfull() {

    }

}
