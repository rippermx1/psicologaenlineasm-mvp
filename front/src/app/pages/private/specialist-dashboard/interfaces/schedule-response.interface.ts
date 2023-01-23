export interface ScheduleResponse {
    schedule: Schedule[];
    status: string;
}

export interface Schedule {
    date: string;
    specialist_uuid: string;
    uuid: string;
    block_0: Block;
    block_1: Block;
    block_2: Block;
    block_3: Block;
    block_4: Block;
    block_5: Block;
    block_6: Block;
    block_7: Block;
    block_8: Block;
    block_9: Block;
    block_10: Block;
    block_11: Block;
}

export interface Block {
    active: boolean;
    id: number;
    selected: boolean;
    status: string;
    time: string;
    value: string;
}
