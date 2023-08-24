import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvgSizeMastService {



  constructor(private http: HttpClient) { }

  AvgSizeMastSave(Data: any): Observable<any> {
    return this.http.post<any>('AvgSizeMast/AvgSizeMastSave', Data)
  }

  AvgSizeMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('AvgSizeMast/AvgSizeMastDelete', Data)
  }

  AvgSizeMastFill(Data: any): Observable<any> {
    return this.http.post<any>('AvgSizeMast/AvgSizeMastFill', Data)
  }

// AvgSizeMastSave
// AvgSizeMastDelete
// AvgSizeMastFill
}