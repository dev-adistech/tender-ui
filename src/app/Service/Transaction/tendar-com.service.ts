import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TendarComService {

  constructor(private http: HttpClient) { }

  TendarComMastFill(Data: any): Observable<any> {
    return this.http.post<any>('TendarCom/TendarComMastFill', Data)
  }

  TendarComMastSave(Data: any): Observable<any> {
    return this.http.post<any>('TendarCom/TendarComMastSave', Data)
  }

  TendarComMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('TendarCom/TendarComMastDelete', Data)
  }
}
