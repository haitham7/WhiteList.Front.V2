import { BlackListService } from './../../../../core/services/api/blackList.service';
import { PersonalService } from './../../../../core/services/api/personal.service';
import { DepartmentService } from './../../../../core/services/api/departments.service';
import { DirectoratesService } from './../../../../core/services/api/directorates.service';
import { MinistriesService } from '../../../../core/services/api/ministries.service';
import { Component, Inject, Optional, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {PersonalComponent} from '../personal.component';
declare var require: any;
const Swal = require('sweetalert2');

export interface personsData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-personal-dialog-box',
  templateUrl: './personal-dialog-box.component.html',
})
export class PersonalDialogBoxComponent implements OnInit {
  action:string;
  personal:any;
  personalDepartment:any;
  personalDirectorate:any;
  personalMinistry:any;
  ministries: any;
  directorates: any;
  departments:any;
  BlackList:any;
  public modelForm: FormGroup | any;
  @ViewChild("component1") component1: PersonalComponent;

  constructor(
    public dialogRef: MatDialogRef<PersonalDialogBoxComponent>,
    private personalService:PersonalService,
    private departmentService:DepartmentService,
    private directoratesService: DirectoratesService,
    private ministriesService: MinistriesService,
    private blackListService:BlackListService,
    private fb: FormBuilder,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: personsData) {
    this.personal = {...data};
    this.action = this.personal.action;
    if(this.personal.jobLocation){
      this.personal.jobLocation.ministry?this.personalMinistry=this.personal.jobLocation.ministry.id:'';
      this.getDirectorateByMinistries(this.personalMinistry);
      this.personal.jobLocation.directorate?this.personalDirectorate=this.personal.jobLocation.directorate.id:'';
      this.getDepartmentByDirectorate(this.personalDirectorate);
      this.personal.jobLocation.department?this.personalDepartment=this.personal.jobLocation.department.id:'';
    }
    console.log(this.personalDirectorate);
      this.modelForm = this.fb.group({
      fullName: ['', [Validators.required]],
      gender:['', [Validators.required]],
      motherFullName:['', [Validators.required]],
      birthDate:['', [Validators.required]],
      jobInfoType:['', [Validators.required]],
      governmentNumber:['', [Validators.required]],
      ministryId:['', [Validators.required]],
      directorateId:['', [Validators.required]],
      departmentId:['', [Validators.required]],
      blackListId:['', [Validators.required]],
    });
  }
  getAllBlackList(){
    this.blackListService.getAllBlackList().subscribe((res: any) => {   
      this.BlackList = res.data;
    }, (err: any) =>{
      console.log(err.message);
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
    this.directoratesService.getDirectorateByMinistry(ministryId).subscribe((res: any) => {   
      this.directorates = res.data;
    }, (err: any) =>{
      console.log(err.message);
    });
  } 

  getDepartmentByDirectorate(directorateId){
    this.departmentService.getDepartmentByDirectorate(directorateId).subscribe((res: any) => {   
      this.departments = res.data;
    }, (err: any) =>{
      console.log(err.message);
    });
  }

  addPersonal(){
    if(this.modelForm.status=="INVALID"){
      return;
    }  
    this.modelForm.value.birthDate = new Date(this.modelForm.value.birthDate).toISOString();
    console.log(this.modelForm.value);  
    this.personalService.addNewPersonal(this.modelForm.value).subscribe((res: any) => {
      Swal.fire({
        title: 'تمت الاضافة',
        timer: 1000,
        showConfirmButton: false,
      });
      this.component1.getAllPersonal(1,'body');
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

  updatePersonal(id:any){
    if(this.modelForm.status=="INVALID"){
      return;
    }
    console.log(this.modelForm.value)
    this.personalService.updatePersonal(id,this.modelForm.value).subscribe((res: any) => {
      Swal.fire({
        title: 'تم التعديل',
        timer: 1000,
        showConfirmButton: false,
      });
      this.component1.getAllPersonal(1,'body');
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
  
  deletePersonal(id){
    this.personalService.deletePersonal(id).subscribe((res: any) => {
      Swal.fire({
        title: 'تم الحذف',
        timer: 1000,
        showConfirmButton: false,
      });
      this.component1.getAllPersonal(1,'');
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
    this.getAllMinistries();
    this.getAllBlackList();
  }

}
