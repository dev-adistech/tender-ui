import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MilkyMastService {

  constructor(private http: HttpClient) { }

  MilkyMastFill(Data: any): Observable<any> {
    return this.http.post<any>('MilkyMast/MilkyMastFill', Data)
  }

  MilkyMastSave(Data: any): Observable<any> {
    return this.http.post<any>('MilkyMast/MilkyMastSave', Data)
  }

  MilkyMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('MilkyMast/MilkyMastDelete', Data)
  }
}
