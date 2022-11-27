import { Component, Inject, Optional, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MinistriesService} from '../../../../core/services/api/ministries.service';
import {MinistriesComponent} from '../ministries.component';
declare var require: any;
const Swal = require('sweetalert2');

export interface ministryData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-ministry-dialog-box',
  templateUrl: './ministry-dialog-box.component.html',
})
export class MinistryDialogBoxComponent implements OnInit {
  action:string;
  ministry:any;
  public modelForm: FormGroup | any;
  @ViewChild("component1") component1: MinistriesComponent;

  constructor(
    public dialogRef: MatDialogRef<MinistryDialogBoxComponent>,
    private ministriesService:MinistriesService,
    private fb: FormBuilder,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ministryData) {
    this.ministry = {...data};
    this.action = this.ministry.action;
    this.modelForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  
  addMinistry(){
    if(this.modelForm.status=="INVALID"){
      return;
    }
    this.ministriesService.addNewMinistry(this.modelForm.value).subscribe((res: any) => {
      Swal.fire({
        title: 'تمت الاضافة',
        timer: 1000,
        showConfirmButton: false,
      });
      this.component1.getAllMinistries(1);
    }, (err: any) =>{
      Swal.fire({
        title: 'عذرا يوجد خطأ ..  ',
        timer: 1000,
        showConfirmButton: false,
      });    
    });
    this.dialogRef.close();
  }

  updateMinistry(id:any){
    if(this.modelForm.status=="INVALID"){
      return;
    }
    this.ministriesService.updateMinistry(id,this.modelForm.value).subscribe((res: any) => {
      Swal.fire({
        title: 'تم التعديل',
        timer: 1000,
        showConfirmButton: false,
      });
      this.component1.getAllMinistries(1);
    }, (err: any) =>{
      Swal.fire({
        title: 'عذرا يوجد خطأ ..  ',
        timer: 1000,
        showConfirmButton: false,
      }); 
    });
    this.dialogRef.close();
  }
  
  deleteMinistry(id){
    this.ministriesService.deleteMinistry(id).subscribe((res: any) => {
      Swal.fire({
        title: 'تم الحذف',
        timer: 1000,
        showConfirmButton: false,
      });
      this.component1.getAllMinistries(1);
    }, (err: any) =>{
      Swal.fire({
        title: 'عذرا يوجد خطأ ..  ',
        timer: 1000,
        showConfirmButton: false,
      }); 
    });
    this.dialogRef.close();
  }

  closeDialog(){
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.component1);
  }

}
