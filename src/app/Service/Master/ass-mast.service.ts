import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssMastService {

  constructor(private http: HttpClient) { }

  TendarAssMstSave(Data: any): Observable<any> {
    return this.http.post<any>('AssMast/TendarAssMstSave', Data)
  }

  TendarAssEntFill(Data: any): Observable<any> {
    return this.http.post<any>('AssMast/TendarAssEntFill', Data)
  }

  TendarAssPrdSave(Data: any): Observable<any> {
    return this.http.post<any>('AssMast/TendarAssPrdSave', Data)
  }

  TendarAssTrnSave(Data: any): Observable<any> {
    return this.http.post<any>('AssMast/TendarAssTrnSave', Data)
  }

  async FindRapAss(Data: any) {
    return this.http.post<any>('AssMast/FindRapAss', Data).toPromise()
  }
}
