import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LotUtilityService {

  constructor(private http: HttpClient) { }

  LotChange(Data: any): Observable<any> {
    return this.http.post<any>('LotUtility/LotChange', Data)
  }

  RateUpdateUtility(Data: any): Observable<any> {
    return this.http.post<any>('LotUtility/RateUpdateUtility', Data)
  }

}
