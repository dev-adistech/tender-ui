import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MakRateMastService {

  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }


  MakRateMastSave(Data: any): Observable<any> {
    return this.http.post<any>('MakRateMast/MakRateMastSave', Data)
  }
  MakRateMastFill(Data: any): Observable<any> {
    return this.http.post<any>('MakRateMast/MakRateMastFill', Data)
  }


}
