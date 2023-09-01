import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationMastService {

  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  LocationMastFill(Data: any): Observable<any> {
    return this.http.post<any>('LocationMast/LocationMastFill', Data)
  }

  LocationMastSave(Data: any): Observable<any> {
    return this.http.post<any>('LocationMast/LocationMastSave', Data)
  }

  LocationMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('LocationMast/LocationMastDelete', Data)
  }
}
