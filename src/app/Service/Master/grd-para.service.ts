import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrdParaService {

  constructor(private http: HttpClient) { }

  GrdParaMastFill(Data: any): Observable<any> {
    return this.http.post<any>('GrdparaMast/GrdParaMastFill', Data)
  }
  GrdParaMastSave(Data: any): Observable<any> {
    return this.http.post<any>('GrdparaMast/GrdParaMastSave', Data)
  }
  GrdParaMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('GrdparaMast/GrdParaMastDelete', Data)
  }
}
