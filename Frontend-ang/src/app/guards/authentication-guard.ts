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
export class authenticationGuard implements CanActivate {
  constructor(private authService: Authentication, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this.authService.isAuthenticated) return true;
    this.router.navigateByUrl('/login');
    return false;
  }
}
