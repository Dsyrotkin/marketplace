import { Component, OnInit } from '@angular/core';
import {Post} from "../../_models/post";
import {PostService} from "../../_services/post.service";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  currentPost: Post;
  showForm: boolean =true;
  currentClasses: String;
  alertContent: String;
  categories: String[];
  selectedCategory: String;
  constructor(private postService: PostService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.route.params["id"]){
    this.route.params.subscribe(params => this.postService.getPost(params["id"]).subscribe(data => {
      this.currentPost = data as Post;
      //this.postId = (data as Post)._id;
    }));
      this.selectedCategory = this.currentPost.category;
    }else {
      this.currentPost = new Post();
      this.selectedCategory = "";
    }

    this.postService.getAllCategories().subscribe(data => {
      this.categories = (data as {category: String, _id: String}[]).map(x=> x.category);

      console.log("ngOnInit(2)" + this.categories);
    });
  }

  submit(){
    console.log(this.currentPost);
    this.postService.save(this.currentPost).subscribe(
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
