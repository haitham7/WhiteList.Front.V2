import { CardService } from './../../../core/services/api/cards.service';
import { CardDialogBoxComponent } from './card-dialog-box/card-dialog-box.component'
import { Component, OnInit , ViewChild } from '@angular/core';
import {MatPaginator,MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CustomPaginator } from '../../../core/help/customRTLPaginator';
import { MatDialog } from '@angular/material/dialog';
declare var require: any;
const Swal = require('sweetalert2');

export interface cards{
  id:number,
  cardNumber:string,
  pensionCardType:number,
  accountType:string,
  cardStatus:string,
  paymentDestination:string,
  endOfServiceBenefits:string
};

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }  // Here
  ]
})
export class CardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['cardNumber','accountNumber','pensionCardType','accountType','cardStatus','paymentDestination','endOfServiceBenefits','Action'];
  // Assign the data to the data source for the table to render
  dataSource = new MatTableDataSource<cards>();
  pageSize=0;
  length=0;
  public currentPage = 0;
  constructor(private cardService:CardService,public dialog: MatDialog) { }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.getAllCards(1);
  }

  openDialog(action:any,obj:any) {
    obj.action = action;
    this.dialog.open(CardDialogBoxComponent, {
      width: '40%',
      data:obj
    });
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getAllCards(this.currentPage+1)
    CustomPaginator().getRangeLabel(e.pageIndex,e.pageSize,e.length);
  }

  getAllCards(pageNum){
    this.cardService.getAllCards(pageNum).subscribe((res: any) => {   
      this.dataSource.data = res.data.values;
      this.dataSource.sort = this.sort;
       this.pageSize= res.data.pageSize;
       this.length=res.data.totalCount
    }, (err: any) =>{
      console.log(err.message);
    });
  }
}
