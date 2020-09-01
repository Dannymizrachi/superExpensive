export class OrderDetails {
  public constructor(
    public shippingCity?: string,
    public shippingStreet?: string,
    public shippingDate?: Date,
    public CreditCard?: number
  ) {}
}
