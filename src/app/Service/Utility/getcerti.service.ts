import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetcertiService {

  constructor(private http: HttpClient) { }

   LabResultGet(Data: any): Observable<any> {
    return this.http.post<any>('getcerti/LabResultGet', Data)
  }

   GetLot(Data: any): Observable<any> {
    return this.http.post<any>('getcerti/GetLot', Data)
  }

  CertiResultSave(Data: any): Observable<any> {
    return this.http.post<any>('getcerti/CertiResultSave', Data)
  }

  GetStonId(Data: any): Observable<any> {
    return this.http.post<any>('getcerti/GetStonId', Data)
  }
  LabResultImportUpdate(Data: any): Observable<any> {
    return this.http.post<any>('getcerti/LabResultImportUpdate', Data)
  }
}
