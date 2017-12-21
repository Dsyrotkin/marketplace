import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../_models/post";

@Injectable()
export class PostService {

  posts: Post[];
  constructor(private http: HttpClient) { }

  getAllPosts(){
    return this.http.get('http://localhost:3000/crud/post');
    /*console.log("postservice(2)" + this.posts);
    return this.posts;*/
  }

  getPost(id: String){
    return this.http.get("http://localhost:3000/crud/post/"+id);
  }

  getAllCategories(){
    return this.http.get('http://localhost:3000/category/category');
  }

  save(post: Post){
    return this.http.post("http://localhost:3000/crud/post/"+post._id,post);
  }

  new(post: Post){
    return this.http.post("http://localhost:3000/crud/post/",post);
  }
}
