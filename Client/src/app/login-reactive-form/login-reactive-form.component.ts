import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-reactive-form',
  templateUrl: './login-reactive-form.component.html',
  styleUrls: ['./login-reactive-form.component.css']
})
export class LoginReactiveFormComponent implements OnInit {
  loginForm = new FormGroup({
    Email:new FormControl('',[Validators.required,Validators.email,Validators.minLength(4)]),
    Password:new FormControl('',Validators.required)
  })
  
  constructor(private FB:FormBuilder) { }
  
  ngOnInit(): void {
   
  }


}
