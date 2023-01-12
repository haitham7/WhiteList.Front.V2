import { PersonalService } from '../../../core/services/api/personal.service';
import { PersonalDialogBoxComponent } from './personal-dialog-box/personal-dialog-box.component'
import { Component, OnInit , ViewChild } from '@angular/core';
import { MatPaginator,MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomPaginator } from '../../../core/help/customRTLPaginator';
import { MatDialog } from '@angular/material/dialog';
declare var require: any;
const Swal = require('sweetalert2');

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }  // Here
  ]
})
export class PersonalComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['fullName','gender','motherFullName','jobInfoType','birthDate','governmentNumber','Action'];
  // Assign the data to the data source for the table to render
  dataSource = new MatTableDataSource();
  pageSize=0;
  length=0;
  public currentPage = 0;
  filter={
      "isEmployee": false,
      "isPension": false,
      "blackListOnly": false,
     "fullName": "",
      "accountNo": "",
      "pensionNo": "",
      "cardNumber": ""
    }
  constructor(private personalService:PersonalService,public dialog: MatDialog) { }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.getAllPersonal(1,this.filter);
  }

  openDialog(action:any,obj:any) {
    obj.action = action;
    this.dialog.open(PersonalDialogBoxComponent, {
      width: '40%',
      data:obj
    });
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getAllPersonal(this.currentPage+1,this.filter)
    CustomPaginator().getRangeLabel(e.pageIndex,e.pageSize,e.length);
  }

  getAllPersonal(pageNum,body){
    this.personalService.getAllPersonals(pageNum,body).subscribe((res: any) => {   
      this.dataSource.data = res.data.values;
      this.dataSource.sort = this.sort;
       this.pageSize= res.data.pageSize;
       this.length=res.data.totalCount;
    }, (err: any) =>{
      console.log(err.message);
    });
  }
}
