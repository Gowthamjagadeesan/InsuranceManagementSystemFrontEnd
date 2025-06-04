import { HttpInterceptorFn } from '@angular/common/http';
 
export const authInterceptor: HttpInterceptorFn = (req, next) => {
 
  const token = localStorage.getItem('token');
  // if (req.url.includes('/auth/new') || req.url.includes('/auth/authenticate') ||  req.url.includes('auth/delete/')) {
  //   return next(req);
  // }
  // else
   if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }
  return next(req);
 
  // return next(req);
};
 
 