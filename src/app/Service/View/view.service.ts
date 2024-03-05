import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, interval, of } from 'rxjs';
import { map } from 'rxjs/operators';

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

  ParcelgWrk(Data: any): Observable<any> {
    return this.http.post<any>('View/ParcelgWrk', Data)
  }

  PricingWrkDisp(Data: any): Observable<any> {
    return this.http.post<any>('View/PricingWrkDisp', Data)
  }

  ParcelWrkDisp(Data: any): Observable<any> {
    return this.http.post<any>('View/ParcelWrkDisp', Data)
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

  ParcelBidDataView(Data: any): Observable<any> {
    return this.http.post<any>('View/ParcelBidDataView', Data)
  }

  ColAnalysis(Data: any): Observable<any> {
    return this.http.post<any>('View/ColAnalysis', Data)
  }

  TenderWin(Data: any): Observable<any> {
    return this.http.post<any>('View/TenderWin', Data)
  }

  StoneidSellDet(Data: any): Observable<any> {
    return this.http.post<any>('View/StoneidSellDet', Data)
  }

  TenderWinCommentSave(Data: any): Observable<any> {
    return this.http.post<any>('View/TenderWinCommentSave', Data)
  }

  getRemainingTime(params:any): Observable<string> {
    return interval(1000).pipe(
      map(() => this.calculateRemainingTime(params))
    );
  }

  async getRemainingTimeForMessage(params: any) {
    const remainingTime = this.calculateRemainingTime(params);
    return of(remainingTime).toPromise();
  }

  private calculateRemainingTime(params): string {
    const currentDateTime = new Date();
  const [dateStr, timeStr] = params.split('T');
  const [year, month, day] = dateStr.split('-');
  const [hours, minutes] = timeStr.split(':');

  const givenDateTime = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours),
    parseInt(minutes)
  );

  if (givenDateTime < currentDateTime) {
    return 'Expired'
  }
  
  const difference = givenDateTime.getTime() - currentDateTime.getTime();

  const remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
  const remainingHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const remainingMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);

  let remainingTime = '';
  if (remainingDays > 0) {
    remainingTime += remainingDays + ' days ';
  }
  if (remainingHours > 0) {
    remainingTime += remainingHours + ' hours ';
  }
  if (remainingMinutes > 0) {
    remainingTime += remainingMinutes + ' minutes ';
  }
  if (remainingSeconds > 0) {
    remainingTime += remainingSeconds + ' seconds ';
  }

  return remainingTime.trim();
  }

}
