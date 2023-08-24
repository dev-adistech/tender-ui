import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpMastService {

  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  EmpMastFill(Data: any): Observable<any> {
    return this.http.post<any>('EmpMast/EmpMastFill', Data)
  }

  EmpMastSave(Data: any): Observable<any> {
    return this.http.post<any>('EmpMast/EmpMastSave', Data)
  }

  EmpMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('EmpMast/EmpMastDelete', Data)
  }

  USERMASTSAVETEMP(Data: any): Observable<any> {
    return this.http.post<any>('EmpMast/USERMASTSAVETEMP', Data)
  }

  GrpUpdate(Data: any): Observable<any> {
    return this.http.post<any>('EmpMast/GrpUpdate', Data)
  }

  EmpMastChart(Data: any): Observable<any> {
    return this.http.post<any>('EmpMast/EmpMastChart', Data)
  }
}
