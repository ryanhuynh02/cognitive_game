import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServerConnectionPage } from './server-connection.page';

const routes: Routes = [
  {
    path: '',
    component: ServerConnectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServerConnectionPageRoutingModule {}
