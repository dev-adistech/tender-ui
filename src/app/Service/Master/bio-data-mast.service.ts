import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BioDataMastService {

  constructor(private http: HttpClient) { }

  BioDataSave(Data: any): Observable<any> {
    return this.http.post<any>('BioDataMast/BioDataSave', Data)
  }

  BioDataDelete(Data: any): Observable<any> {
    return this.http.post<any>('BioDataMast/BioDataDelete', Data)
  }

  BioDataFill(Data: any): Observable<any> {
    return this.http.post<any>('BioDataMast/BioDataFill', Data)
  }
  BioDataImgFill(Data: any): Observable<any> {
    return this.http.post<any>('BioDataMast/BioDataImgFill', Data)
  }
  BioDataDocument(Data: any): Observable<any> {
    return this.http.post<any>('BioDataMast/BioDataDocument', Data)
  }
  FileSearch(Data: any): Observable<any> {
    return this.http.post<any>('BioDataMast/FileSearch', Data)
  }
  async FileExploreropen(Data: any) {
    return this.http.post<any>('BioDataMast/FileExploreropen', Data).toPromise();
  }
}
