import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/api/auth.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup | any;
  constructor(public authService: AuthService, private fb: FormBuilder,private router:Router) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    document.querySelector('body')?.classList.add('login-img');
  }

  ngOnInit() {
    if (localStorage.getItem('isLoggedin')) {
      this.router.navigateByUrl('/dashboard');
    }
  }
  login() {
    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      localStorage.setItem('isLoggedin', 'true');
      this.router.navigateByUrl('/dashboard');
    }, (err: any) =>{
      console.log(err.message);
    });
  }

  ngOnDestroy() {      
    document.querySelector('body')?.classList.remove('login-img');
  }
}
