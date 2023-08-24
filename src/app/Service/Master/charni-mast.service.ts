import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharniMastService {

//   public url = environment.BaseUrl
//   router.post('/ChrMastSave', verifyToken, _charniMast.ChrMastSave)
//   router.post('/CHRMASTDelete', verifyToken, _charniMast.CHRMASTDelete)
//   router.post('/ChrMastFill', verifyToken, _charniMast.ChrMastFill)
  

  constructor(private http: HttpClient) { }

  ChrMastSave(Data: any): Observable<any> {
    return this.http.post<any>('CharniMast/ChrMastSave', Data)
  }

  CHRMASTDelete(Data: any): Observable<any> {
    return this.http.post<any>('CharniMast/CHRMASTDelete', Data)
  }

  ChrMastFill(Data: any): Observable<any> {
    return this.http.post<any>('CharniMast/ChrMastFill', Data)
  }

}