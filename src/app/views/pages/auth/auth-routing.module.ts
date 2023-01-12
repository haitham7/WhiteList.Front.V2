import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { ResisterComponent } from './resister/resister.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { FullLayoutComponent } from '../../shared/layout-components/layout/full-layout/full-layout.component';

const routes: Routes = [  
  {
    path:'',
    component: FullLayoutComponent,
    children: [
      {
        path: 'auth/login',
        component: LoginComponent
      },
      { path: 'auth/register', component: ResisterComponent},
      { path: 'auth/forgot-password', component: ForgetPasswordComponent},
      { path: 'auth/verify-email-address', component: VerifyEmailComponent},
   ]
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
