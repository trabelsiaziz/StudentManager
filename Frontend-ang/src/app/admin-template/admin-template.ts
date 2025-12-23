import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-admin-template',
  standalone: false,
  templateUrl: './admin-template.html',
  styleUrl: './admin-template.css',
})

export class AdminTemplate {
  constructor(private router: Router, public authService: Authentication) {}
  

  logout() {
    this.authService.logout(); 
  }
}
