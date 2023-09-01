import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvgQtyMastService {



  constructor(private http: HttpClient) { }

  AvgQuaMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('AvgQuaMast/AvgQuaMastDelete', Data)
  }

  AvgQuaMastFill(Data: any): Observable<any> {
    return this.http.post<any>('AvgQuaMast/AvgQuaMastFill', Data)
  }

  AvgQuaMastSave(Data: any): Observable<any> {
    return this.http.post<any>('AvgQuaMast/AvgQuaMastSave', Data)
  }

// AvgQuaMastDelete
// AvgQuaMastFill
// AvgQuaMastSave
}