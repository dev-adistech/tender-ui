import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BonusMastService {

  // public url = environment.BaseUrl

//   router.post('/BonusSave', verifyToken, _bonusMast.BonusSave)
// router.post('/BonusDelte', verifyToken, _bonusMast.BonusDelte)
// router.post('/BonusFill', verifyToken, _bonusMast.BonusFill)

  constructor(private http: HttpClient) { }

  BonusSave(Data: any): Observable<any> {
    return this.http.post<any>('BonusMast/BonusSave', Data)
  }

  BonusDelte(Data: any): Observable<any> {
    return this.http.post<any>('BonusMast/BonusDelte', Data)
  }

  BonusFill(Data: any): Observable<any> {
    return this.http.post<any>('BonusMast/BonusFill', Data)
  }

}