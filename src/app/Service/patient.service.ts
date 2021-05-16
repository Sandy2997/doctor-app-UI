import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Patients } from '../Shared/material/constent';
import { PATIENTS } from '../Shared/mockdata';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor() { }

  getPatients(): Observable<Patients[]> {
    var patients = of(PATIENTS);
    console.log(patients);
    return patients;
  }
}
