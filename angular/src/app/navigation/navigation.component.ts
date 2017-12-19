import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../_services";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  loggedIn: boolean;
  user: String;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loggedIn = (localStorage.getItem('currentUser') !== null);
    this.user = localStorage.getItem('currentUser');
  }

  logout(){
    this.authenticationService.logout();
    this.loggedIn = false;
    this.user = null;
  }

}
