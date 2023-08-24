import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShftMastService {

  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  ShiftMastFill(Data: any): Observable<any> {
    return this.http.post<any>('ShftMast/ShiftMastFill', Data)
  }

  ShiftMastSave(Data: any): Observable<any> {
    return this.http.post<any>('ShftMast/ShiftMastSave', Data)
  }

  ShiftMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('ShftMast/ShiftMastDelete', Data)
  }
}
