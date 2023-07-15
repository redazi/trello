import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SalesforceService {
  
  private accessToken: string = '00D8d00000AXNnw!ARYAQKpzH_Ut5DCluYWm9s2_7FZsjrY.Xqi0tKQnWgOkiouR2PTaykcLDUd9psp2QcR3_btDYvp5IP5u4aNBABDBCkMyAbJm';
  private instanceUrl: string = 'https://its-b1-dev-ed.develop.my.salesforce.com';
  
  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return headers;
  }

  public getInfoUserLog() {
    const url = `${this.instanceUrl}/services/oauth2/userinfo`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }
  
  public getInfos(soql :string ): Observable<any> {
    const url = `${this.instanceUrl}/services/data/v58.0/query/?q=${soql}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }
  public createRecord(sObject: string, recordData: any): Observable<any> {
    const url = `${this.instanceUrl}/services/data/v58.0/sobjects/${sObject}`;
    return this.http.post<any>(url, recordData, { headers: this.getHeaders() });
  }

  public updateRecord(sObject: string, recordId: string, recordData: any): Observable<any> {
    const url = `${this.instanceUrl}/services/data/v58.0/sobjects/${sObject}/${recordId}`;
    return this.http.patch<any>(url, recordData, { headers: this.getHeaders() });
  }

  public deleteRecord(sObject: string, recordId: string): Observable<any> {
    const url = `${this.instanceUrl}/services/data/v58.0/sobjects/${sObject}/${recordId}`;
    return this.http.delete<any>(url, { headers: this.getHeaders() });
  }
}
