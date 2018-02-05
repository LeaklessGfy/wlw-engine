import Handler from "./Handler/handler";

export default class Kernel {
  private handlers: any;

  constructor(handlers: any) {
    this.handlers = handlers;
  }

  public subscribe(handler: Handler) {
    if (!this.handlers[handler.key]) {
      this.handlers[handler.key] = [];
    }
    this.handlers[handler.key].push(handler);
  }
}
