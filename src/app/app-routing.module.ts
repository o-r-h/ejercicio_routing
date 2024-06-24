import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [


    // { path: '',      redirectTo: 'home',  pathMatch: 'full' },
    // { path: 'home',  component: HomeComponent, canActivate: [AuthGuard]},
    // { path: 'login', component: LoginComponent },
    // { path: '**',    redirectTo: '404'  },
    // { path: 'chofer', loadChildren: ()=>import('./chofer/chofer.module').then(m=>m.ChoferModule), canActivate: [AuthGuard]},
    // { path: 'transporte', loadChildren: ()=>import('./transporte/transporte.module').then(m=>m.TransporteModule), canActivate: [AuthGuard]},
    // { path: 'pruebas', loadChildren: ()=>import('./pruebas/pruebas.module').then(m=>m.PruebasModule), canActivate: [AuthGuard]},
    // { path: 'guiatransportista', loadChildren: ()=>import('./guiatransportista/guiatransportista.module').then(m=>m.GuiaTransportistaModule), canActivate: [AuthGuard]},


    { path: '',      redirectTo: 'home',  pathMatch: 'full' },
    { path: 'home',  component: HomeComponent},

    { path: '**',    redirectTo: '404'  },
    { path: 'chofer', loadChildren: ()=>import('./chofer/chofer.module').then(m=>m.ChoferModule)},
    { path: 'transporte', loadChildren: ()=>import('./transporte/transporte.module').then(m=>m.TransporteModule), },
    { path: 'pruebas', loadChildren: ()=>import('./pruebas/pruebas.module').then(m=>m.PruebasModule), },
    { path: 'guiatransportista', loadChildren: ()=>import('./guiatransportista/guiatransportista.module').then(m=>m.GuiaTransportistaModule), },

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
