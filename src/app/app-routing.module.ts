import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [


    { path: '',      redirectTo: 'home',  pathMatch: 'full' },
    { path: 'home',  component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: '**',    redirectTo: '404'  },
    { path: 'chofer', loadChildren: ()=>import('./chofer/chofer.module').then(m=>m.ChoferModule), canActivate: [AuthGuard]},
    { path: 'transporte', loadChildren: ()=>import('./transporte/transporte.module').then(m=>m.TransporteModule), canActivate: [AuthGuard]},
    { path: 'almacen',loadChildren: () => import('./almacen/almacen.module').then(m=>m.AlmacenModule)},


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
