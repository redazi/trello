import { Component } from '@angular/core';
import { BoardService } from './board.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EditTalkComponent } from './edit-talk/edit-talk.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTalkComponent } from './delete-talk/delete-talk.component';
import { Board, Talk, Track } from './shared/models/schema.model';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SalesforceService } from './salesforce.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigServiceService } from './config-service.service';
import { GlobalVariable } from './global';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  accessToken!: string;
  domain!: string;
  url!: string;

  boards: Board[] = [];
  constructor(private _boardService: BoardService, private _dialog: MatDialog,private route: ActivatedRoute, 
    private location: Location, 
    private http: HttpClient,
    private sales : SalesforceService,private configService: ConfigServiceService) {
    this.boards = this._boardService.getBoards();
  }
 ngOnInit() {
    this.accessToken = this.configService.getAccessToken();
    this.domain =this.configService.getDomain();
    console.log("this.accessToken",this.accessToken);
    console.log("this.domain",this.domain);
    //localStorage.setItem('accessToken', this.accessToken);
    //localStorage.setItem('this.domain', this.domain);
    console.log( "localStorage.getItem('accessToken') app",localStorage.getItem('accessToken'));
console.log( "localStorage.getItem('domain') app",localStorage.getItem('domain'));
    
    console.log("hahahah this.configService.getDomain() :");
    console.log(this.accessToken);
    console.log(this.domain);
    this.url = "https://"+this.domain+"/services/data/v58.0/query/?q=SELECT+name+from+Account";
    const headers = {
      "Authorization": "Bearer "+ this.accessToken  ,
      "Content-Type": "application/json"
    }
    this.http.get<any>(this.url, { headers }).subscribe(
      (response) => {
        console.log("ncofo ba3da:",response);
        const accounts = response.records;
        accounts.forEach((account: any) => {
          const accountId = account.Id;
          const accountName = account.Name;
          console.log(`Account ID: ${accountId}, Name: ${accountName}`);
          
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    
    if (this.accessToken) {
      console.log(this.accessToken);
      console.log(this.domain);

    }
    this.removeAccessTokenFromURL();
    
  }
  /**
   * An array of all track ids. Each id is associated with a `cdkDropList` for the
   * track talks. This property can be used to connect all drop lists together.
   */
  trackIds(boardIndex): string[] {
    return this.boards[boardIndex].tracks.map(track => track.id);
  }

  onTalkDrop(event: CdkDragDrop<Talk[]>) {
    // In case the destination container is different from the previous container, we
    // need to transfer the given talk to the target data array. This happens if
    // a talk has been dropped on a different track.
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onTrackDrop(event: CdkDragDrop<Track[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  addEditTalk(talk: Talk, track: Track, edit = false) {
    // Use the injected dialog service to launch the previously created edit-talk
    // component. Once the dialog closes, we assign the updated talk data to
    // the specified talk.
    this._dialog.open(EditTalkComponent, {data: {talk, edit}, width: '500px'})
      .afterClosed()
      .subscribe(newTalkData => edit ? Object.assign(talk, newTalkData) : track.talks.unshift(newTalkData));
  }

  deleteTalk(talk: Talk, track: Track) {
    // Open a dialog
    this._dialog.open(DeleteTalkComponent, {data: talk, width: '500px'})
      .afterClosed()
      .subscribe(response => {
        // Wait for it to close and delete the talk if the user agreed.
        if (response) {
          track.talks.splice(track.talks.indexOf(talk), 1);
        }
      });
  }

  filterByDate(talks, asc = 1) {
    talks = [...talks.sort((a: any, b: any) => (asc) * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))];
    console.log(talks);
  }
  /////////////////////////////////////////////////////
  
  getAccessToken(): string {
    const urlParams = new URLSearchParams(this.location.path(false));
    const accessToken = urlParams.get('access_token');
    return accessToken ? decodeURIComponent(accessToken) : 'null';
  }

  getDomain(): string {
    const urlParams = new URLSearchParams(this.location.path(false));
    const domain = urlParams.get('domain');
    return domain ? decodeURIComponent(domain) : 'null';
  }

  removeAccessTokenFromURL() {
    const urlWithoutAccessToken = this.location.path().split('?')[0];
    this.location.replaceState(urlWithoutAccessToken);
  }
}
