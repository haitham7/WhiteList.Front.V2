import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getAllCards(pageNum) {
    return this.http.get(this.baseUrl + '/api/Card/All/'+pageNum).pipe();
  }

  addNewCard(body:any) {
    return this.http.post(this.baseUrl + '/api/Card/Create',body).pipe();
  }

  deleteCard(id:any){
    return this.http.delete(this.baseUrl + '/api/Card/Delete/'+ id).pipe();
  }

  updateCard(id:any,body:any) {
    return this.http.put(this.baseUrl + '/api/Card/Update?id='+ id ,body).pipe();
  }
  
}
