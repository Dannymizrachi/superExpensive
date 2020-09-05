import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OrdersService } from 'src/app/services/orders.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css'],
})
export class ThankYouComponent implements OnInit {
 
  fileUrl;
  constructor(private sanitizer: DomSanitizer, private orderService:OrdersService) {

  }

  ngOnInit(): void {
    let observable = this.orderService.getReceipt();
    observable.subscribe((receiptDetails)=>{
      this.orderService.receiptDetails = receiptDetails;
      console.log(this.orderService.receiptDetails);
    })
    const data = JSON.stringify(this.orderService.receiptDetails)
    
    //amount from cart items
    //total price from cart items
    //total price from shopping cart
    const blob = new Blob([data], { type: 'application/octet-stream' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      window.URL.createObjectURL(blob)
    );
  }
}
