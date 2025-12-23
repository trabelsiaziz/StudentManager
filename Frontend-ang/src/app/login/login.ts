import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})


export class Login implements OnInit{
  public loginFormGroup! : FormGroup; 
  
  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: Authentication
  ){
  }
  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      username: this.fb.control(''), 
      password: this.fb.control('')
    })
  }

  login(){
    let username = this.loginFormGroup.value.username; 
    let password = this.loginFormGroup.value.password; 
    let res = this.authService.login(username, password); 
    if(res) {
      alert("Success!!"); 
      this.router.navigateByUrl('/admin'); 
    }
    else alert("Login Failed!!"); 
  }

}
