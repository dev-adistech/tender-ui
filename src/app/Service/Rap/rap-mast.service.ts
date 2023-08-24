import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapMastService {

  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  RapTypeFill(Data: any): Observable<any> {
    return this.http.post<any>('RapMast/RapTypeFill', Data)
  }

  RapMastFill(Data: any): Observable<any> {
    return this.http.post<any>('RapMast/RapMastFill', Data)
  }
  RapDisComp(Data: any): Observable<any> {
    return this.http.post<any>('RapMast/RapDisComp', Data)
  }

  async RapMastRapOrgRate(Data: any) {
    return this.http.post<any>('RapMast/RapMastRapOrgRate', Data).toPromise()
  }

  RapMastSave(Data: any): Observable<any> {
    return this.http.post<any>('RapMast/RapMastSave', Data)
  }

  async RapMastExport(Data: any) {
    return this.http.post<any>('RapMast/RapMastExport', Data).toPromise()
  }

  async RapMastImportUpdate(Data: any) {
    return this.http.post<any>('RapMast/RapMastImportUpdate', Data).toPromise()
  }

  async RapMastImport(Data: any) {
    return this.http.post<any>('RapMast/RapMastImport', Data).toPromise()
  }


  RapMastExportFast(Data: any): Observable<any> {
    let CheckStoneArray = Data.Data.map((items) => this.http.post<any>('RapMast/RapMastExport', {
      RAPTYPE: items.RAPTYPE,
      RTYPE: items.RTYPE,
      S_CODE: items.S_CODE,
      SZ_CODE: items.SZ_CODE,
      SZ_NAME: items.SZ_NAME
    }))
    return forkJoin(CheckStoneArray)
  }
}
