import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthPageRoutingModule } from './auth-routing.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    AuthPageRoutingModule,
    IonicModule,
  ]
})
export class AuthPageModule { }
