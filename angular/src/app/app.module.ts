import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, RegistrationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PostsComponent } from './posts/posts.component';
import {PostService} from "./_services/post.service";
import { PostDetailsComponent } from './post-details/post-details.component';
import { NavigationComponent } from './navigation/navigation.component';

import {PostModule} from "./post/post.module";

import { UsernameDirective } from './_directives/username.directive';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PostsComponent,
    PostDetailsComponent,
    NavigationComponent,
    UsernameDirective,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    FormsModule,
    PostModule,
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    RegistrationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
