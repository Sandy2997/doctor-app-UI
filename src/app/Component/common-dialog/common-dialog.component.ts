import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDetails } from 'src/app/Shared/material/constent';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.css']
})
export class CommonDialogComponent implements OnInit {

  dialogType: string;
  editDetails: any;
  deleteDetails:any;
  editForm: FormGroup;


  constructor(
    private dialogRef : MatDialogRef<CommonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data : DialogDetails,
    private fb: FormBuilder
  ) {
    this.dialogType = data.dialogType;
    this.editDetails = data.dialogType == 'editDetails' ? data.patientData : [];
    this.deleteDetails = data.dialogType == 'deleteDetails' ? data.patientData : [];
    this.editForm = this.fb.group({
      patientName : ['', Validators.required],
      patientMobile : ['', Validators.required]
    })
   }

  ngOnInit(): void {
    // console.log(this.data.patientData.patientName);
    this.editForm.controls['patientName'].patchValue(this.editDetails.patientName);
    this.editForm.controls['patientMobile'].patchValue(this.editDetails.mobile);
    //this.editForm.controls['patientName'] = this.editDetails.patientName;
  }

  editDetail(event:any) {
    console.log(event);
    this.dialogRef.close(true);
  }

  cancelled() {
    this.dialogRef.close(false);
  }

  deleted() {
    this.dialogRef.close(true);
  }

}
