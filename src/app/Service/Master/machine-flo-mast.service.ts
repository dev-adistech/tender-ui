import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MachineFloMastService {

  constructor(private http: HttpClient) { }

  MachineFloMastFill(Data: any): Observable<any> {
    return this.http.post<any>('MachineFloMast/MachineFloMastFill', Data)
  }

  MachineFloMastSave(Data: any): Observable<any> {
    return this.http.post<any>('MachineFloMast/MachineFloMastSave', Data)
  }

  MachineFloMastDelete(Data: any): Observable<any> {
    return this.http.post<any>('MachineFloMast/MachineFloMastDelete', Data)
  }
}
