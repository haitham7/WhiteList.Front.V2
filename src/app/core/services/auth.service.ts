import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment';
import {Router} from "@angular/router"

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient,private router:Router) {}

  login() {
        localStorage.setItem('isLoggedin','true');
        this.router.navigate(['/dashboard'])

  }
  
}
