import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { SalesforceService } from '../salesforce.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  isSubmitting: boolean = false;
  myForm!: FormGroup;
  Urs: any[] = [];
  UsersId: any[] = [];
  IdTeam: any;

  constructor(
    private location: Location,
    public dialogRef: MatDialogRef<AddTeamComponent>,
    private salesforceService: SalesforceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Description__c: ['']
    });

    this.salesforceService.getInfos(`select Id, Name from User`).subscribe(
      (response: any) => {
        this.Urs = response.records.map((team: any) => ({
          id: team.Id,
          name: team.Name
        }));
      },
      (error: any) => {
        console.error('Error retrieving accounts:', error);
      }
    );
  }

  submitForm() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      this.isSubmitting = true;

      console.log(this.UsersId);

      this.salesforceService.createRecord('Team__c', formData).subscribe(
        (response: any) => {
          console.log('Project added successfully:', response);
          this.IdTeam = response.records;
        },
        (error: any) => {
          console.error('Error adding team:', error);
          this.isSubmitting = false;
        }
      );

      this.UsersId.forEach((userId: any) => {
        const userTeamData = {
          Name: 'hack',
          Team__c: this.IdTeam,
          User__c: userId
        };

        console.log('tesst', userTeamData);

        this.salesforceService.createRecord('UserTeam__c', userTeamData).subscribe(
          (userTeamResponse: any) => {
            console.log('UserTeam added successfully:', userTeamResponse);
          },
          (userTeamError: any) => {
            console.error('Error adding UserTeam:', userTeamError);
          }
        );
      });

      this.UsersId = [];
      this.isSubmitting = false;
      this.dialogRef.close();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  showSelectedOptions(selectedIds: any) {
    this.UsersId.push(selectedIds);
  }
}
