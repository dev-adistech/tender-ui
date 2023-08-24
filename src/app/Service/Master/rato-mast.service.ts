import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatoMastService {

  constructor(private http: HttpClient) { }

  RAtioMastFill(Data: any): Observable<any> {
    return this.http.post<any>('RatioMast/RAtioMastFill', Data)
  }

  RatioMastSave(Data: any): Observable<any> {
    return this.http.post<any>('RatioMast/RatioMastSave', Data)
  }

  RatioMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('RatioMast/RatioMastDelete', Data)
  }
}
