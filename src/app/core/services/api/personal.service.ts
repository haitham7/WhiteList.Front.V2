import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getAllPersonals(pageNum,body) {
    return this.http.post(this.baseUrl + '/api/Personal/All/'+pageNum,body).pipe();
  }

  addNewPersonal(body:any) {
    return this.http.post(this.baseUrl + '/api/Personal/Create',body).pipe();
  }

  deletePersonal(id:any){
    return this.http.delete(this.baseUrl + '/api/Personal/Delete/'+ id).pipe();
  }

  updatePersonal(id:any,body:any) {
    return this.http.put(this.baseUrl + '/api/Personal/Update?id='+ id ,body).pipe();
  }
  
}
