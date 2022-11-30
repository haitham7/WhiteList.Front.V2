import { DepartmentComponent } from './departments.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from '../../shared/layout-components/layout/content-layout/content-layout.component';

const routes: Routes = [  
  {
    path:'',
    component: ContentLayoutComponent,
    children: [
     { 
      path: 'Depatments/all',
       component: DepartmentComponent
     }
   ]
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
