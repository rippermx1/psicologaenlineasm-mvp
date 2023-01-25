export interface DaysOfWeek {
  date: Date;
  day: string;
  selected: boolean;
}

export interface Meet {
  block?: string;
  date?: string;
  specialist_uuid?: string;
  status?: string;
  uuid?: string;
  patient_cellphone?: string;
  patient_email?: string;
  patient_fullname?: string;
  patient_rut?: string;
  patient_uuid?: string;
}
