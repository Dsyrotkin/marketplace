import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostFormComponent} from "./post-form/post-form.component";
import {FormsModule} from "@angular/forms";
import { NewPostFormComponent } from './new-post-form/new-post-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [PostFormComponent, NewPostFormComponent]
})
export class PostModule { }
