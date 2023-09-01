import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabMastService {

  constructor(private http: HttpClient) { }

  LabMastFill(Data: any): Observable<any> {
    return this.http.post<any>('LabMast/LabMastFill', Data)
  }

  LabMastSave(Data: any): Observable<any> {
    return this.http.post<any>('LabMast/LabMastSave', Data)
  }

  LabMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('LabMast/LabMastDelete', Data)
  }
}
