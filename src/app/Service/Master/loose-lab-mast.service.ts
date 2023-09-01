import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LooseLabMastService {

  constructor(private http: HttpClient) { }

  LooseLabMastFill(Data: any): Observable<any> {
    return this.http.post<any>('LooseLabMast/LooseLabMastFill', Data)
  }

  LooseLabMastSave(Data: any): Observable<any> {
    return this.http.post<any>('LooseLabMast/LooseLabMastSave', Data)
  }

  LooseLabMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('LooseLabMast/LooseLabMastDelete', Data)
  }
}
