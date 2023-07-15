import { Component } from '@angular/core';
import { SalesforceService } from '../salesforce.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  projectCount: number = 0;
  teamCount: number = 0;
  profile!: string;
  Name!: string;
  email!: string;
  given_name!: string;
  picture !: string;
  zoneinfo !: string;
  entreprise !: string;
  street_address !:string;
  locality !: string;
  country !: string;
  postal_code !: string;

  constructor(private salesforceService: SalesforceService){}
  ngOnInit() {
    this.salesforceService.getInfoUserLog()
    .subscribe(
      (response) => {
        console.log(response);
        this.Name = response.family_name;
        this.email = response.email;
        this.given_name = response.given_name;
        this.picture = response.picture;
        this.zoneinfo= response.zoneinfo;
        this.street_address=response.address.street_address;
        this.locality=response.address.locality;
        this.country=response.address.country;
        this.postal_code=response.address.postal_code;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    this.salesforceService.getInfos(`SELECT count(Name) FROM Project__c WHERE Team__c IN (SELECT Team__c FROM UserTeam__c WHERE User__r.Id = '0058d000007btgBAAQ')`).subscribe(
      response => {
        this.projectCount = response.records[0].expr0;
        console.log(this.projectCount);
      },
      error => {
        console.error('Error retrieving Teams:', error);
      }
    );
    this.salesforceService.getInfos(`SELECT count(Id) FROM Team__c  WHERE Id IN (SELECT Team__c FROM UserTeam__c WHERE User__c = '0058d000007btgBAAQ')`).subscribe(
      response => {
        this.teamCount = response.records[0].expr0;
        console.log(this.teamCount);
      },
      error => {
        console.error('Error retrieving Teams:', error);
      }
    );
  }
  
 
}
//SELECT Id, Name, (SELECT User__r.Id, User__r.SmallPhotoUrl, User__r.Name FROM UserTeams__r) FROM Team__c'
//select count(name),id from team__c where id in (select team__c from usertteam__c where user__c 0)
