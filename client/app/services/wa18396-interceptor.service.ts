import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpUserEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Wa18396InterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    if (req.responseType === 'json') {
      req = req.clone({ responseType: 'text' });
      return next.handle(req).map(response => {
        if (response instanceof HttpResponse) {
          response = response.clone<any>({ body: JSON.parse(response.body) });
        }
        return response;
      });
    }

    return next.handle(req);
  }
  constructor() {}
}
