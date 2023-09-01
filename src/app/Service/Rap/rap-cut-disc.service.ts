import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapCutDiscService {

  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  RapCutDiscFill(Data: any): Observable<any> {
    return this.http.post<any>('RapCutDisc/RapCutDiscFill', Data)
  }
  RapCutdSave(Data: any): Observable<any> {
    return this.http.post<any>('RapCutDisc/RapCutdSave', Data)
  }
  RapCutdImport(Data: any): Observable<any> {
    return this.http.post<any>('RapCutDisc/RapCutdImport', Data)
  }
  RapCutInsertDis(Data: any): Observable<any> {
    return this.http.post<any>('RapCutDisc/RapCutInsertDis', Data)
  }

  // RapCutdExport(Data: any): Observable<any> {
  //   return this.http.post<any>('RapCutDisc/RapCutdExport', Data)
  // }

  // RapCutdExport(Data: any): Observable<any> {
  //   let CheckStoneArray = Data.Data.map((items) => this.http.post<any>('RapCutDisc/RapCutdExport', {
  //     RAPTYPE: items.RAPTYPE,
  //     RTYPE: items.RTYPE,
  //     STYPE: items.PRPTYPE,
  //     S_CODE: items.S_CODE,
  //     SZ_CODE: items.code,
  //     PRP: items.PRP_CODE
  //   }))
  //   return forkJoin(CheckStoneArray)
  // }

  RapCutdExport(Data: any): Observable<any> {
    let CheckStoneArray = Data.Data.map((items) => this.http.post<any>('RapCutDisc/RapCutdExport', {
      RAPTYPE: items.RAPTYPE,
      RTYPE: items.RTYPE,
      STYPE: items.STYPE,
      S_CODE: items.S_CODE,
      SZ_CODE: items.SZ_CODE,
      PRP: items.PRP,
      SZ_NAME: items.SZ_NAME
    }))
    return forkJoin(CheckStoneArray)
  }

}
