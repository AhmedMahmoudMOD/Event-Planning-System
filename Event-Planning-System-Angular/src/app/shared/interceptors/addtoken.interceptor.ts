import { HttpInterceptorFn } from '@angular/common/http';

export const addtokenInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem('token');
  if (token) {
    let clonedReq=req.clone({
      headers:req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(clonedReq);
  }
  return next(req);
};
