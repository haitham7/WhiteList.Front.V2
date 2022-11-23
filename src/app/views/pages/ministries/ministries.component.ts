import { AddMininstryComponent } from './addMinistry.component';
import { Component, OnInit , ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MinistriesService} from '../../../core/services/api/ministries.service';

import { MatDialog } from '@angular/material/dialog';
declare var require: any;
const Swal = require('sweetalert2');
export interface ministries{
  id:number,
  name:string,
};

@Component({
  selector: 'app-ministries',
  templateUrl: './ministries.component.html',
  styleUrls: ['./ministries.component.scss']
})
export class MinistriesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['name','Action'];
  // Assign the data to the data source for the table to render
  dataSource = new MatTableDataSource<ministries>;

  constructor(private ministriesService:MinistriesService,public dialog: MatDialog) { }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.getAllMinistries();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  openDialog(action:any,obj:any) {
    obj.action = action;
    console.log(obj.name);
    const dialogRef = this.dialog.open(AddMininstryComponent, {
      width: '28%',
      data:obj
    });

  }
  getAllMinistries(){
    this.ministriesService.getAllMinistries().subscribe((res: any) => {   
      this.dataSource = new MatTableDataSource(res.data);
    }, (err: any) =>{
      console.log(err.message);
    });
  }

  deleteMinistry(id){
    this.ministriesService.deleteMinistry(id).subscribe((res: any) => {
      Swal.fire({
        title: 'تم الحذف',
        timer: 1000,
        showConfirmButton: false,
      });
      this.getAllMinistries();
    }, (err: any) =>{
      console.log(err.message);
    });
  }

}
