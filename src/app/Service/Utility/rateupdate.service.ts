import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RateupdateService {

  constructor(private http: HttpClient) { }

  TendarRateUpd(Data: any): Observable<any> {
    return this.http.post<any>('rateupdate/TendarRateUpd', Data)
  }
}
