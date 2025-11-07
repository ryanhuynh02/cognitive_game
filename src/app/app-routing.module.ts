// import { NgModule } from '@angular/core';
// import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   {
//     path: 'home',
//     loadComponent: () => import('./home/home.page').then(m => m.HomePage)

//   },
//   {
//     path: '',
//     redirectTo: 'home',
//     pathMatch: 'full'
//   },

//   {
//     path: 'home',
//     loadComponent: () => import('./home/home.page').then(m => m.HomePage)

//   }
//   // {
//   //   path: '',
//   //   redirectTo: 'server-connection',
//   //   pathMatch: 'full'
//   // },
//   // {
//   //   path: 'server-connection',
//   //   loadChildren: () => import('./server-connection/server-connection.module').then( m => m.ServerConnectionPageModule)
//   // },
// ];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
//   ],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'  
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
