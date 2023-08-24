import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LabourMastService {
  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  LabourMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('LabourMast/LabourMastDelete', Data)
  }

  LabourMastFill(Data: any): Observable<any> {
    return this.http.post<any>('LabourMast/LabourMastFill', Data)
  }

  LabourMastSave(Data: any): Observable<any> {
    return this.http.post<any>('LabourMast/LabourMastSave', Data)
  }
}
