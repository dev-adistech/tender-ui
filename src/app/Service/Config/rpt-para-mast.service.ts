import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RptParaMastService {
  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  RptParaMastFill(Data: any): Observable<any> {
    return this.http.post<any>('RptParaMast/RptParaMastFill', Data)
  }

  RptParaMastSave(Data: any): Observable<any> {
    return this.http.post<any>('RptParaMast/RptParaMastSave', Data)
  }

  RptParaMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('RptParaMast/RptParaMastDelete', Data)
  }

}
