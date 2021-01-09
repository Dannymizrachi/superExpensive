import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css'],
})
export class ThankYouComponent implements OnInit {
  fileUrl;
  constructor(private cartService: CartService) {}

  //download txt file with receipt
  public downloadTxtReceipt() {
    this.dyanmicDownload({
      fileName: 'My Report',
      text: this.receiptData(),
    });
  }

  private setting = {
    element: {
      dynamicDownload: null as HTMLElement,
    },
  };

  private dyanmicDownload(arg: { fileName: string; text: string }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType =
      arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute(
      'href',
      `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`
    );
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent('click');
    element.dispatchEvent(event);
  }

  receiptData() {
    let productsArray = [];
    for (let i = 0; i < this.cartService.usersCart.length; i++) {
      productsArray.push(
        `${this.cartService.usersCart[i].product_name}(${this.cartService.usersCart[i].amount})`
      );
      console.log(productsArray);
    }

    return `Dear customer, Your Order has been Completed!\r\n\r\n"
    Here are your shopping details :\r
    Products:  ${productsArray}\r\n
    Total price:  ${this.cartService.total}₪\r\n
    Thank you for shopping with us, We hope we never see you again :)\r\n
    --------------------------mySupermarket--------------------------;`;
  }

  ngOnInit(): void {
    console.log(this.cartService.products);
  }
}
