import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvgVerMastService {



  constructor(private http: HttpClient) { }

  AvgVerMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('AvgVerMast/AvgVerMastDelete', Data)
  }

  AvgVerMastFill(Data: any): Observable<any> {
    return this.http.post<any>('AvgVerMast/AvgVerMastFill', Data)
  }

  AvgVerMastSave(Data: any): Observable<any> {
    return this.http.post<any>('AvgVerMast/AvgVerMastSave', Data)
  }

// AvgVerMastDelete
// AvgVerMastFill
// AvgVerMastSave
}