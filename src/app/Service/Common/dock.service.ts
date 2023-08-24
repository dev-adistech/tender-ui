import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DockService {
  // public url = environment.BaseUrl
  private subject: Subject<any> = new Subject<any>();
  dockClose$: Observable<any> = this.subject.asObservable();

  constructor(private http: HttpClient) { }

  sendClickEvent(Data) {
    this.subject.next(Data);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  async USP_SELECT(Data: any) {
    return this.http.post<any>('Dock/USP_SELECT', Data).toPromise()
  }

  async GrpOrEmpFill(Data: any) {
    return this.http.post<any>('Dock/GrpOrEmpFill', Data).toPromise()
  }

  async DockPrcPen(Data: any) {
    return this.http.post<any>('Dock/DockPrcPen', Data).toPromise()
  }

  async DockPrcPenDet(Data: any) {
    return this.http.post<any>('Dock/DockPrcPenDet', Data).toPromise()
  }

  async DockProduction(Data: any) {
    return this.http.post<any>('Dock/DockProduction', Data).toPromise()
  }

  async DockCurRoll(Data: any) {
    return this.http.post<any>('Dock/DockCurRoll', Data).toPromise()
  }

  async DockCurRollDet(Data: any) {
    return this.http.post<any>('Dock/DockCurRollDet', Data).toPromise()
  }

  async DockDimPartyStk(Data: any) {
    return this.http.post<any>('Dock/DockDimPartyStk', Data).toPromise()
  }

  async DockGrdStk(Data: any) {
    return this.http.post<any>('Dock/DockGrdStk', Data).toPromise()
  }

  async DockChkStockTaly(Data: any) {
    return this.http.post<any>('Dock/DockChkStockTaly', Data).toPromise()
  }


  async DockRequirement(Data: any) {
    return this.http.post<any>('Dock/DockRequirement', Data).toPromise()
  }

  async DockPelProd(Data: any) {
    return this.http.post<any>('Dock/DockPelProd', Data).toPromise()
  }

  async DockPrdLock(Data: any) {
    return this.http.post<any>('Dock/DockPrdLock', Data).toPromise()
  }

  async Dock2nDUpd(Data: any) {
    return this.http.post<any>('Dock/Dock2nDUpd', Data).toPromise()
  }

  async Dock2ND(Data: any) {
    return this.http.post<any>('Dock/Dock2ND', Data).toPromise()
  }

  async DockMrkStockTaly(Data: any) {
    return this.http.post<any>('Dock/DockMrkStockTaly', Data).toPromise()
  }

  async DockFactory(Data: any) {
    return this.http.post<any>('Dock/DockFactory', Data).toPromise()
  }

  async DockLotStatus(Data: any) {
    return this.http.post<any>('Dock/DockLotStatus', Data).toPromise()
  }

  async DockLotStatusDet(Data: any) {
    return this.http.post<any>('Dock/DockLotStatusDet', Data).toPromise()
  }

  async ClvToGrdDue(Data: any) {
    return this.http.post<any>('Dock/ClvToGrdDue', Data).toPromise()
  }

}
