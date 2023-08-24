import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MakReturnService {

  constructor(private http: HttpClient) { }

  makreturnFill(Data: any): Observable<any> {
    return this.http.post<any>('Makreturn/makreturnFill', Data)
  }
}
