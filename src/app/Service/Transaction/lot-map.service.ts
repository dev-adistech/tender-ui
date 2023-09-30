import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LotMapService {

  constructor(private http: HttpClient) { }

  LotMappingFill(Data: any): Observable<any> {
    return this.http.post<any>('LotMap/LotMappingFill', Data)
  }

  LotMappingSave(Data: any): Observable<any> {
    return this.http.post<any>('LotMap/LotMappingSave', Data)
  }
}
