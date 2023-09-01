import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MacColMastService {

  constructor(private http: HttpClient) { }

  MachineColMastFill(Data: any): Observable<any> {
    return this.http.post<any>('MacColMast/MachineColMastFill', Data)
  }

  MachineColMastSave(Data: any): Observable<any> {
    return this.http.post<any>('MacColMast/MachineColMastSave', Data)
  }

  MachineColMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('MacColMast/MachineColMastDelete', Data)
  }
}
