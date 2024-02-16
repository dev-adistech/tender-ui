import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelMastService {

  constructor(private http: HttpClient) { }

  ModelMastFill(Data: any): Observable<any> {
    return this.http.post<any>('ModelMast/ModelMastFill', Data)
  }

  ModelMastSave(Data: any): Observable<any> {
    return this.http.post<any>('ModelMast/ModelMastSave', Data)
  }

  ModelMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('ModelMast/ModelMastDelete', Data)
  }

}
