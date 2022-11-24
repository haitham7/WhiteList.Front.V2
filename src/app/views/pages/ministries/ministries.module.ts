import { MinistriesComponent } from './ministries.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MinistriesRoutingModule } from './ministries-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule  } from '@angular/material/form-field';
import { MatInputModule  } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MinistryDialogBoxComponent } from './ministry-dialog-box/ministry-dialog-box.component';
@NgModule({
  imports: [
    CommonModule,
    MinistriesRoutingModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule,
    MatDialogModule ,
    FormsModule, ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    MinistryDialogBoxComponent,
    MinistriesComponent
  ],
  
})
export class MinistriesModule { }
