import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PartyLabMastService {

    // public url = environment.BaseUrl

    constructor(private http: HttpClient) { }

    PartyLabMastFil(Data: any): Observable<any> {
        return this.http.post<any>('PartyLabMast/PartyLabMastFil', Data)
    }

    PartyLabMastSave(Data: any): Observable<any> {
        return this.http.post<any>('PartyLabMast/PartyLabMastSave', Data)
    }

    PartyLabMastDelete(Data: any): Observable<any> {
        return this.http.post<any>('PartyLabMast/PartyLabMastDelete', Data)
    }

    PartyLabOrdCheck(Data: any): Observable<any> {
        return this.http.post<any>('PartyLabMast/PartyLabOrdCheck', Data)
    }


}
