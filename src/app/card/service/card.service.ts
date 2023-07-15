import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigServiceService } from 'src/app/config-service.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private accessToken!: string;
  private domain!: string;
  private url!: string;
  constructor(private httpClient: HttpClient, private configService: ConfigServiceService) { }


  add(sliderValue : any,List__c: string, createdAt__c: Date, text__c: string, image__c: string, issueType__c: string, priority__c: string, tags__c: string): Observable<any> {
    this.url = "https://" + this.domain + "/services/data/v58.0/sobjects/talk__c";
    this.accessToken = this.configService.getAccessToken();
    this.domain = this.configService.getDomain();
    const headers = {
      "Authorization": "Bearer " + this.accessToken,
      "Content-Type": "application/json"
    }


    const body = {
      'pourcentage__c' : sliderValue,
      'name': 'test redaa',
      'List__c': List__c,
      'createdAt__c': createdAt__c,
      'text__c': text__c,
      'image__c': image__c,
      'issueType__c': issueType__c,
      'priority__c': priority__c,

      //'tags__c': tags__c

    };

    return this.httpClient.post<any>(this.url, body, { headers });
  }
  update(
    talkId: string,
    sliderValue: any,
    List__c: string,
    createdAt__c: Date,
    text__c: string,
    image__c: string,
    issueType__c: string,
    priority__c: string,
    tags__c: string
  ): Observable<any> {
    this.url = "https://" + this.domain + "/services/data/v58.0/sobjects/talk__c/" + talkId;
    this.accessToken = this.configService.getAccessToken();
    this.domain = this.configService.getDomain();
    const headers = {
      "Authorization": "Bearer " + this.accessToken,
      "Content-Type": "application/json"
    }
  
    const body = {
      'pourcentage__c': sliderValue,
      'List__c': List__c,
      'createdAt__c': createdAt__c,
      'text__c': text__c,
      'image__c': image__c,
      'issueType__c': issueType__c,
      'priority__c': priority__c,
      'tags__c': tags__c
    };
  
    return this.httpClient.patch<any>(this.url, body, { headers });
  }
  delete(id: any): Observable<Object> {
    this.accessToken = this.configService.getAccessToken();
    this.domain = this.configService.getDomain();
    this.url = "https://" + this.domain + "/services/data/v58.0/sobjects/Talk__c/" + id;
    const headers = {
      "Authorization": "Bearer " + this.accessToken,
      "Content-Type": "application/json"
    }
    return this.httpClient.delete<any>(this.url, { headers });

  }
  deleteList(id: any): Observable<Object> {
    this.accessToken = this.configService.getAccessToken();
    this.domain = this.configService.getDomain();
    this.url = "https://" + this.domain + "/services/data/v58.0/sobjects/List__c/" + id;
    const headers = {
      "Authorization": "Bearer " + this.accessToken,
      "Content-Type": "application/json"
    }
    return this.httpClient.delete<any>(this.url, { headers });

  }
  checkListIfEmpty(id: any): Observable<Object> {
    this.accessToken = this.configService.getAccessToken();
    this.domain = this.configService.getDomain();
    this.url = "https://" + this.domain + "/services/data/v57.0/query/?q=select Id from talk__c  where list__c='" + id+"'";
   
    const headers = {
      "Authorization": "Bearer " + this.accessToken,
      "Content-Type": "application/json"
    }
    return this.httpClient.get<any>(this.url, { headers });

  }
  list(id:any): Observable<any> {

    this.accessToken = this.configService.getAccessToken();
    this.domain = this.configService.getDomain();

    this.url = "https://" + this.domain + "/services/data/v57.0/query/?q=select Id,createdAt__c, pourcentage__c,image__c, issueType__c, text__c, priority__c,tags__c, List__r.Name, List__r.Id from Talk__c where List__r.Project__r.id='"+id+"'";

    console.log("CardService", this.accessToken);
    console.log("CardService", this.domain);

    const headers = {
      "Authorization": "Bearer " + this.accessToken,
      "Content-Type": "application/json"
    }

    return this.httpClient.get<any>(this.url, { headers });
  }

}

