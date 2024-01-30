import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  async LoginAuthentication(Data: any) {
    return this.http.post<any>('Login/LoginAuthentication', Data).toPromise()
  }

  async UserFrmOpePer(Data: any) {
    return this.http.post<any>('Login/UserFrmOpePer', Data).toPromise()
  }
  EmailSendOTP(Data: any) {
    return this.http.post<any>('Login/EmailSendOTP', Data)
  }
  GetEmail(Data: any) {
    return this.http.post<any>('Login/GetEmail', Data)
  }

  async UserFrmPer(Data: any) {

    // this.http.post<any>('Login/UserFrmPer', Data).subscribe(rapres => {
    //   try {
    //     if (rapres.success == true) {
    //       this.RAPTArray = rapres.data.map(item => {
    //         return { code: item.RAPTYPE, name: item.RAPNAME };
    //       });
    //       this.RAPTYPE = rapres.data[0].RAPTYPE
    //     } else {
    //     }
    //   } catch (error) {
    //     this.spinner.hide();
    //     this.toastr.error(error);
    //   }
    // });

    return this.http.post<any>('Login/UserFrmPer', Data).toPromise()
  }

  SendNotification(Data: any): Observable<any> {
    return this.http.post<any>('send_mybasket', Data)
  }
}
