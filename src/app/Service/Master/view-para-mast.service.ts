import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ViewParaMastService {
  DashMrkPrdView(arg0: { FORMNAME: string; }) {
    throw new Error('Method not implemented.');
  }

  // public url = environment.BaseUrl;

  constructor(private http: HttpClient) { }

  ViewParaFill(Data: any): Observable<any> {
    return this.http.post<any>('ViewParaMast/ViewParaFill', Data)
  }
  async ASYNCViewParaFill(Data: any) {
    return this.http.post<any>('ViewParaMast/ViewParaFill', Data).toPromise()
  }

  ViewParaComboFill(Data: any): Observable<any> {
    return this.http.post<any>('ViewParaMast/ViewParaComboFill', Data)
  }

  ViewParaSave(Data: any): Observable<any> {
    return this.http.post<any>('ViewParaMast/ViewParaSave', Data)
  }

  ViewParaDelete(Data: any): Observable<any> {
    return this.http.post<any>('ViewParaMast/ViewParaDelete', Data)
  }
}
