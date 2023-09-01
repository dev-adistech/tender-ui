import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginDetailService {
  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  LoginDetailFill(Data: any): Observable<any> {
    return this.http.post<any>('LoginDetail/LoginDetailFill', Data)
  }

  LoginDetailUpdate(Data: any): Observable<any> {
    return this.http.post<any>('LoginDetail/LoginDetailUpdate', Data)
  }

  LoginDetailSave(Data: any): Observable<any> {
    return this.http.post<any>('LoginDetail/LoginDetailSave', Data)
  }

}
