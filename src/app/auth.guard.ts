import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if(sessionStorage.getItem("role")==="admin" || sessionStorage.getItem("role")==="agent" ){
    console.log("Admin access granted");
    return true;
    }
    else{
      console.log("Admin access not granted");
      return false;
    }
};
