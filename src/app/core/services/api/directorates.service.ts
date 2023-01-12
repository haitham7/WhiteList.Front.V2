import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DirectoratesService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getAllDirectorates(pageNum) {
    return this.http.get(this.baseUrl + '/api/Directorate/All/'+pageNum).pipe();
  }

  getDirectorateByMinistry(ministryId){
    return this.http.get(this.baseUrl+ '/api/Directorate/GetByMinistry?ministryId='+ministryId).pipe();
  }
  addNewDirectorate(body:any) {
    return this.http.post(this.baseUrl + '/api/Directorate/Create',body).pipe();
  }

  deleteDirectorate(id:any){
    return this.http.delete(this.baseUrl + '/api/Directorate/Delete/'+ id).pipe();
  }

  updateDirectorate(id:any,body:any) {
    return this.http.put(this.baseUrl + '/api/Directorate/Update?id='+ id ,body).pipe();
  }
  
}
