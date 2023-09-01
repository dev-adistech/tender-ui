import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TendarEstService {

  constructor(private http: HttpClient) { }

  
  TendarPrdDetDisp(Data: any): Observable<any> {
    return this.http.post<any>('TendarEst/TendarPrdDetDisp', Data)
  }
  
  TendarPrdDetSave(Data: any): Observable<any> {
    return this.http.post<any>('TendarEst/TendarPrdDetSave', Data)
  }
  
  TendarResSave(Data: any): Observable<any> {
    return this.http.post<any>('TendarEst/TendarResSave', Data)
  }

  TendarApprove(Data: any): Observable<any> {
    return this.http.post<any>('TendarEst/TendarApprove', Data)
  }

  async FindRap(Data: any) {
    return this.http.post<any>('TendarEst/FindRap', Data).toPromise()
  }

  TendarVidUpload(Data: any): Observable<any> {
    return this.http.post<any>('TendarEst/TendarVidUpload', Data)
  }

  TendarVidDisp(Data: any): Observable<any> {
    return this.http.post<any>('TendarEst/TendarVidDisp', Data)
  }

  TendarVidDelete(Data: any): Observable<any> {
    return this.http.post<any>('TendarEst/TendarVidDelete', Data)
  }

  TendarPrdDetDock(Data: any): Observable<any> {
    return this.http.post<any>('TendarEst/TendarPrdDetDock', Data)
  }
  
  TendarVidUploadDisp(Data: any): Observable<any> {
    return this.http.post<any>('TendarEst/TendarVidUploadDisp', Data)
  }
}
