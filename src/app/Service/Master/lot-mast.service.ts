import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LotMastService {
  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  LotMastFill(Data: any): Observable<any> {
    return this.http.post<any>('LotMast/LotMastFill', Data)
  }

  LotMastChart(Data: any): Observable<any> {
    return this.http.post<any>('LotMast/LotMastChart', Data)
  }

  LotMastSave(Data: any): Observable<any> {
    return this.http.post<any>('LotMast/LotMastSave', Data)
  }

  LotMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('LotMast/LotMastDelete', Data)
  }

  LotTRf(Data: any): Observable<any> {
    return this.http.post<any>('LotMast/LotTRf', Data)
  }

  LotTRfLotFill(Data: any): Observable<any> {
    return this.http.post<any>("LotMast/LotTRfLotFill", Data)
  }

}
