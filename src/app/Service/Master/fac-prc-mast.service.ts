import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacPrcMastService {

  constructor(private http: HttpClient) { }

  FacPrcFill(Data: any): Observable<any> {
    return this.http.post<any>('factoryPrc/FacPrcFill', Data)
  }
  facPrcSave(Data: any): Observable<any> {
    return this.http.post<any>('factoryPrc/facPrcSave', Data)
  }
}
