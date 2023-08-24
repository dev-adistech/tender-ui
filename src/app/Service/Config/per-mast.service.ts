import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerMastService {
  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  PerMastFill(Data: any): Observable<any> {
    return this.http.post<any>('PerMast/PerMastFill', Data)
  }

  PerMastSave(Data: any): Observable<any> {
    return this.http.post<any>('PerMast/PerMastSave', Data)
  }

  PerMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('PerMast/PerMastDelete', Data)
  }

  PerMastCopy(Data: any): Observable<any> {
    return this.http.post<any>('PerMast/PerMastCopy', Data)
  }

}
