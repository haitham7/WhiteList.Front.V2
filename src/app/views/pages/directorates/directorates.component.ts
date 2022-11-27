import { DirectoratesService } from './../../../core/services/api/directorates.service';
import { DirectorateDialogBoxComponent } from './directorate-dialog-box/directorate-dialog-box.component'
import { Component, OnInit , ViewChild } from '@angular/core';
import {MatPaginator,MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CustomPaginator } from '../../../core/help/customRTLPaginator';
import { MatDialog } from '@angular/material/dialog';
declare var require: any;
const Swal = require('sweetalert2');

export interface directorates{
  id:number,
  name:string,
  ministry:string
};

@Component({
  selector: 'app-directorates',
  templateUrl: './directorates.component.html',
  styleUrls: ['./directorates.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }  // Here
  ]
})
export class DirectorateComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['name','ministry','Action'];
  // Assign the data to the data source for the table to render
  dataSource = new MatTableDataSource<directorates>();
  pageSize=0;
  length=0;
  public currentPage = 0;
  constructor(private directorateService:DirectoratesService,public dialog: MatDialog) { }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.getAllDirectorates(1);
  }

  openDialog(action:any,obj:any) {
    obj.action = action;
    this.dialog.open(DirectorateDialogBoxComponent, {
      width: '40%',
      data:obj
    });
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getAllDirectorates(this.currentPage+1)
    CustomPaginator().getRangeLabel(e.pageIndex,e.pageSize,e.length);
  }

  getAllDirectorates(pageNum){
    this.directorateService.getAllDirectorates(pageNum).subscribe((res: any) => {   
      this.dataSource.data = res.data.values;
      this.dataSource.sort = this.sort;
       this.pageSize= res.data.pageSize;
       this.length=res.data.totalCount
    }, (err: any) =>{
      console.log(err.message);
    });
  }
}
