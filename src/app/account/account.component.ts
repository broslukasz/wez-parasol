import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

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
    ) {
    }

    ngOnInit() {
        this.pictureUrl$ = this.afAuth.authState.pipe(map(user => user ? user.photoURL : null));
        this.email$ = this.afAuth.authState.pipe(map(user => user ? user.email : null));
    }
}
