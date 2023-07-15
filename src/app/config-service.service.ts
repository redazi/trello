import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {

    constructor(private location: Location) {
      
    }
  
    getAccessToken(): string {

      const urlParams = new URLSearchParams(this.location.path(false));
      
      const accessToken = urlParams.get('access_token');
      //localStorage.setItem('access', urlParams.get('access_token'));
      //return accessToken ? decodeURIComponent(accessToken) : 'null';
     return "00D8d00000AXNnw!ARYAQKpzH_Ut5DCluYWm9s2_7FZsjrY.Xqi0tKQnWgOkiouR2PTaykcLDUd9psp2QcR3_btDYvp5IP5u4aNBABDBCkMyAbJm";
    }
  //localStorage.setItem('accessToken', this.accessToken);
    //localStorage.setItem('this.domain', this.domain);
    getDomain(): string {
      const urlParams = new URLSearchParams(this.location.path(false));
      const domain = urlParams.get('domain');
      //localStorage.setItem('this.domain', domain);
      //return domain ? decodeURIComponent(domain) : 'null';
      return "its-b1-dev-ed.develop.my.salesforce.com";
    }
  
    removeAccessTokenFromURL() {
      const urlWithoutAccessToken = this.location.path().split('?')[0];
      this.location.replaceState(urlWithoutAccessToken);
    }
  }
  