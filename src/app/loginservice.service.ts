import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  user:LoginUser
  path= "http://localhost:9090/auth/authenticate"
  constructor(private client:HttpClient) { }
  public isLogedIn = false;
  login(user:LoginUser){
    console.log("Inservice")
    console.log(user)
    this.isLogedIn=true;
    return this.client.post(this.path,user,{responseType:'text'})
  }
  logStatus():boolean{
    console.log(this.isLogedIn);
    return this.isLogedIn;
  }

}
export class LoginUser{
  name:string;
  password:string
}
