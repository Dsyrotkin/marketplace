import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { fakeBackendProvider } from './_helpers/index';
import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PostsComponent } from './posts/posts.component';
import {PostService} from "./_services/post.service";
import { PostDetailsComponent } from './post-details/post-details.component';
import { NavigationComponent } from './navigation/navigation.component';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PostsComponent,
    PostDetailsComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    PostService,
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
