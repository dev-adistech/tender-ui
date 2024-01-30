import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpiryDateService {

  constructor(private http: HttpClient) { }

  TendarExpDateSave(Data: any): Observable<any> {
    return this.http.post<any>('ExpDate/TendarExpDateSave', Data)
  }

  TendarExpDateFill(Data: any): Observable<any> {
    return this.http.post<any>('ExpDate/TendarExpDateFill', Data)
  }
}
