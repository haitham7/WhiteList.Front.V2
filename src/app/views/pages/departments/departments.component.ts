import { DepartmentService } from './../../../core/services/api/departments.service';
import { DepartmentDialogBoxComponent } from './department-dialog-box/department-dialog-box.component'
import { Component, OnInit , ViewChild } from '@angular/core';
import {MatPaginator,MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CustomPaginator } from '../../../core/help/customRTLPaginator';
import { MatDialog } from '@angular/material/dialog';
declare var require: any;
const Swal = require('sweetalert2');

export interface departments{
  id:number,
  name:string,
  ministry:string
};

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }  // Here
  ]
})
export class DepartmentComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['name','directorate','ministry','Action'];
  // Assign the data to the data source for the table to render
  dataSource = new MatTableDataSource<departments>();
  pageSize=0;
  length=0;
  public currentPage = 0;
  constructor(private departmentService:DepartmentService,public dialog: MatDialog) { }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.getAllDepartments(1);
  }

  openDialog(action:any,obj:any) {
    obj.action = action;
    this.dialog.open(DepartmentDialogBoxComponent, {
      width: '40%',
      data:obj
    });
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getAllDepartments(this.currentPage+1)
    CustomPaginator().getRangeLabel(e.pageIndex,e.pageSize,e.length);
  }

  getAllDepartments(pageNum){
    this.departmentService.getAllDepartments(pageNum).subscribe((res: any) => {   
      this.dataSource.data = res.data.values;
      this.dataSource.sort = this.sort;
       this.pageSize= res.data.pageSize;
       this.length=res.data.totalCount
    }, (err: any) =>{
      console.log(err.message);
    });
  }
}
