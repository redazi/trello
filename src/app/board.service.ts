import { Injectable } from '@angular/core';
import { Board } from './shared/models/schema.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from './board/list.model';
import { ConfigServiceService } from './config-service.service';
import { SalesforceService } from './salesforce.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private accessToken!: string;
  private domain!: string;
  private url!: string;
  private headers!:any;
  private _boards: Board[] = require('./data.json');
  constructor(private sales : SalesforceService,private httpClient : HttpClient,private configService: ConfigServiceService,  private http: HttpClient,) { 

  }

  
  

  add(name: string, projectId: string): Observable<any> {
    this.url = "https://"+this.domain+"/services/data/v58.0/sobjects/List__c";
    this.accessToken = this.configService.getAccessToken();
    this.domain =this.configService.getDomain();
      const headers = {
        "Authorization": "Bearer "+ this.accessToken  ,
        "Content-Type": "application/json"
      }
  
  
      const body = {
        'Name': name,
        'Project__c': projectId
      };
  
      return this.http.post<any>(this.url, body, { headers });
    }
  
  

  getBoards(): Board[] {
    return this._boards;
  }
  getBoardsById(id : number): Board {
    return this.getBoards().find(_boards => _boards.id == id);
  }

  private baseURL = "q=SELECT+Id,Name+FROM+List__c+WHERE+Project__r.Name='Extension Projet'"

  list(id : any):Observable<any>{
  
    this.accessToken = this.configService.getAccessToken();
    this.domain =this.configService.getDomain();
    this.url = "https://"+this.domain+"/services/data/v58.0/query/?q=SELECT+Id,Name+FROM+List__c+WHERE+Project__c='"+id+"'";
  
    console.log("BoardService",this.accessToken);
    console.log("BoardService",this.domain);
    console.log(" list():Observable<any> this.accessToken",this.accessToken);
    console.log(" list():Observable<any> this.domain",this.domain);
    console.log(" list():Observable<any> this.url",this.url);
    const headers = {
      "Authorization": "Bearer "+ this.accessToken  ,
      "Content-Type": "application/json"
    }

    return this.httpClient.get<any>(this.url, { headers });
  }

}
