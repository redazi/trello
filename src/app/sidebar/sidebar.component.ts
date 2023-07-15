import { Component } from '@angular/core';
import { SalesforceService } from '../salesforce.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  profile!: string;
  Name!: string;
  email!: string;
  given_name!: string;
  picture !: string;

  constructor(private salesforceService: SalesforceService){}
  ngOnInit() {
    this.salesforceService.getInfoUserLog().subscribe(
      (response) => {
        console.log(response);
        this.Name = response.family_name;
        this.email = response.email;
        this.given_name = response.given_name;
        this.picture = response.picture;
       
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    
  }
  
}

