import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlackListService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getAllBlackList() {
    return this.http.get(this.baseUrl + '/api/BlackList/All').pipe();
  }
}
