export class Receipt {
    public constructor(
      public amount?: number,
      public itemTotalPrice?: number,
      public cartTotalPrice?: number,
      public product_name?: string,
    ) {}
  }
  