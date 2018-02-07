import * as postal from "postal";
import Envelope from "./interfaces/envelope";

export class EventManager {
  private readonly channel = postal.channel("wlw-engine");
  
  subscribe(key: string, callback: (data: any, envelope: Envelope) => void): void {
    this.channel.subscribe(key, callback);
  }

  publish(key: string, data: any): void {
    this.channel.publish(key, data);
  }
};

const WLWEventManager = new EventManager();

export default WLWEventManager;
