import { Component, OnInit } from '@angular/core';
import {Post} from "../_models/post";
import {PostService} from "../_services/post.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {UserService} from "../_services";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  post$: Observable<Post>;
  loggedIn: boolean;
  constructor(private postService: PostService,
              private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.postService.getPost(params["id"]).subscribe(data => this.post$ = data));
     //= this.route.paramMap.switchMap((params: ParamMap) => this.postService.getPost(params.get('id'))) as Observable<Post>;
    this.loggedIn = (localStorage.getItem('currentUser') !== null);
    console.log(localStorage.getItem('currentUser'));
  }

}
