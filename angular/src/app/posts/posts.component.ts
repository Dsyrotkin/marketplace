import { Component, OnInit } from '@angular/core';
import {PostService} from "../_services/post.service";
import {Post} from "../_models/post";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[];
  filtered: Post[];
  categories: String[];
  selectedCategory: String="Select Category";

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data as Post[];
      this.filtered = this.posts;
      // console.log("ngOnInit(2)" + JSON.stringify(data as Post[]));
    });

  this.postService.getAllCategories().subscribe(data => {
    this.categories = (data as {category: String, _id: String}[]).map(x=> x.category);
      this.categories.unshift(this.selectedCategory);
      // console.log("ngOnInit(2)" + this.categories);
    });

  }

  filter(){
    // console.log("selected category:" + this.selectedCategory);
    if(this.selectedCategory == "Select Category"){
      this.filtered = this.posts;
    }else {
      this.filtered = this.posts.filter(x => x.category == this.selectedCategory);
    }
    // console.log("in filter");
    // console.log(this.filtered);
  }

}