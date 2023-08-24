import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeptMastService {

  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  DeptMastFill(Data: any): Observable<any> {
    return this.http.post<any>('DepthMast/DeptMastFill', Data)
  }

  DeptMastSave(Data: any): Observable<any> {
    return this.http.post<any>('DepthMast/DeptMastSave', Data)
  }

  DeptMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('DepthMast/DeptMastDelete', Data)
  }
}
