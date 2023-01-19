export interface SheduleResponse {
    schedule: ScheduleDay[];
}

export interface ScheduleDay {
    day_of_year: number;
    block_1: ScheduleDayBlock;
    block_2: ScheduleDayBlock;
    block_3: ScheduleDayBlock;
    block_4: ScheduleDayBlock;
    block_5: ScheduleDayBlock;
    block_6: ScheduleDayBlock;
    block_7: ScheduleDayBlock;
    block_8: ScheduleDayBlock;
    block_9: ScheduleDayBlock;
    block_10: ScheduleDayBlock;
    block_11: ScheduleDayBlock;
    block_12: ScheduleDayBlock;
}

export interface ScheduleDayBlock {
    label: string;
    is_available: boolean;
}