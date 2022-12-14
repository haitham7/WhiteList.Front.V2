import { Component, Inject, Optional, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DirectoratesService } from '../../../../core/services/api/directorates.service';
import {DirectorateComponent} from '../directorates.component';
import { MinistriesService } from '../../../../core/services/api/ministries.service';
declare var require: any;
const Swal = require('sweetalert2');

export interface directorateData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-directorate-dialog-box',
  templateUrl: './directorate-dialog-box.component.html',
})
export class DirectorateDialogBoxComponent implements OnInit {
  action:string;
  ministryOfDirectorate:any =1;
  directorate:any;
  ministries: any;
  public modelForm: FormGroup | any;
  @ViewChild("component1") component1: DirectorateComponent;

  constructor(
    public dialogRef: MatDialogRef<DirectorateDialogBoxComponent>,
    private directorateService:DirectoratesService,
    private ministriesService:MinistriesService,
    private fb: FormBuilder,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: directorateData) {
    this.directorate = {...data};
    this.action = this.directorate.action;
    if(this.directorate.ministry){
      this.ministryOfDirectorate= this.directorate.ministry.id
    }
    this.modelForm = this.fb.group({
      name: ['', [Validators.required]],
      ministryId:['', [Validators.required]],
    });
  }

  getAllMinistries(){
    this.ministriesService.getAllMinistries().subscribe((res: any) => {   
      this.ministries = res.data;
    }, (err: any) =>{
      console.log(err.message);
    });
  } 

  addDirectorate(){
    if(this.modelForm.status=="INVALID"){
      return;
    }
    this.directorateService.addNewDirectorate(this.modelForm.value).subscribe((res: any) => {
      Swal.fire({
        title: 'تمت الاضافة',
        timer: 1000,
        showConfirmButton: false,
      });
      this.component1.getAllDirectorates(1);
    }, (err: any) =>{
      Swal.fire({
        title: 'عذرا يوجد خطأ ..  ',
        timer: 1000,
        text:err.error? err.error.message : '',
        showConfirmButton: false,
      });    
    });
    this.dialogRef.close();
  }

  updateDirectorate(id:any){
    if(this.modelForm.status=="INVALID"){
      return;
    }
    this.directorateService.updateDirectorate(id,this.modelForm.value).subscribe((res: any) => {
      Swal.fire({
        title: 'تم التعديل',
        timer: 1000,
        showConfirmButton: false,
      });
      this.component1.getAllDirectorates(1);
    }, (err: any) =>{
      Swal.fire({
        title: 'عذرا يوجد خطأ ..  ',
        timer: 1000,
        text:err.error? err.error.message : '',
        showConfirmButton: false,
      }); 
    });
    this.dialogRef.close();
  }
  
  deleteDirectorate(id){
    this.directorateService.deleteDirectorate(id).subscribe((res: any) => {
      Swal.fire({
        title: 'تم الحذف',
        timer: 1000,
        showConfirmButton: false,
      });
      this.component1.getAllDirectorates(1);
    }, (err: any) =>{
      Swal.fire({
        title: 'عذرا يوجد خطأ ..  ',
        timer: 1000,
        text:err.error? err.error.message : '',
        showConfirmButton: false,
      }); 
    });
    this.dialogRef.close();
  }

  closeDialog(){
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getAllMinistries()
  }

}
