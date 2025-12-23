import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  MaybeAsync,
  GuardResult,
  Router,
} from '@angular/router';
import { Authentication } from '../services/authentication';

@Injectable()
export class authorisationGuard implements CanActivate {
  constructor(private authService: Authentication, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this.authService.isAuthenticated) {
      let requiredRoles = route.data['roles'];
      let authUserRoles = this.authService.roles;

      for (let role of authUserRoles) {
        if (requiredRoles.includes(role)) {
          return true;
        }
      }

      return false; 
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}
