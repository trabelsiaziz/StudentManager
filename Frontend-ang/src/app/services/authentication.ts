import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Authentication {
  public isAuthenticated: boolean = true;
  public username: any;
  public roles: string[] = [];

  constructor(private router: Router){}

  public users: any = {
    admin: { password: 'az', roles: ['ADMIN', 'STUDENT'] },
    user: { password: 'az', roles: ['STUDENT'] },
  };

  public login(username: string, password: string) {
    if (this.users[username] && password == this.users[username]['password']) {
      this.isAuthenticated = true;
      this.username = username;
      this.roles = this.users[username]['roles'];
      return true;
    }
    return false;
  }

  public logout(){
    this.isAuthenticated = false; 
    this.username = undefined; 
    this.roles = [];
    this.router.navigateByUrl('');
  }
}
