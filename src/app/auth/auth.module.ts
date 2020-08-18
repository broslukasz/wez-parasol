import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthPageRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    AuthPageRoutingModule,
  ]
})
export class AuthPageModule { }
