import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { IonicModule } from '@ionic/angular';
import { AccountComponent } from './account.component';

@NgModule({
    declarations: [
        AccountComponent,
    ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        IonicModule,
    ]
})
export class AccountPageModule {
}
