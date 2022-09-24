
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin?: boolean;

  url = environment.BaseUrl + 'api/Account/';

  constructor(private router: Router, private http: HttpClient,private jwtHelper : JwtHelperService) { }

  public login = (form: NgForm) => {
    const credentials = JSON.stringify(form.value);
    console.log(credentials);
    this.http.post(this.url +"Token", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      console.log("Success");
      console.log("Token Is "+token);
      this.router.navigate(["/product"]);
    }, err => {
      this.invalidLogin = true;
      console.log(err)
    });
  }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

}