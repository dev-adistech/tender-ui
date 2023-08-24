import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MacComMastService {

  constructor(private http: HttpClient) { }

  MachComMastFill(Data: any): Observable<any> {
    return this.http.post<any>('MacComMast/MachComMastFill', Data)
  }

  MachComMastSave(Data: any): Observable<any> {
    return this.http.post<any>('MacComMast/MachComMastSave', Data)
  }

  MachComMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('MacComMast/MachComMastDelete', Data)
  }
}
