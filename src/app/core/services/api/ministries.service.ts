import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MinistriesService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getAllMinistries() {
    return this.http.get(this.baseUrl + '/api/Ministry/GetMinistries').pipe();
  }

  addNewMinistry(body:any) {
    return this.http.post(this.baseUrl + '/api/Ministry/Create',body).pipe();
  }

  deleteMinistry(id:any){
    return this.http.delete(this.baseUrl + '/api/Ministry/Delete/'+ id).pipe();
  }

  updateMinistry(id:any,body:any) {
    return this.http.put(this.baseUrl + '/api/Ministry/Update?id='+id,body).pipe();
  }
  
}
