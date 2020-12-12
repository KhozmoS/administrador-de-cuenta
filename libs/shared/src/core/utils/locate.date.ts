export class LocalDate {
  private static tzoffset = (new Date()).getTimezoneOffset() * 60000;
  public static localDate(): Date {    
    return (new Date(Date.now() - this.tzoffset));
  }
  public static localISODate(): string {
    return (new Date(Date.now() - this.tzoffset)).toISOString().slice(0, -1);
  }
}