import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoneDetailViewService {

  private BaseUrl = environment.BaseUrl;

  constructor(private http: HttpClient) { }

  StoneDetailView(Data:any):Observable<any>{
    // this.http.post<any>('View/BVView', Data)
    return this.http.post<any>('StoneDetailView/StoneDetailView',Data);
  }

  PartyEmailIdList(Data:any):Observable<any>{
    return this.http.post<any>('StoneDetailView/PartyEmailIdList',Data);
  }

  PacketOfferView(Data:any):Observable<any>{
    return this.http.post<any>('StoneDetailView/PacketOfferView',Data);
  }

  OfferEntrySave(Data:any):Observable<any>{
    return this.http.post<any>('StoneDetailView/OfferEntrySave',Data);
  }

}
