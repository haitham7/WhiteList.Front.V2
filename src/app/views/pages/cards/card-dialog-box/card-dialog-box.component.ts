import { CardService } from './../../../../core/services/api/cards.service';
import { CardComponent } from './../cards.component';
import { Component, Inject, Optional, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
declare var require: any;
const Swal = require('sweetalert2');

export interface CardData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-card-dialog-box',
  templateUrl: './card-dialog-box.component.html',
})
export class CardDialogBoxComponent implements OnInit {
  action:string;
  directorateOfDepartment:any =1;
  ministryOfDirectorate:any=1;
  card:any;
  ministries: any;
  directorates: any;
  public modelForm: FormGroup | any;
  @ViewChild("component1") component1: CardComponent;

  constructor(
    public dialogRef: MatDialogRef<CardDialogBoxComponent>,
    private cardService:CardService,
    private fb: FormBuilder,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: CardData) {
    this.card = {...data};
    this.action = this.card.action;
    this.modelForm = this.fb.group({
      cardNumber: ['', [Validators.required]],
      ibn:['', [Validators.required]],
      pensionCardType:['', [Validators.required]],
      cardStatus:['', [Validators.required]],
      paymentDestination:['', [Validators.required]],
      personalId:['', [Validators.required]],
      salary:['', [Validators.required]],
      payDate:['', [Validators.required]],
    });
  }

  addCard(){
    if(this.modelForm.status=="INVALID"){
      return;
    }
    this.cardService.addNewCard(this.modelForm.value).subscribe((res: any) => {
      Swal.fire({
        title: 'تمت الاضافة',
        timer: 1000,
        showConfirmButton: false,
      });
     this.component1.getAllCards(1);
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

  updateCard(id:any){
    if(this.modelForm.status=="INVALID"){
      return;
    }
    this.cardService.updateCard(id,this.modelForm.value).subscribe((res: any) => {
      Swal.fire({
        title: 'تم التعديل',
        timer: 1000,
        showConfirmButton: false,
      });
     this.component1.getAllCards(1);
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
  
  deleteCard(id){
    this.cardService.deleteCard(id).subscribe((res: any) => {
      Swal.fire({
        title: 'تم الحذف',
        timer: 1000,
        showConfirmButton: false,
      });
     this.component1.getAllCards(1);
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
  ngOnInit(): void {}

}
