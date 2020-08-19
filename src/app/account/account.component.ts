import { Component, NgZone, OnInit } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
    pictureUrl$: Observable<string>;
    email$: Observable<string>;

    constructor(
        private afAuth: AngularFireAuth,
        private ngZone: NgZone,
        private nav: NavController,
        private router: Router,
        private authService: AuthService,
    ) {
    }

    ngOnInit() {
        this.pictureUrl$ = this.afAuth.authState.pipe(map(user => user ? user.photoURL : null));
        this.email$ = this.afAuth.authState.pipe(map(user => user ? user.email : null));
    }

    deleteAccount() {
        from(this.afAuth.auth.currentUser.providerData).pipe(
            mergeMap((userInfo: firebase.UserInfo) => {
                switch (userInfo.providerId) {
                    case 'google.com':
                        return this.afAuth.auth.currentUser.reauthenticateWithPopup(new firebase.auth.GoogleAuthProvider());
                    default:
                        return of(userInfo);
                }
            }))
            .pipe(
                mergeMap(() => this.afAuth.auth.currentUser.delete())
            )
            .subscribe(() => {
                this.ngZone.run(() => {
                    this.authService.watchAuthState$.next();
                    this.nav.navigateRoot('weather/forecast');
                });
            });
    }
}
