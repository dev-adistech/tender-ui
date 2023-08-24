import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrmMastService {
  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  FrmMastFill(Data: any): Observable<any> {
    return this.http.post<any>('FrmMast/FrmMastFill', Data)
  }

  FrmMastSave(Data: any): Observable<any> {
    return this.http.post<any>('FrmMast/FrmMastSave', Data)
  }

  FrmMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('FrmMast/FrmMastDelete', Data)
  }

}
