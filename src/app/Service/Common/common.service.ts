import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private subject: Subject<any> = new Subject<any>();
  dockClose$: Observable<any> = this.subject.asObservable();
  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  BarCode(Data: any): Observable<any> {
    return this.http.post<any>('Common/BarCode', Data)
  }

  BGImageUpload(postData): Observable<any> {
    return this.http.post<any>('Common/BGImageUpload', postData);
  }

  ChangePassword(Data): Observable<any>{
    return this.http.post<any>('Common/PassUpdate', Data)
  }



}
