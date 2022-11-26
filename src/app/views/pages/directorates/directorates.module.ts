import { MatSelectModule } from '@angular/material/select';
import { DirectorateDialogBoxComponent } from './directorate-dialog-box/directorate-dialog-box.component';
import { DirectorateRoutingModule } from './directorates-routing.module';
import { DirectorateComponent } from './directorates.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
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
    DirectorateRoutingModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule,
    MatDialogModule ,
    FormsModule, ReactiveFormsModule,
    MatSelectModule,
    NgbModule
  ],
  declarations: [
    DirectorateDialogBoxComponent,
    DirectorateComponent
  ],
  
})
export class DirectoratesModule { }
