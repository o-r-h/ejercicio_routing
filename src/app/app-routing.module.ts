import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Error404PageComponent } from './shared/pages/Error404Page/Error404Page.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [


  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.component').then( m => m.HomeComponent ),
  // },
  {
    path: 'home',
    component: HomeComponent,
  },

  // {
  //   path: '404',
  //   component: Error404PageComponent,
  // },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: '404'
  },

  {
    path: 'chofer',
    loadChildren: ()=>import('./chofer/chofer.module').then(m=>m.ChoferModule)
  },
  {
    path: 'almacen',
    loadChildren: () => import('./almacen/almacen.module').then(m=>m.AlmacenModule)
  },


]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
