import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RptPerMastService {
  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  RptPerMastFill(Data: any): Observable<any> {
    return this.http.post<any>('RptPerMast/RptPerMastFill', Data)
  }

  RptPerMastSave(Data: any): Observable<any> {
    return this.http.post<any>('RptPerMast/RptPerMastSave', Data)
  }

  RptPerMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('RptPerMast/RptPerMastDelete', Data)
  }

  RptPerMastCopy(Data: any): Observable<any> {
    return this.http.post<any>('RptPerMast/RptPerMastCopy', Data)
  }

}
