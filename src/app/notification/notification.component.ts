import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  constructor(private commonService:CommonService) {
    console.log("Notification initialized");
    this.loadNotification();
  }
  
  notifications: Notification[] = [];
  // loadNotification(){
  //   this.commonService.loadNoti(sessionStorage.getItem("custId")).subscribe({
  //     next:(response)=>{
  //       console.log(response);
  //       this.notifications = response;
  //       console.log(this.notifications);
  //       this.commonService.notificationCount = this.notifications.length;
  //     }
  //   })
  // }
  loadNotification() {
    this.commonService.loadNoti(sessionStorage.getItem("custId")).subscribe(data => {
      this.notifications = data;
      // this.commonService.notificationCount = data.length;
 
      // localStorage.setItem('lastSeenNotificationCount', data.length.toString());
 
    });
  }
  delete(id:any){
    this.commonService.deleteNoti(id).subscribe(() => {
      this.notifications = this.notifications.filter(n => n.notificationId !== id);
      this.commonService.notificationCount = this.notifications.length;
    });
    // this.commonService.deleteNoti(id).subscribe({
    //   next:(response)=>{
    //     console.log(id);
    //     console.log(response);
    //     window.location.reload();
    //   }
    // })
  }


}
export class Notification {
  notificationId: number;
  customerId: number;
  policyId: number;
  message: string;
  customerMail: string;
  phoneNumber: number;
}



