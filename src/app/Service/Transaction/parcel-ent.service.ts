import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParcelEntService {

  constructor(private http: HttpClient) { }

  TendarParcelEnt(Data: any): Observable<any> {
    return this.http.post<any>('ParcelEnt/TendarParcelEnt', Data)
  }
  TendarResParcelSave(Data: any): Observable<any> {
    return this.http.post<any>('ParcelEnt/TendarResParcelSave', Data)
  }
  TendarMastDisSave(Data: any): Observable<any> {
    return this.http.post<any>('ParcelEnt/TendarMastDisSave', Data)
  }
}
