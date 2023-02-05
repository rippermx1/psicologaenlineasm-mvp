import { Component, OnInit } from '@angular/core';
import { DONE, IN_TREATMENT } from '../../constants/patient.constants';
import { Patient } from '../../interfaces/patient.interface';
import { PatientsService } from '../../service/patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  title: string = 'Pacientes';
  fecthingData: boolean = false;
  patients: Patient[] = [];
  specialist_uuid: string = "7ea60899-e908-49b3-b4e4-ef775f4dfd22";
  in_treatment = IN_TREATMENT
  done = DONE;
  
  constructor(
    private service: PatientsService
  ) { }

  ngOnInit(): void {
    this.getPatients(this.specialist_uuid);
  }

  getPatients(specialist_uuid: string) {
    this.fecthingData = true;
    this.service.getPatients(specialist_uuid).subscribe(patients => {
      console.log(patients)
      this.fecthingData = false;
      this.patients = patients;
    });
  }

  loadPatientInfo() {

  }

}
