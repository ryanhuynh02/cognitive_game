import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServerConnectionPageRoutingModule } from './server-connection-routing.module';

import { ServerConnectionPage } from './server-connection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ServerConnectionPageRoutingModule
  ],
  declarations: [ServerConnectionPage]
})
export class ServerConnectionPageModule {}
