import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  // {
  //   path:,
  //   component:
  // },
  {
    path: 'llantas',
    loadChildren: ()=>import('./llantas/llantas.module').then(m=>m.LlantasModule)
  },
  {
    path: 'almacen',
    loadChildren: () => import('./almacen/almacen.module').then(m=>m.AlmacenModule)
  },
  { path: '**',
      redirectTo: 'home'
  },


]

@NgModule({
  imports :[
    RouterModule.forRoot( routes)
  ],
  exports : [
    RouterModule,
  ]
})
export class AppRoutingModule { }
