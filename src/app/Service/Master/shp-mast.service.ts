import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShpMastService {

  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  ShpMastFill(Data: any): Observable<any> {
    return this.http.post<any>('ShpMast/ShpMastFill', Data)
  }

  ShpMastSave(Data: any): Observable<any> {
    return this.http.post<any>('ShpMast/ShpMastSave', Data)
  }

  ShpMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('ShpMast/ShpMastDelete', Data)
  }

}
