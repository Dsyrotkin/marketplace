import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";


@Directive({
  selector: '[appUsername]',
  providers: [{provide: NG_VALIDATORS, useExisting: UsernameDirective, multi: true}]
})
export class UsernameDirective implements Validator{
  validate(c: AbstractControl): { [key: string]: any; } {
    // throw new Error('Method not implemented.');
    // console.log('in directive:' + c.value);
    // return checkId(c.value);
    const forbidden = (c.value && c.value.includes("@"));
    return forbidden ? {'appUsername': {value: c.value}} : null;
  }

  constructor() { }

}
