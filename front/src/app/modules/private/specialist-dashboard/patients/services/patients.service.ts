import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { query, where } from 'firebase/firestore';
import { map } from 'rxjs/operators';
import { Patient } from '../interfaces/patient.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private patientsRef;
  constructor(
    private fs: Firestore
  ) { 
    this.patientsRef = collection(this.fs, 'patients');
  }

  getPatients(specialist_uuid: string): Observable<Patient[]> {
    return collectionData(query(this.patientsRef, where('specialist_uuid', '==', specialist_uuid)))
    .pipe(map(doc => doc as Patient[]));
  }
}
