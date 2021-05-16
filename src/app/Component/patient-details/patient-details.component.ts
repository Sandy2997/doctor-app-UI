import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Patients } from 'src/app/Shared/material/patients';
import { PatientService } from 'src/app/Service/patient.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  loggedUser: any;
  patients :any = {};
  displayedColumns = ['pName', 'pmobile', 'edit', 'delete'];
  constructor(
    private route: Router,
    private dialog: MatDialog,
    private toast: ToastrService,
    private patientService: PatientService
  ) {
    if (localStorage.getItem('loggedUser')) {
      this.loggedUser = localStorage.getItem('loggedUser');

    }
    else {
      this.route.navigateByUrl('');
    }
   }

  ngOnInit(): void {
    if (this.loggedUser) {
      this.getPatientDetails(this.loggedUser);
    }
  }

  getPatientDetails(loggedUser: any) {
    this.patients = [];
    this.patientService.getPatients().subscribe(data => {
      this.patients = data.filter(patientDetails => patientDetails.docterName == loggedUser)
    });
    console.log(this.patients);
  }

  logout() {
    localStorage.clear();
    this.route.navigateByUrl('');
  }

  edit(details :any) {
    const editDialog = this.dialog.open(CommonDialogComponent, {
      disableClose: true,
      data: {
        dialogType : 'editDetails',
        patientData: details
      }
    });
    editDialog.afterClosed().subscribe((res:any) => {
      console.log(res);
      if (res) {
        this.toast.success('Patient Details Updated Successfully', '');
      }
    });
  }

  delete(details : any) {
    console.log(details)
    const deleteDialog = this.dialog.open(CommonDialogComponent, {
      disableClose: true,
      data: {
        dialogType: 'deleteDetails'
      }
    });
    deleteDialog.afterClosed().subscribe((res:any) => {
      console.log(res);
      if (res) {
        this.toast.success('Patient Details Deleted Successfully', '');
      }
    });
  }
  
}
