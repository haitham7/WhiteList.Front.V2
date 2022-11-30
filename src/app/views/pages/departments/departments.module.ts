import { MatSelectModule } from '@angular/material/select';
import { DepartmentDialogBoxComponent } from './department-dialog-box/department-dialog-box.component';
import { DepartmentRoutingModule } from './departments-routing.module';
import { DepartmentComponent } from './departments.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule  } from '@angular/material/form-field';
import { MatInputModule  } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule,
    MatDialogModule ,
    FormsModule, ReactiveFormsModule,
    MatSelectModule,
    NgbModule
  ],
  declarations: [
    DepartmentDialogBoxComponent,
    DepartmentComponent
  ],
  
})
export class DepartmentsModule { }
