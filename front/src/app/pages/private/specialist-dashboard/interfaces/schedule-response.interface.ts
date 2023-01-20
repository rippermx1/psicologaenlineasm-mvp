export interface ScheduleResponse {
    schedule: Schedule[];
    status: string;
}

export interface Schedule {
    blocks: Block[];
    date: string;
    specialist_uuid: string;
    uuid: string;
}

export interface Block {
    active: boolean;
    id: number;
    selected: boolean;
    status: string;
    time: string;
    value: string;
}
