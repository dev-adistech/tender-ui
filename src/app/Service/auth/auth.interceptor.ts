import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public url = environment.BaseUrl
  public port = environment.PORT
  public port1 = environment.PORT1


  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let APIURLTail = req.url

    if (APIURLTail.includes('notification')) {
      req = req.clone({
        url: `http://${this.url}:${this.port}/${APIURLTail}`
      })
      // } else if (APIURLTail.includes('api-view')) {
      //   req = req.clone({
      //     url: 'http://' + this.url + ':5000/' + APIURLTail
      //   })
      // } else if (APIURLTail.includes('api-report')) {
      //   req = req.clone({
      //     url: 'http://' + this.url + ':7000/' + APIURLTail
      //   })
      // } else if (APIURLTail.includes('api-rap')) {
      //   req = req.clone({
      //     url: 'http://' + this.url + ':8000/' + APIURLTail
      //   })
    } else if (APIURLTail == 'reload_program') {
      req = req.clone({
        url: `http://${this.url}:${this.port1}/${APIURLTail}`
      })
    }

    else if (APIURLTail.includes('cloud.peacocktech.in')) {
      req = req.clone({
        url: APIURLTail
      })
    } else if (APIURLTail == 'send_mybasket') {
      req = req.clone({
        url: `http://${this.url}:${this.port1}/${APIURLTail}`
      })
    } else if (APIURLTail == 'DaimondPending') {
      req = req.clone({
        url: `http://${this.url}:${this.port1}/${APIURLTail}`
      })
    }
    else {
      req = req.clone({
        url: `http://${this.url}:${this.port}/api/${APIURLTail}`
      })
    }

    if (sessionStorage.getItem('token') != null) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
          .set('Cache-Control', 'max-age=3, must-revalidate')
      });
      return next.handle(clonedReq).pipe(
        tap(
          succ => { },
          err => {
            if (err.status == 401) {
              sessionStorage.removeItem('token');
              this.router.navigateByUrl('login');
            } else if (err.status != 200) {
              alert('SQL connection lost, realod prgoram or contact admin.')
            }
          }
        )
      )
    }
    else
      return next.handle(req.clone());
  }
}
