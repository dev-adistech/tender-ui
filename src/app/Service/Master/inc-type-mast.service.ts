import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncTypeMastService {
  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  IncTypeMastFill(Data: any): Observable<any> {
    return this.http.post<any>('IncTypeMast/IncTypeMastFill', Data)
  }

  IncTypeMastSave(Data: any): Observable<any> {
    return this.http.post<any>('IncTypeMast/IncTypeMastSave', Data)
  }

  IncTypeMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('IncTypeMast/IncTypeMastDelete', Data)
  }
}
