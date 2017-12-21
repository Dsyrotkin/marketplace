import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../_services";
import {User} from "../_models";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  loggedIn: boolean;
  user: User;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loggedIn = (localStorage.getItem('currentUser') !== null);
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.authenticationService.loggedIn.subscribe(data => {
      this.loggedIn = data;
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    });
    console.log(this.user);
  }

  logout(){
    this.authenticationService.logout();
    this.loggedIn = false;
    this.user = null;
  }

}
