import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    selectedIndex = 0;
    appPages = [
        {
            title: 'Konto',
            url: 'account',
            icon: 'person-circle'
        },
    ];

    logInAction = {
        title: 'Zaloguj',
        url: 'auth',
        icon: 'log-in'
    };

    logOutAction = {
        title: 'Wyloguj',
        url: '/',
        icon: 'log-out'
    };

    isLoggedIn$: Observable<boolean>;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private afAuth: AngularFireAuth
    ) {
        this.initializeApp();
    }

    ngOnInit() {
        this.isLoggedIn$ = this.afAuth.authState.pipe(map(user => !!user));
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    logOut() {
        this.afAuth.auth.signOut();
    }
}
