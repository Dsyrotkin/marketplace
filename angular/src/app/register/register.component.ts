import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import {RegistrationService} from "../_services/registration.service";

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private alertService: AlertService,
        private registrationService: RegistrationService) { }

    register() {
      this.loading = true;
      this.registrationService.register(this.model.email, this.model.password, this.model.username, this.model.firstName, this.model.lastName)
        .subscribe(
          data => {
            this.alertService.success('Registration successful', true);
            this.router.navigate(['/login']);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    }
}
