import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParamMastService {

  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  ParamMastFill(Data: any): Observable<any> {
    return this.http.post<any>('ParamMast/ParamMastFill', Data)
  }

  ParamMastSave(Data: any): Observable<any> {
    return this.http.post<any>('ParamMast/ParamMastSave', Data)
  }

  ParamMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('ParamMast/ParamMastDelete', Data)
  }


}
