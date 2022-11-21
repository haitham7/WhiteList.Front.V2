import { AuthenticationModule } from './views/pages/authentication/authentication.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './views/pages/auth/forget-password/forget-password.component';
import { LoginComponent } from './views/pages/auth/login/login.component';
import { ResisterComponent } from './views/pages/auth/resister/resister.component';
import { VerifyEmailComponent } from './views/pages/auth/verify-email/verify-email.component';
import { AdminGuard } from './views/shared/guard/admin.guard';
import { AuthGuard } from './core/guard/auth.guard';
import { ContentLayoutComponent } from './views/shared/layout-components/layout/content-layout/content-layout.component';
import { ErrorLayoutComponent } from './views/shared/layout-components/layout/error-layout/error-layout.component';
import { FullLayoutComponent } from './views/shared/layout-components/layout/full-layout/full-layout.component';
import { LandingPageLayoutComponent } from './views/shared/layout-components/layout/landingpage-layout/landingpage-layout.component';
import { SwitcherLayoutComponent } from './views/shared/layout-components/layout/switcher-layout/switcher-layout.component';
import { customRoute } from './views/shared/routes/custom.routes';
import { errorRoute } from './views/shared/routes/error.routes';
import { LandingPage } from './views/shared/routes/landingpage';
import { content } from './views/shared/routes/routes copy';
import { switcher } from './views/shared/routes/switchers';
import { SharedModule } from './views/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  // // Vertical layout
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    children: content
  },
  {
    path: '',
    component: SwitcherLayoutComponent,
    canActivate: [AuthGuard],
    children: switcher
  },
  {
    path: '',
    component: ErrorLayoutComponent,
    canActivate: [AuthGuard],
    children: errorRoute
  },
  {
    path: '',
    component: LandingPageLayoutComponent,
    canActivate: [AuthGuard],
    children: LandingPage
  },
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    children: customRoute
  },
  {
    path: '',
    loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () => import('./views/pages/authentication/authentication.module').then(m => m.AuthenticationModule),
  },
  {
    path: '',
    loadChildren: () => import('./views/shared/shared.module').then(m => m.SharedModule),
  },
  {
    path: '**',
    redirectTo: '/error-pages/error-404'
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
