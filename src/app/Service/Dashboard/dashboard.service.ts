import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // public url = environment.BaseUrl

  // private subject = new Subject<any>();
  private subject: Subject<any> = new Subject<any>();
  componentName$: Observable<any> = this.subject.asObservable();

  constructor(private http: HttpClient) { }

  sendClickEvent(componentName) {
    this.subject.next(componentName);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  async FillAllMaster(Data: any) {
    return this.http.post<any>('Dashboard/FillAllMaster', Data).toPromise()
  }

  DashStockFill(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashStockFill', Data)
  }

  DashReceiveFill(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashReceiveFill', Data)
  }

  DashReceiveStockConfirm(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashReceiveStockConfirm', Data)
  }

  DashCurrentRollingFill(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashCurrentRollingFill', Data)
  }

  DashTodayMakeableFill(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashTodayMakeableFill', Data)
  }

  DashMakeableViewFill(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashMakeableViewFill', Data)
  }

  DashPredictionPendingFill(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashPredictionPendingFill', Data)
  }

  async DashPredictionPendingFileDownload(Data) {
    return this.http.post<any>('Dashboard/DashPredictionPendingFileDownload', Data).toPromise();
  }


  DashTop20MarkerFill(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashTop20MarkerFill', Data)
  }

  DashGrdView(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashGrdView', Data)
  }

  DashMrkAccView(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashMrkAccView', Data)
  }

  DashMrkAccViewDet(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashMrkAccViewDet', Data)
  }
  DashTop20Det(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashTop20Det', Data)
  }

  DashMrkPrdView(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashMrkPrdView', Data)
  }

  DashMrkPrdViewDet(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashMrkPrdViewDet', Data)
  }

  DashAttence(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashAttence', Data)
  }

  DashAttenceDet(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashAttenceDet', Data)
  }

  DashMrkAccDoubleClick(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashMrkAccDoubleClick', Data)
  }

  DashMrkAccPrdSave(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashMrkAccPrdSave', Data)
  }

  DashMrkAccDobDel(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashMrkAccDobDel', Data)
  }

  DashMrkAccDel(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/MrkAccDel', Data)
  }
  DashPrdPenUpd(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashPrdPenUpd', Data)
  }
  DashOTPrdPen(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashOTPrdPen', Data)
  }
  DashDailyPrc(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashDailyPrc', Data)
  }
  DashSarin(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashSarin', Data)
  }
  DashIssStock(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashIssStock', Data)
  }
  DashStockConfSave(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashStockConfSave', Data)
  }
  DashStkConfSave(Data: any): Observable<any> {
    return this.http.post<any>('Dashboard/DashStkConfSave', Data)
  }

}
