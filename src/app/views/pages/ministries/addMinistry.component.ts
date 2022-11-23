import { Component, Inject, Optional, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MinistriesService} from '../../../core/services/api/ministries.service';

declare var require: any;
const Swal = require('sweetalert2');
export interface UsersData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-adddialog-box',
  template: `
  <form class="login100-form validate-form" [formGroup]="modelForm">
<div mat-dialog-content class="d-flex justify-content-start">
  <mat-form-field class="text-start" *ngIf="action != 'Delete'; else elseTemplate" class="w-100">
    <input placeholder="{{action}} Name" matInput formControlName="name" [(ngModel)]="ministry.name">
  </mat-form-field>
  <ng-template #elseTemplate>
    Sure to delete <b>{{ministry.name}}</b>?
  </ng-template>
</div>
<div mat-dialog-actions>
  <button mat-button type="submit" *ngIf="action == 'Add'" (click)="addMinistry()">{{action}}</button>
  <button mat-button type="submit" *ngIf="action == 'Update'" (click)="updateMinistry(ministry.id)">{{action}}</button>
  <button mat-button (click)="closeDialog()" mat-flat-button color="warn">Cancel</button>
</div>
  </form>
  `,
  styles: [
  ]
})
export class AddMininstryComponent implements OnInit {

  action:string;
  ministry:any;
  public modelForm: FormGroup | any;
   
  constructor(
    public dialogRef: MatDialogRef<AddMininstryComponent>,
    private ministriesService:MinistriesService,
    private fb: FormBuilder,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
    console.log(data);
    this.ministry = {...data};
    this.action = this.ministry.action;
    this.modelForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  addMinistry(){
    console.log(this.modelForm.status);
    if(this.modelForm.status=="INVALID"){
      return;
    }
    this.ministriesService.addNewMinistry(this.modelForm.value).subscribe((res: any) => {
      Swal.fire({
        title: 'تمت الاضافة',
        timer: 1000,
        showConfirmButton: false,
      });
    }, (err: any) =>{
      console.log(err.message);
    });
    this.dialogRef.close({event:this.action,data:this.ministry});
  }

  updateMinistry(id:any){
    console.log(this.modelForm.status);
    if(this.modelForm.status=="INVALID"){
      return;
    }
    this.ministriesService.updateMinistry(id,this.modelForm.value).subscribe((res: any) => {
      Swal.fire({
        title: 'تم التعديل',
        timer: 1000,
        showConfirmButton: false,
      });
    }, (err: any) =>{
      console.log(err.message);
    });
    this.dialogRef.close({event:this.action,data:this.ministry});
  }
  

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  ngOnInit(): void {
  }

}
