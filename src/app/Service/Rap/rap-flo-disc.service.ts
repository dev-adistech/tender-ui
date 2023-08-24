import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapFloDiscService {

  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  RapFloDiscFill(Data: any): Observable<any> {
    return this.http.post<any>('RapFloDisc/RapFloDiscFill', Data)
  }
  RapFloDiscSave(Data: any): Observable<any> {
    return this.http.post<any>('RapFloDisc/RapFloDiscSave', Data)
  }
  RapFloDiscImport(Data: any): Observable<any> {
    return this.http.post<any>('RapFloDisc/RapFloDiscImport', Data)
  }
  RapFloDiscExport(Data: any): Observable<any> {
    let CheckStoneArray = Data.Data.map((items) => this.http.post<any>('RapFloDisc/RapFloDiscExport', {
      RAPTYPE: items.RAPTYPE,
      RTYPE: items.RTYPE,
      S_CODE: items.S_CODE,
      FL_CODE: items.FL_CODE,
      SZ_CODE: items.SZ_CODE,
      CT_CODE: items.CT_CODE,
      SZ_NAME: items.SZ_NAME
    }))
    return forkJoin(CheckStoneArray)
  }

  RapFloDiscExcelDownload(Data: any): Observable<any> {
    return this.http.post<any>('RapFloDisc/RapFloDiscExcelDownload', Data)
  }
}
