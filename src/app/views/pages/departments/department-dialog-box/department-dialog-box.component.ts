import { departments } from './../departments.component';
import { DirectoratesService } from './../../../../core/services/api/directorates.service';
import { latLng } from 'leaflet';
import { DepartmentService } from './../../../../core/services/api/departments.service';
import { Component, Inject, Optional, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DepartmentComponent} from '../departments.component';
import { MinistriesService } from '../../../../core/services/api/ministries.service';
declare var require: any;
const Swal = require('sweetalert2');

export interface departmentData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-department-dialog-box',
  templateUrl: './department-dialog-box.component.html',
})
export class DepartmentDialogBoxComponent implements OnInit {
  action:string;
  directorateOfDepartment:any =1;
  ministryOfDirectorate:any=1;
  department:any;
  ministries: any;
  directorates: any;
  public modelForm: FormGroup | any;
  @ViewChild("component1") component1: DepartmentComponent;

  constructor(
    public dialogRef: MatDialogRef<DepartmentDialogBoxComponent>,
    private directorateService:DirectoratesService,
    private ministriesService:MinistriesService,
    private departmentService:DepartmentService,
    private fb: FormBuilder,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: departmentData) {
    this.department = {...data};
    this.action = this.department.action;
    if(this.department.directorate){
      this.ministryOfDirectorate= this.department.directorate.ministry.id;
      this.directorateOfDepartment= this.department.directorate.id;
    }
    this.getDirectorateByMinistries(this.ministryOfDirectorate)
    this.modelForm = this.fb.group({
      name: ['', [Validators.required]],
      directorateId:['', [Validators.required]],
    });
  }

  getAllMinistries(){
    this.ministriesService.getAllMinistries().subscribe((res: any) => {   
      this.ministries = res.data;
    }, (err: any) =>{
      console.log(err.message);
    });
  } 
  getDirectorateByMinistries(ministryId){
    this.directorateService.getDirectorateByMinistry(ministryId).subscribe((res: any) => {   
      this.directorates = res.data;
    }, (err: any) =>{
      console.log(err.message);
    });
  } 

  addDepartment(){
    if(this.modelForm.status=="INVALID"){
      return;
    }
    this.departmentService.addNewDepartment(this.modelForm.value).subscribe((res: any) => {
      Swal.fire({
        title: 'تمت الاضافة',
        timer: 1000,
        showConfirmButton: false,
      });
      this.component1.getAllDepartments(1);
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

  updateDepartment(id:any){
    if(this.modelForm.status=="INVALID"){
      return;
    }
    this.departmentService.updateDepartment(id,this.modelForm.value).subscribe((res: any) => {
      Swal.fire({
        title: 'تم التعديل',
        timer: 1000,
        showConfirmButton: false,
      });
      this.component1.getAllDepartments(1);
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
  
  deleteDepartment(id){
    this.departmentService.deleteDepartment(id).subscribe((res: any) => {
      Swal.fire({
        title: 'تم الحذف',
        timer: 1000,
        showConfirmButton: false,
      });
      this.component1.getAllDepartments(1);
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
