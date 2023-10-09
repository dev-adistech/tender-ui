import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private subject: Subject<any> = new Subject<any>();
  tabChanged$: Observable<any> = this.subject.asObservable();

  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  sendTabChangedEvent(Data) {
    this.subject.next(Data);
  }

  getTabChangedEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  PricingWrk(Data: any): Observable<any> {
    return this.http.post<any>('View/PricingWrk', Data)
  }

  PricingWrkDisp(Data: any): Observable<any> {
    return this.http.post<any>('View/PricingWrkDisp', Data)
  }

  PricingWrkMperSave(Data: any): Observable<any> {
    return this.http.post<any>('View/PricingWrkMperSave', Data)
  }

  BVView(Data: any): Observable<any> {
    return this.http.post<any>('View/BVView', Data)
  }

  BidDataView(Data: any): Observable<any> {
    return this.http.post<any>('View/BidDataView', Data)
  }

  ColAnalysis(Data: any): Observable<any> {
    return this.http.post<any>('View/ColAnalysis', Data)
  }

}
