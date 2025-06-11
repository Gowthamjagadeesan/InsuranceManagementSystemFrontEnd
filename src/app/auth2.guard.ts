import { CanActivateFn, Router } from '@angular/router';
import { CommonService } from './common.service';
import { inject } from '@angular/core';


export const auth2Guard: CanActivateFn = (route, state) => {
  
  const router = inject(Router)
  // Check if the user is logged in
  if(localStorage.getItem("token")){
    return true;
  }
  else{
    alert("You are not logged in. Please log in to access this page.");
    // Redirect to login page or home page
    router.navigate(['/login']);
    

    // router.navigate(['/home']);
    return false;
  }
};
