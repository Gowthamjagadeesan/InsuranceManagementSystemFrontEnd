import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'register',
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  myForm:FormGroup;

  constructor(private router:Router,private fb:FormBuilder,private commonService:CommonService){

  }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      uName:['',[Validators.required,Validators.minLength(4),Validators.maxLength(15)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      confirmPassword:['',[Validators.required]],
      role:['',[Validators.required]]
    },{validator:this.passwordMatchValidator})
  }

  passwordMatchValidator(form : FormGroup){
    const password = form.get("password").value;
    const conPassword = form.get("confirmPassword").value;
    return password === conPassword ? null :{mismatch:true}
  }
  onReset() :void{
    this.myForm.reset();
  }
  submit(form) : void{
    if(this.myForm.valid){
      this.commonService.onSubmit(form)
    }
  }
  
}
