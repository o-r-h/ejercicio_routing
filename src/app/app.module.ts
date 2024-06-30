
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';
import { enconstruccionPageComponent } from './enconstruccion/enconstruccionpage.component';
import { Error404pageComponent } from './error404page/error404page.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    enconstruccionPageComponent,
    Error404pageComponent


  ],

  imports: [
    MaterialModule,
    SharedModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()



  ],
  providers: [AuthGuard, AuthService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-pe' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
