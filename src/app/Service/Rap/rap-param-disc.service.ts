import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapParamDiscService {

  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  RapParamDiscFill(Data: any): Observable<any> {
    return this.http.post<any>('RapParamDisc/RapParamDiscFill', Data)
  }
  RapParamDiscSave(Data: any): Observable<any> {
    return this.http.post<any>('RapParamDisc/RapParamDiscSave', Data)
  }
  RapParamDiscImport(Data: any): Observable<any> {
    return this.http.post<any>('RapParamDisc/RapParamDiscImport', Data)
  }
  // RapParamDiscExport(Data: any): Observable<any> {
  //   return this.http.post<any>('RapParamDisc/RapParamDiscExport', Data)
  // }

  RapParamDiscExport(Data: any): Observable<any> {
    let CheckStoneArray = Data.Data.map((items) => this.http.post<any>('RapParamDisc/RapParamDiscExport', {
      RAPTYPE: items.RAPTYPE,
      RTYPE: items.RTYPE,
      PARAM_NAME: items.PARAM_NAME,
      S_CODE: items.S_CODE,
      SZ_CODE: items.SZ_CODE,
      SZ_NAME: items.SZ_NAME,
      FMETER: items.FMETER,
      TMETER: items.TMETER,
      FL_CODE: items.FL_CODE
    }))
    return forkJoin(CheckStoneArray)
  }
}
