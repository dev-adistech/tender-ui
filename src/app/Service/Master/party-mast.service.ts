import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartyMastService {
  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  PartyMastFill(Data: any): Observable<any> {
    return this.http.post<any>('PartyMast/PartyMastFill', Data)
  }

  PartyMastSave(Data: any): Observable<any> {
    return this.http.post<any>('PartyMast/PartyMastSave', Data)
  }

  PartyMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('PartyMast/PartyMastDelete', Data)
  }

}

