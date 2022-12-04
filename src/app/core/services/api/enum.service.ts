import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnumService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}
  enum(enumValue) {
    return this.http.get(this.baseUrl + '/api/Enum/GetEnumsValues/'+enumValue).pipe();
  }

}
