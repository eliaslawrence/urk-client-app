import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import {Storage} from '@ionic/storage-angular';

// rxjs 6
import { from, Observable } from 'rxjs';
import {mergeMap, switchMap} from 'rxjs/operators';

const TOKEN_KEY = 'userToken';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private storage: Storage) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.storage.get(TOKEN_KEY))
      .pipe(mergeMap((token) => {
        request = request.clone({
          setHeaders: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        return next.handle(request);
      }));
  }
}
