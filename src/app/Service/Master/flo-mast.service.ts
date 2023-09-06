import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloMastService {
  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  FloMastFill(Data: any): Observable<any> {
    return this.http.post<any>('FloMast/FloMastFill', Data)
  }

  FloMastSave(Data: any): Observable<any> {
    return this.http.post<any>('FloMast/FloMastSave', Data)
  }

  FloMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('FloMast/FloMastDelete', Data)
  }

  FloMastsmipleDelete(Data: any): Observable<any> {
    return this.http.post<any>('FloMast/FloMastsmipleDelete', Data)
  }

  FloMastsmipleSave(Data: any): Observable<any> {
    return this.http.post<any>('FloMast/FloMastsmipleSave', Data)
  }

  FloMastsmipleFill(Data: any): Observable<any> {
    return this.http.post<any>('FloMast/FloMastsmipleFill', Data)
  }

}
