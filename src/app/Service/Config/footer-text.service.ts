import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterTextService {
  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  FootMsgFill(Data: any): Observable<any> {
    return this.http.post<any>('FooterText/FootMsgFill', Data)
  }

  asyncFootMsgFill(Data: any) {
    return this.http.post<any>('FooterText/FootMsgFill', Data).toPromise()
  }

  FootMsgSave(Data: any): Observable<any> {
    return this.http.post<any>('FooterText/FootMsgSave', Data)
  }

  SendNotification(Data: any): Observable<any> {
    return this.http.post<any>('send_mybasket', Data)
  }

}
