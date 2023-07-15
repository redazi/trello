import { Component, Inject } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalesforceService } from '../salesforce.service';

@Component({
  selector: 'app-usersteam',
  templateUrl: './usersteam.component.html',
  styleUrls: ['./usersteam.component.css']
})
export class UsersteamComponent {
  public Users!: any[];
  public Projets! : any[];
  constructor(private salesforceService: SalesforceService, private dialog: MatDialogRef<UsersteamComponent>, @Inject(MAT_DIALOG_DATA) public team: any) {}
  ngOnInit() {
    
    //lister useres affecter a cette team
    
        this.salesforceService.getInfos(`select Name, SmallPhotoUrl from User where Id IN (SELECT User__c from UserTeam__c where Team__c ='${this.team.Id}')`)
          .subscribe(
            response => {
              this.Users = response.records;
              console.log(this.Users);
            },
            error => {
              console.error('Error retrieving Teams:', error);
            }
          );
      
      //lister les projet affecter a cette team deja fait et en cours 
            
      this.salesforceService.getInfos(`select Name, StartDate__c, EndDate__c  from Project__c where Team__c='${this.team.Id}'`)
      .subscribe(
        response => {
          this.Projets = response.records;
        },
        error => {
          console.error('Error retrieving Teams:', error);
        }
      );
  }
}
