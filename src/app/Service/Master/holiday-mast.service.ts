import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HolidayMastService {
  
  constructor(private http: HttpClient) { }

  HoliDayDelete(Data: any): Observable<any> {
    return this.http.post<any>('HoliDayMast/HoliDayDelete', Data)
  }

  HoliDayFill(Data: any): Observable<any> {
    return this.http.post<any>('HoliDayMast/HoliDayFill', Data)
  }

  HoliDaySave(Data: any): Observable<any> {
    return this.http.post<any>('HoliDayMast/HoliDaySave', Data)
  }

}