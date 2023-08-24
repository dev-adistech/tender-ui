import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvgShpMastService {



  constructor(private http: HttpClient) { }

  AvgShpMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('AvgShpMast/AvgShpMastDelete', Data)
  }

  AvgShpMastFill(Data: any): Observable<any> {
    return this.http.post<any>('AvgShpMast/AvgShpMastFill', Data)
  }

  AvgShpMastSave(Data: any): Observable<any> {
    return this.http.post<any>('AvgShpMast/AvgShpMastSave', Data)
  }

// AvgShpMastDelete
// AvgShpMastFill
// AvgShpMastSave
}