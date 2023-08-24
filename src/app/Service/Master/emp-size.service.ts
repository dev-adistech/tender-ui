import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpSizeService {

  constructor(private http: HttpClient) { }

  EmpsizeFill(Data: any): Observable<any> {
    return this.http.post<any>('Empsize/EmpsizeFill', Data)
  }
  Empsizeupdate(Data: any): Observable<any> {
    return this.http.post<any>('Empsize/Empsizeupdate', Data)
  }
}
