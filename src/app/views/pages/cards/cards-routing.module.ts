import { CardComponent } from './cards.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from '../../shared/layout-components/layout/content-layout/content-layout.component';

const routes: Routes = [  
  {
    path:'',
    component: ContentLayoutComponent,
    children: [
     { 
      path: 'Cards/all',
       component: CardComponent
     }
   ]
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardRoutingModule { }
