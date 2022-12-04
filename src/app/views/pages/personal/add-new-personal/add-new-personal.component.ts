import { CardService } from './../../../../core/services/api/cards.service';
import { EnumService } from './../../../../core/services/api/enum.service';
import { BlackListService } from '../../../../core/services/api/blackList.service';
import { PersonalService } from '../../../../core/services/api/personal.service';
import { DepartmentService } from '../../../../core/services/api/departments.service';
import { DirectoratesService } from '../../../../core/services/api/directorates.service';
import { MinistriesService } from '../../../../core/services/api/ministries.service';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { MatStepper,StepperOrientation } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

declare var require: any;
const Swal = require('sweetalert2');

@Component({
  selector: 'app-add-new-personal',
  templateUrl: './add-new-personal.component.html',
})
export class AddNewPersonalComponent implements OnInit {
  stepperOrientation: Observable<StepperOrientation>;
  ministries: any;
  directorates: any;
  departments:any;
  BlackList:any;
  pensionCardType:any;
  personalId:any;
  public cardFormGroup: FormGroup | any;
  public personalFormGroup: FormGroup | any;

  constructor(
    private personalService:PersonalService,
    private departmentService:DepartmentService,
    private directoratesService: DirectoratesService,
    private ministriesService: MinistriesService,
    private blackListService:BlackListService,
    private enumService :EnumService,
    private fb: FormBuilder,
    private cardService:CardService,
    breakpointObserver: BreakpointObserver) {
      this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

      this.personalFormGroup = this.fb.group({
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
    
      this.cardFormGroup = this.fb.group({
        cardNumber: ['', [Validators.required]],
        ibn:['', [Validators.required]],
        pensionCardType:['', [Validators.required]],
        cardStatus:['', [Validators.required]],
        paymentDestination:['', [Validators.required]],
        personalId:[],
        salary:['', [Validators.required]],
        payDate:['', [Validators.required]],  
      });
      
  }

  getEnum(enumName){
    this.enumService.enum(enumName).subscribe((res: any) => {   
      console.log(res.data);
      this.pensionCardType=res.data;
    }, (err: any) =>{
      console.log(err.message);
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

  nextToCardInfo(stepper: MatStepper){
    if(this.personalFormGroup.status=="INVALID"){
      return;
    } 
    stepper.next() 
  }

  next(stepper: MatStepper){
    if(this.cardFormGroup.status=="INVALID"){
      return;
    }
    stepper.next();
    this.addPersonal();
  }
  addPersonal(){
    this.personalFormGroup.value.birthDate = new Date(this.personalFormGroup.value.birthDate).toISOString();
    this.personalService.addNewPersonal(this.personalFormGroup.value).subscribe((res: any) => {
      this.personalId =res.data.id;
      this.addCard();
    }, (err: any) =>{
      Swal.fire({
        title: 'عذرا يوجد خطأ ..  ',
        timer: 1000,
        text:err.error? err.error.message : '',
        showConfirmButton: false,
      });    
    });
  }

  addCard(){
    this.cardFormGroup.value.personalId= this.personalId
    this.cardService.addNewCard(this.cardFormGroup.value).subscribe((res: any) => {
      Swal.fire({
        title: 'تمت الاضافة',
        timer: 1000,
        showConfirmButton: false,
      });
    }, (err: any) =>{
      Swal.fire({
        title: 'عذرا يوجد خطأ ..  ',
        timer: 1000,
        text:err.error? err.error.message : '',
        showConfirmButton: false,
      });    
    });
  }

  ngOnInit(): void {   
    this.getAllMinistries();
    this.getAllBlackList();
    // this.getEnum('pensionCardType');
  }

}
