import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { UsersteamComponent } from '../usersteam/usersteam.component';
import { AddTeamComponent } from '../add-team/add-team.component';
import { AdduserComponent } from '../adduser/adduser.component';
import { SalesforceService } from '../salesforce.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent {
  public filteredTeams!: any[];
  public Teams!: any[];
  isSubmitting: boolean = false;
  isSubmit: boolean = false;

  constructor(private salesforceService: SalesforceService,private dialog: MatDialog) {}

  openFieldFormDialog() {
    this.isSubmitting = true;
    const dialogRef = this.dialog.open(AddTeamComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.isSubmitting = false;
    });
  }
  openAdduserdialog() {
    this.isSubmit = true;
    const dialogRef = this.dialog.open(AdduserComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.isSubmit = false;
    });
  }
  
  searchTeams(event: any) {
    const searchValue = event.target.value;
    
    if (searchValue.trim() === '') {
      this.filteredTeams = this.Teams;
    } else {
      this.filteredTeams = this.Teams.filter(tea =>
        tea.Name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  }

  ngOnInit() {
    
    this.salesforceService.getInfos('SELECT Id, Name, (SELECT User__r.Id, User__r.SmallPhotoUrl, User__r.Name FROM UserTeams__r) FROM Team__c').subscribe(
      response => {
        this.Teams = response.records;
        this.filteredTeams = this.Teams;
        console.log(this.Teams);
      },
      error => {
        console.error('Error retrieving Teams:', error);
      }
    );
  }
  openPopup(team: any) {
    const dialogRef = this.dialog.open(UsersteamComponent, {
      width: '400px',
      data: team
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
}
}
