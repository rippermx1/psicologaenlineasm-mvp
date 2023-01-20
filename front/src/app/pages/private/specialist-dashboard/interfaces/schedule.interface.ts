import { Block } from "./schedule-response.interface";

export interface Schedule {
    date: Date;
    day: string;
    blocks: Block[];
    specialist_uuid?: string;
    expand?: boolean;
}
