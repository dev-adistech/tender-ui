import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginPermissionService {

  public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  
  CompPerMastIPFill(Data:any):Observable<any>{
    return this.http.post<any>('LoginPermission/CompPerMastIPFill',Data)
  }

  CompPerMastIPSave(Data:any):Observable<any>{
    return this.http.post<any>('LoginPermission/CompPerMastIPSave',Data)
  }

  CompPerMastIPDelete(Data:any):Observable<any>{
    return this.http.post<any>('LoginPermission/CompPerMastIPDelete',Data)
  }
}
