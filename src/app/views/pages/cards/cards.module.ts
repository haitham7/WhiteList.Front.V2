import { CardComponent } from './cards.component';
import { MatSelectModule } from '@angular/material/select';
import { CardDialogBoxComponent } from './card-dialog-box/card-dialog-box.component';
import { CardRoutingModule } from './cards-routing.module';
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

@NgModule({
  imports: [
    CommonModule,
    CardRoutingModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule,
    MatDialogModule ,
    FormsModule, ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    NgbModule
  ],
  declarations: [
    CardDialogBoxComponent,
    CardComponent
  ],
  
})
export class CardsModule { }
