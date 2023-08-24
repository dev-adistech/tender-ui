import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssMastService {

  constructor(private http: HttpClient) { }

  AssMastFill(Data: any): Observable<any> {
    return this.http.post<any>('AssMast/AssMastFill', Data)
  }
  AssMastSave(Data: any): Observable<any> {
    return this.http.post<any>('AssMast/AssMastSave', Data)
  }
  AssMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('AssMast/AssMastDelete', Data)
  }
}
