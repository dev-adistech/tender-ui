import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankSlapMastService {

  // public url = environment.BaseUrl

//   router.post('/BonusSave', verifyToken, _bonusMast.BonusSave)
// router.post('/BonusDelte', verifyToken, _bonusMast.BonusDelte)
// router.post('/BonusFill', verifyToken, _bonusMast.BonusFill)

  constructor(private http: HttpClient) { }

  BankSlabSave(Data: any): Observable<any> {
    return this.http.post<any>('BankSlapMast/BankSlabSave', Data)
  }

  BankSlabDelete(Data: any): Observable<any> {
    return this.http.post<any>('BankSlapMast/BankSlabDelete', Data)
  }

  BankSlabFill(Data: any): Observable<any> {
    return this.http.post<any>('BankSlapMast/BankSlabFill', Data)
  }

// BankSlabSave
// BankSlabDelete
// BankSlabFill
}