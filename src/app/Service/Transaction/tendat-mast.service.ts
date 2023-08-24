import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TendatMastService {

  constructor(private http: HttpClient) { }

  TendarMastFill(Data: any): Observable<any> {
    return this.http.post<any>('TendarMast/TendarMastFill', Data)
  }

  TendarMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('TendarMast/TendarMastDelete', Data)
  }

  TendarMastSave(Data: any): Observable<any> {
    return this.http.post<any>('TendarMast/TendarMastSave', Data)
  }

  TendarPktEntFill(Data: any): Observable<any> {
    return this.http.post<any>('TendarMast/TendarPktEntFill', Data)
  }

  TendarPktEntSave(Data: any): Observable<any> {
    return this.http.post<any>('TendarMast/TendarPktEntSave', Data)
  }

  TendarPktEntDelete(Data: any): Observable<any> {
    return this.http.post<any>('TendarMast/TendarPktEntDelete', Data)
  }

  GetTendarNumber(Data: any): Observable<any> {
    return this.http.post<any>('TendarMast/GetTendarNumber', Data)
  }

  ChkTendarNumber(Data: any): Observable<any> {
    return this.http.post<any>('TendarMast/ChkTendarNumber', Data)
  }

  GetTendarPktNumber(Data: any): Observable<any> {
    return this.http.post<any>('TendarMast/GetTendarPktNumber', Data)
  }

  ChkTendarPktEnt(Data: any): Observable<any> {
    return this.http.post<any>('TendarMast/ChkTendarPktEnt', Data)
  }
}
