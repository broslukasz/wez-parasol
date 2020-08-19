import { Component, OnInit } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

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
        icon: 'log-out'
    };

    isLoggedIn$: Observable<boolean>;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private afAuth: AngularFireAuth,
        private nav: NavController,
        private authService: AuthService,
    ) {
        this.initializeApp();
    }

    ngOnInit() {
        this.authService.watchAuthState$.subscribe(() => {
            this.isLoggedIn$ = this.afAuth.authState.pipe(map(user => !!user));
        });

        this.isLoggedIn$ = this.afAuth.authState.pipe(map(user => !!user));
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    logOut() {
        from(this.afAuth.auth.signOut()).pipe(first())
            .subscribe(() => this.nav.navigateRoot('/weather/forecast'));
    }
}
