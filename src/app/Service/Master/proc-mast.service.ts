import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcMastService {

  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  ProcMastFill(Data: any): Observable<any> {
    return this.http.post<any>('ProcMast/ProcMastFill', Data)
  }

  ProcMastSave(Data: any): Observable<any> {
    return this.http.post<any>('ProcMast/ProcMastSave', Data)
  }

  ProcMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('ProcMast/ProcMastDelete', Data)
  }
}
