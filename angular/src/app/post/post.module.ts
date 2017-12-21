import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostFormComponent} from "./post-form/post-form.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [PostFormComponent]
})
export class PostModule { }
