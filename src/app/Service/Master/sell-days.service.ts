import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellDaysService {

  constructor(private http: HttpClient) { }

  SellDaysMastFill(Data: any): Observable<any> {
    return this.http.post<any>('SelldaysMast/SellDaysMastFill', Data)
  }

  SellDaysMastSave(Data: any): Observable<any> {
    return this.http.post<any>('SelldaysMast/SellDaysMastSave', Data)
  }
  SellDaysMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('SelldaysMast/SellDaysMastDelete', Data)
  }
}
