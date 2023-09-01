import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LotGrpMastService {

  constructor(private http: HttpClient) { }

  LotGrpMastFill(Data: any): Observable<any> {
    return this.http.post<any>('LotGrp/LotGrpMastFill', Data)
  }

  LotGrpMastSave(Data: any): Observable<any> {
    return this.http.post<any>('LotGrp/LotGrpMastSave', Data)
  }

  LotGrpMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('LotGrp/LotGrpMastDelete', Data)
  }
}
