import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../_services/post.service";
import {Post} from "../../_models/post";
import {User} from "../../_models/user";

@Component({
  selector: 'app-new-post-form',
  templateUrl: './new-post-form.component.html',
  styleUrls: ['./new-post-form.component.css']
})
export class NewPostFormComponent implements OnInit {
   currentPost: Post;
   showForm: boolean =true;
   currentClasses: String;
   alertContent: String;
   categories: String[];
   selectedCategory: String;
  //file: String;

  constructor(private postService: PostService,
              private route: ActivatedRoute) {
    this.currentPost = new Post({id: null, title: "", description: "", location: {state: "", city: "", zip: ""},
      imageUrl: "", created_at: null, updated_at: null, sold: false, category: "", username:""});
    this.selectedCategory = "Automotive";

  }

  ngOnInit() {
    this.postService.getAllCategories().subscribe(data => {
      this.categories = (data as {category: String, _id: String}[]).map(x=> x.category);
      //this.selectedCategory = (data as {category: String, _id: String}[]).map(x=> x.category)[0];
      //console.log(this.categories);
      this.testasync();
    });
  }

  testasync(){
    console.log(this.categories);
    this.currentPost.category = this.categories[0];
    this.selectedCategory = this.categories[0];
    //console.log(this.selectedCategory);
  }

  submit(){
    console.log(this.currentPost);
    this.currentPost.username = (JSON.parse(localStorage.getItem("currentUser")) as User).username;
    this.currentPost._id = null;

    this.postService.new(this.currentPost).subscribe(
      data => {
        this.alertContent = "Post Saved successfully";

        this.currentClasses = "alert alert-success";
        this.showForm = false;
      } ,
      err => {
        this.alertContent = "Error Saving the post";
        this.currentClasses = "alert alert-danger";

        this.showForm = false;
      });
  }

}
