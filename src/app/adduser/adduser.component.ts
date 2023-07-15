import { Component,Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalesforceService } from '../salesforce.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {

    _listUsers!:users[];
    id!: number;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,private salesforce: SalesforceService){}
    ngOnInit(){
      this.id = this.data.Id;
      this.getusers();
    }
    getusers() {
      this.salesforce.getInfos('select Id, Name, Email from User').subscribe(
        (response) => {
          this._listUsers = response.records.map((user: any) => {
            return {
              Id: user.Id,
              Name: user.Name,
              Email: user.Email,
              IsSelected: false
            };
          });
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
    onchange(){
      console.log(this._listUsers);
    }
}

class users{
  Id !: number;
  Name !: string;
  isselected !: boolean;
}
