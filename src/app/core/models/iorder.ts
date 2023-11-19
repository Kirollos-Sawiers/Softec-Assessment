export interface Iorder {
  OrderId: number;
  OrderDate: string;
  UserId: string;
  Products: Array<{ ProductId: number; Quantity: number }>;
  PaymentType: string;
}
