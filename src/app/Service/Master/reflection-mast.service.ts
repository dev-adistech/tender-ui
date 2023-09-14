import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReflectionMastService {

  constructor(private http: HttpClient) { }

  ReflectionMastFill(Data: any): Observable<any> {
    return this.http.post<any>('RefMast/ReflectionMastFill', Data)
  }

  ReflectionMastSave(Data: any): Observable<any> {
    return this.http.post<any>('RefMast/ReflectionMastSave', Data)
  }

  ReflectionMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('RefMast/ReflectionMastDelete', Data)
  }
}
