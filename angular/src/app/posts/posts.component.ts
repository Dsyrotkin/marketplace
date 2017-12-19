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
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data as Post[];
      this.filtered = this.posts;
      console.log("ngOnInit(1)" + JSON.stringify(data as Post[]));
    });

  }

}
