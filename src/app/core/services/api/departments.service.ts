import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getAllDepartments(pageNum) {
    return this.http.get(this.baseUrl + '/api/Department/All/'+pageNum).pipe();
  }

  addNewDepartment(body:any) {
    return this.http.post(this.baseUrl + '/api/Department/Create',body).pipe();
  }

  deleteDepartment(id:any){
    return this.http.delete(this.baseUrl + '/api/Department/Delete/'+ id).pipe();
  }

  updateDepartment(id:any,body:any) {
    return this.http.put(this.baseUrl + '/api/Department/Update?id='+ id ,body).pipe();
  }
  
}
