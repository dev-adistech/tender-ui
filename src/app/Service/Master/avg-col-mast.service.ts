import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvgColMastService {



  constructor(private http: HttpClient) { }

  AvgColMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('AvgColMast/AvgColMastDelete', Data)
  }

  AvgColMastFill(Data: any): Observable<any> {
    return this.http.post<any>('AvgColMast/AvgColMastFill', Data)
  }

  AvgColMastSave(Data: any): Observable<any> {
    return this.http.post<any>('AvgColMast/AvgColMastSave', Data)
  }

// AvgColMastDelete
// AvgColMastFill
// AvgColMastSave
}