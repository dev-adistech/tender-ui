import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCatService {

  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  UserCatMastFill(Data: any): Observable<any> {
    return this.http.post<any>('UserCatMast/UserCatMastFill', Data)
  }

  UserCatMastSave(Data: any): Observable<any> {
    return this.http.post<any>('UserCatMast/UserCatMastSave', Data)
  }

  UserCatMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('UserCatMast/UserCatMastDelete', Data)
  }
}
