import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LockMastService {
  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  LockMastFill(Data: any): Observable<any> {
    return this.http.post<any>('LockMast/LockMastFill', Data)
  }

  LockMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('LockMast/LockMastDelete', Data)
  }

  LockMastSave(Data: any): Observable<any> {
    return this.http.post<any>('LockMast/LockMastSave', Data)
  }

}
