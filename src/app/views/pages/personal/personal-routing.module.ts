import { PersonalComponent } from './personal.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from '../../shared/layout-components/layout/content-layout/content-layout.component';
import { AddNewPersonalComponent } from './add-new-personal/add-new-personal.component';

const routes: Routes = [  
  {
    path:'',
    component: ContentLayoutComponent,
    children: [
     { 
      path: 'Customers/all',
       component: PersonalComponent
     },
     { 
      path: 'Customers/addNew',
       component: AddNewPersonalComponent
     }
   ]
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
