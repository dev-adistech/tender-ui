import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvgSztypeMastService {



  constructor(private http: HttpClient) { }

  AvgSzTypeMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('AvgSizeTypeMast/AvgSzTypeMastDelete', Data)
  }

  AvgSzTypeMastFill(Data: any): Observable<any> {
    return this.http.post<any>('AvgSizeTypeMast/AvgSzTypeMastFill', Data)
  }

  AvgShpMastSave(Data: any): Observable<any> {
    return this.http.post<any>('AvgSizeTypeMast/AvgShpMastSave', Data)
  }

// AvgSzTypeMastDelete
// AvgSzTypeMastFill
// AvgShpMastSave
}