import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapCalcService {

  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  RapCalcDisp(Data: any): Observable<any> {
    return this.http.post<any>('RapCalc/RapCalcDisp', Data)
  }

  PrdEmpFill(Data: any): Observable<any> {
    return this.http.post<any>('RapCalc/PrdEmpFill', Data)
  }

  RapCalcCrtFill(Data: any): Observable<any> {
    return this.http.post<any>('RapCalc/RapCalcCrtFill', Data)
  }

  async FindRap(Data: any) {
    return this.http.post<any>('RapCalc/FindRap', Data).toPromise()
  }

  async FindRapType(Data: any) {
    return this.http.post<any>('RapCalc/FindRapType', Data).toPromise()
  }

  RapSave(Data: any): Observable<any> {
    return this.http.post<any>('RapCalc/RapSave', Data)
  }

  PrdTagUpd(Data: any): Observable<any> {
    return this.http.post<any>('RapCalc/PrdTagUpd', Data)
  }

  async RapCalcSaveValidation(Data: any) {
    return this.http.post<any>('RapCalc/RapCalcSaveValidation', Data).toPromise()
  }

  async RapCalcSelectValidation(Data: any) {
    return this.http.post<any>('RapCalc/RapCalcSelectValidation', Data).toPromise()
  }

  async RapPrint(Data: any) {
    return this.http.post<any>('RapCalc/RapPrint', Data).toPromise()
  }

  async RapPrintOP(Data: any) {
    return this.http.post<any>('RapCalc/RapPrintOP', Data).toPromise()
  }

  RapCalPrdDel(Data: any): Observable<any> {
    return this.http.post<any>('RapCalc/RapCalPrdDel', Data)
  }

  TendarRapCalDisp(Data: any): Observable<any> {
    return this.http.post<any>('RapCalc/TendarRapCalDisp', Data)
  }

  TendarRapCalPrdSave(Data: any): Observable<any> {
    return this.http.post<any>('RapCalc/TendarRapCalPrdSave', Data)
  }

  TendarRapCalPrdDelete(Data: any): Observable<any> {
    return this.http.post<any>('RapCalc/TendarRapCalPrdDelete', Data)
  }

  RapCalcTendarVidUpload(Data: any): Observable<any> {
    return this.http.post<any>('RapCalc/RapCalcTendarVidUpload', Data)
  }

  RapCalcTendarVidDisp(Data: any): Observable<any> {
    return this.http.post<any>('RapCalc/RapCalcTendarVidDisp', Data)
  }

  RapCalcTendarVidDelete(Data: any): Observable<any> {
    return this.http.post<any>('RapCalc/RapCalcTendarVidDelete', Data)
  }

  TendarExcel(Data: any): Observable<any> {
    return this.http.post<any>('RapCalc/TendarExcel', Data)
  }

  TendarExcelDownload(Data: any): Observable<any> {
    return this.http.post<any>('RapCalc/TendarExcelDownload', Data)
  }

  RapCalExport(Data: any): Observable<any> {
    return this.http.post<any>('RapCalc/RapCalExport', Data)
  }

  RapCalcPrdQuery(Data: any): Observable<any> {
    return this.http.post<any>('RapCalc/RapCalcPrdQuery', Data)
  }

  RapCalcTendarDel(Data: any): Observable<any> {
    return this.http.post<any>('RapCalc/RapCalcTendarDel', Data)
  }

  TenderLotDelete(Data: any): Observable<any> {
    return this.http.post<any>('RapCalc/TenderLotDelete', Data)
  }
  RapCalcDoubleClick(Data: any): Observable<any> {
    return this.http.post<any>('RapCalc/RapCalcDoubleClick', Data)
  }

}
