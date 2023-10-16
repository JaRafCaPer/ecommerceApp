export default class ResetTokenDTO {
  constructor(resetToken) {
    this.user = resetToken?.user ?? "";
    this.token = resetToken?.token ?? "";
    this.createdAt = resetToken?.expiration ?? new Date();
  }
}
