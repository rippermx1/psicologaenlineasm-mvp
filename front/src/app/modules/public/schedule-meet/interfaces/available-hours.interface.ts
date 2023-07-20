export interface AvailableHours {
  active: boolean;
  selected: boolean;
  status: string;
  time: string;
  value: string;
}

export interface AvailableHoursResponse {
  hours: AvailableHours[];
  status: string;
}
