import { Component,Input,Output,EventEmitter } from '@angular/core';
import { AddUser } from 'src/app/services/auth.service';

import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  registrationForm: FormGroup;

  nomeTitolareError: string | null = null;
  cognomeTitolareError: string | null = null;
  emailError: string | null = null;
  passwordError: string | null = null;


  @Output() registrationEmit = new EventEmitter<AddUser>();
  @Input() registrationErrors: any | null = null;

  constructor(private fb: FormBuilder,){
    this.registrationForm=this.fb.group({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    })
  }

  register(){
    this.clearErrors();
    if(this.registrationForm.valid){
      let registrationPayload:AddUser={
        firstName:this.registrationForm.value.firstName,
        lastName:this.registrationForm.value.lastName,
        username:this.registrationForm.value.email,
        password:this.registrationForm.value.password
      };
      this.registrationEmit.emit(registrationPayload);
      this.registrationForm.reset();
    }
    else{
      this.setValidationErrors();
    }
  }

  clearErrors(): void {
    this.nomeTitolareError = null;
    this.cognomeTitolareError = null;
    this.emailError = null;
    this.passwordError = null;
  }

  setValidationErrors(): void {
    this.nomeTitolareError = this.registrationForm.get('firstName')?.hasError('required') ? '*' : null;
    this.cognomeTitolareError = this.registrationForm.get('lastName')?.hasError('required') ? '*' : null;
    this.emailError = this.registrationForm.get('email')?.hasError('required') ? '*' : null;
    this.passwordError = this.registrationForm.get('password')?.hasError('required') ? '*' : null;
    }
}
