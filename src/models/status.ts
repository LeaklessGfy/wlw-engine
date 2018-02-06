export const STATUS_NORMAL = "status::normal";
export const STATUS_BLEEDING = "status::bleeding";
export const STATUS_INJURED = "status::injured";
export const STATUS_UNLEASHED = "status::unleashed";
export const STATUS_TIRED = "status::tired";
export const STATUS_STUN = "status::stun";
export const STATUS_CRAZY = "status::crazy";
export const STATUS_ENRAGED = "status::enraged";
export const STATUS_COMEBACK = "status::comeback";
export const STATUS_GROWN = "status::grown";
export const STATUS_KO = "status::ko";

interface Status {
  id: number;
  handlers: string[];
}

export default Status;
