import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartyPrcMastService {
  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  PartyPrcMastFill(Data: any): Observable<any> {
    return this.http.post<any>('PartyPrcMast/PartyPrcMastFill', Data)
  }

  PartyPrcMastSave(Data: any): Observable<any> {
    return this.http.post<any>('PartyPrcMast/PartyPrcMastSave', Data)
  }

  PartyPrcMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('PartyPrcMast/PartyPrcMastDelete', Data)
  }

}
