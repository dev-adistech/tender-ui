import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapaportDiaService {

  constructor(private http: HttpClient) { }

  ORapParamDisFill(Data: any): Observable<any> {
    return this.http.post<any>("RapaportDia/ORapParamDisFill", Data);
  }
  ORapParamDisSave(Data: any): Observable<any> {
    return this.http.post<any>("RapaportDia/ORapParamDisSave", Data);
  }
  ORapParamDisDelete(Data: any): Observable<any> {
    return this.http.post<any>("RapaportDia/ORapParamDisDelete", Data);
  }


}
