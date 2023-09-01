import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenMastService {

  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  TenMastFill(Data: any): Observable<any> {
    return this.http.post<any>('tenMast/TenMastFill', Data)
  }

  TenMastSave(Data: any): Observable<any> {
    return this.http.post<any>('tenMast/TenMastSave', Data)
  }

  TenMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('tenMast/TenMastDelete', Data)
  }
}
