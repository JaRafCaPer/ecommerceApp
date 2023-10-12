export default class TicketDTO {
  constructor(ticket) {
    this.code = ticket?.code ?? "";
    this.purchase_datetime = ticket?.purchase_datetime ?? new Date();
    this.products = ticket?.products ?? [];
    this.amount = ticket?.amount ?? 0;
    this.purchaser = ticket?.purchaser ?? "";
  }
}
