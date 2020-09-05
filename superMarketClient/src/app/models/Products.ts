export class Products {
  public constructor(
    public product_name?: string,
    public unit_price?: number,
    public total_price?: number,
    public id?: number,
    public category?: string,
    public description?: string,
    public amount?: number
  ) {}
}
