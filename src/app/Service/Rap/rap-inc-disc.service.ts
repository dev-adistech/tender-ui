import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapIncDiscService {

  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  RapIncDiscFill(Data: any): Observable<any> {
    return this.http.post<any>('RapIncDisc/RapIncDiscFill', Data)
  }
  RapIncDiscSave(Data: any): Observable<any> {
    return this.http.post<any>('RapIncDisc/RapIncDiscSave', Data)
  }
  RapIncDiscImport(Data: any): Observable<any> {
    return this.http.post<any>('RapIncDisc/RapIncDiscImport', Data)
  }
  RapIncDiscExport(Data: any): Observable<any> {
    let CheckStoneArray = Data.Data.map((items) => this.http.post<any>('RapIncDisc/RapIncDiscExport', {
      RAPTYPE: items.RAPTYPE,
      RTYPE: items.RTYPE,
      I_TYPE: items.I_TYPE,
      S_CODE: items.S_CODE,
      SZ_CODE: items.SZ_CODE,
      I_CODE: items.I_CODE,
      SZ_NAME: items.SZ_NAME
    }))
    return forkJoin(CheckStoneArray)
  }
}
