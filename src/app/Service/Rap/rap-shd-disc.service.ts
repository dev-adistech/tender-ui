import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapShdDiscService {

  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  RapShdDiscFill(Data: any): Observable<any> {
    return this.http.post<any>('RapShdDisc/RapShdDiscFill', Data)
  }
  RapShdDiscSave(Data: any): Observable<any> {
    return this.http.post<any>('RapShdDisc/RapShdDiscSave', Data)
  }
  RapShdDiscImport(Data: any): Observable<any> {
    return this.http.post<any>('RapShdDisc/RapShdDiscImport', Data)
  }
  // RapShdDiscExport(Data: any): Observable<any> {
  //   return this.http.post<any>('RapShdDisc/RapShdDiscExport', Data)
  // }
  RapOrdIsFill(Data: any): Observable<any> {
    return this.http.post<any>('RapShdDisc/RapOrdIsFill', Data)
  }
  RapOrdIsDelete(Data: any): Observable<any> {
    return this.http.post<any>('RapShdDisc/RapOrdIsDelete', Data)
  }
  RapOrdIsSave(Data: any): Observable<any> {
    return this.http.post<any>('RapShdDisc/RapOrdIsSave', Data)
  }

  RapShdDiscExport(Data: any): Observable<any> {
    let CheckStoneArray = Data.Data.map((items) => this.http.post<any>('RapShdDisc/RapShdDiscExport', {
      RAPTYPE: items.RAPTYPE,
      RTYPE: items.RTYPE,
      S_CODE: items.S_CODE,
      SZ_CODE: items.SZ_CODE,
      SH_CODE: items.SH_CODE,
      SZ_NAME: items.SZ_NAME
    }))
    return forkJoin(CheckStoneArray)
  }
}

