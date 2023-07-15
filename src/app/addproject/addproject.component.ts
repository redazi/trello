import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import { SalesforceService } from '../salesforce.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.scss']
})
export class AddprojectComponent {
  isSubmitting: boolean = false;
  record: any = {};
  myForm!: FormGroup; 
  public Teams!: any[];
  public theme !:any[];
  isDropdownOpen: boolean = false;
  selectedOption: any = [];

  constructor(public dialogRef: MatDialogRef<AddprojectComponent>, private salesforceService: SalesforceService) {}

  ngOnInit() {
    
    this.myForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      theme__c : new FormControl(),
      StartDate__c : new FormControl(),
      EndDate__c : new FormControl(),
      Team__c: new FormControl()
    });

    this.salesforceService.getInfos(`select Id, Name from Team__c where Id NOT IN (select Team__c from Project__c )`)
          .subscribe(response => {
            this.Teams = response.records.map((team: any) => ({
              value: team.Id,
              label: team.Name
            }));
            console.log(this.Teams);
          },
          error => {
            console.error('Error retrieving teams:', error);
          }
    );

    this.salesforceService.getInfos('select Id, Name from Theme__c').subscribe(
      response => {
        this.theme = response.records
      },
      error=>{
        console.log('rr',error);
      }
      
    )

  }

  submitForm() {
    if (this.myForm.valid) {
      this.isSubmitting = true;
      const startDate = new Date(this.myForm.value.StartDate__c);
      const endDate = new Date(this.myForm.value.EndDate__c);
      const formData = {
        Name: this.myForm.value.Name,
        theme__c: this.myForm.value.theme__c,
        StartDate__c: startDate,
        EndDate__c : endDate,
        Team__c: this.myForm.value.Team__c
      };

      console.log(formData);

      this.salesforceService.createRecord('Project__c', formData)
        .subscribe(
          response => {
            console.log('Project added successfully:', response);
            this.isSubmitting = false;
            this.dialogRef.close();
          },
          error => {
            console.error('Error adding project:', error);
            this.isSubmitting = false;
          }
        );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.myForm.patchValue({ theme__c: this.selectedOption.Id});
    this.isDropdownOpen = false;
  }
}
