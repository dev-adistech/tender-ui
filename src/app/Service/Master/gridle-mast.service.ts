import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridleMastService {

  constructor(private http: HttpClient) { }

  GirdleMastFill(Data: any): Observable<any> {
    return this.http.post<any>('GridleMast/GirdleMastFill', Data)
  }

  GirdleMastSave(Data: any): Observable<any> {
    return this.http.post<any>('GridleMast/GirdleMastSave', Data)
  }

  GirdleMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('GridleMast/GirdleMastDelete', Data)
  }
}
