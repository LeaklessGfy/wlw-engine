import Envelope from "../models/Envelope";

interface EventManager {
  subscribe(key: string, callback: (data: any, envelope: Envelope) => void): void;
  publish(key: string, data: any): void;
}

export default EventManager;
