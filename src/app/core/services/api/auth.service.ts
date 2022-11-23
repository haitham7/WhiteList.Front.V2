import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}
  login(body: any) {
    return this.http.post(this.baseUrl + '/api/User/UserLogin', body).pipe(
      map((res:any)=> {
        this.setCurrentUser(res.data)
        localStorage.setItem('token', res.data.token);
      })
    );
  }
  setCurrentUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  
}
