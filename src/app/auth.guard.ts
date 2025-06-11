
import { Inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CommonService } from './common.service';


export const authGuard: CanActivateFn = (route, state) => {

  
  if(sessionStorage.getItem("role")==="admin" || sessionStorage.getItem("role")==="agent" ){
  
    console.log("Admin access granted");
    return true;
    }
    else{
      alert("You are not authorized to access this page. Please log in as an admin or agent.");
      console.log("Admin access not granted");
      return false;
    }
};

