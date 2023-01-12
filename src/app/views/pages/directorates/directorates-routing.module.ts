import { DirectorateComponent } from './directorates.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from '../../shared/layout-components/layout/content-layout/content-layout.component';

const routes: Routes = [  
  {
    path:'',
    component: ContentLayoutComponent,
    children: [
     { 
      path: 'Directorates/all',
       component: DirectorateComponent
     }
   ]
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectorateRoutingModule { }
