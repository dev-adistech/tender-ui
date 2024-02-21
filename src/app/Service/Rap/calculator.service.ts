import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private http: HttpClient) { }

  RapDisMastFill(Data: any): Observable<any> {
    return this.http.post<any>('Calculator/RapDisMastFill', Data)
  }

  async FindORap(Data: any) {
    return this.http.post<any>('Calculator/FindORap', Data).toPromise()
  }
}
