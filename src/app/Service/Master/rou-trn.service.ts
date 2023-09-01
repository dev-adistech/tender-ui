import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouTrnService {

  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  RouTrnFillTrnNo(Data: any): Observable<any> {
    return this.http.post<any>('RouTrn/RouTrnFillTrnNo', Data)
  }

  RouTrnFill(Data: any): Observable<any> {
    return this.http.post<any>('RouTrn/RouTrnFill', Data)
  }

  RouTrnSave(Data: any): Observable<any> {
    return this.http.post<any>('RouTrn/RouTrnSave', Data)
  }

  RouTrnDelete(Data: any): Observable<any> {
    return this.http.post<any>('RouTrn/RouTrnDelete', Data)
  }
}
