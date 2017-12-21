import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import {AppComponent} from "./app.component";
import {PostsComponent} from "./posts/posts.component";
import {PostDetailsComponent} from "./post-details/post-details.component";
import {PostFormComponent} from "./post/post-form/post-form.component";

const appRoutes: Routes = [
  //{ path: '', component: AppComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'post/:id', component: PostDetailsComponent },
  {path: 'postform/:id', component: PostFormComponent},
  {path: 'postform', component: PostFormComponent},

    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
