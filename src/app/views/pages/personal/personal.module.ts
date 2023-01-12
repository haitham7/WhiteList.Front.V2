import { AddNewPersonalComponent } from './add-new-personal/add-new-personal.component';
import { MatSelectModule } from '@angular/material/select';
import { PersonalDialogBoxComponent } from './personal-dialog-box/personal-dialog-box.component';
import { PersonalRoutingModule } from './personal-routing.module';
import { PersonalComponent } from './personal.component';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatStepperModule} from '@angular/material/stepper';
@NgModule({
  imports: [
    CommonModule,
    PersonalRoutingModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule,
    MatDialogModule ,
    FormsModule, ReactiveFormsModule,
    MatSelectModule,
    NgbModule,
    MatDatepickerModule,
    MatStepperModule
  ],
  declarations: [
    PersonalDialogBoxComponent,
    PersonalComponent,
    AddNewPersonalComponent
  ],
  
})
export class PersonalModule { }
