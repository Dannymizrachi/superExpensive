export class UserRegistrationDetails {
  public constructor(
    public userName?: string,
    public password?: string,
    public email?: string,
    public city?: string,
    public street?: string,
    public firstName?: string,
    public lastName?: string
  ) {}
}
