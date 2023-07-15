import { Component } from '@angular/core';
import { BoardService } from '../board.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EditTalkComponent } from '../edit-talk/edit-talk.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteTalkComponent } from '../delete-talk/delete-talk.component';
import { Board, Talk, Track,CheckListResponse } from '../shared/models/schema.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProjectDialogComponent } from '../projet/create-project-dialog/create-project-dialog.component';
import { CreateTrackDialogComponent } from './create-track-dialog/create-track-dialog.component';
import { List } from './list.model';
import { CardService } from '../card/service/card.service';
import { DeleteListDialogComponent } from './delete-list-dialog/delete-list-dialog.component';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  numColumns!: number ;
  newTrack: Track = { id: '0', title: '' ,talks: []};
  lists : List[] | undefined ;
  talks : any[] | undefined ;
  accessToken?:any;
  domain?:any;
  boards! : Board;
  id!:any;
  constructor(private cardService: CardService,private router :Router ,private _boardService: BoardService,private route: ActivatedRoute,private ActivatedRoute : ActivatedRoute, private _dialog: MatDialog,private dialog: MatDialog) {
    ActivatedRoute.params.subscribe((params)=>{
      if(params.id)
      this.boards=_boardService.getBoardsById(params.id);
      console.log(this.boards.tracks);
      
      
    })
    /*this.boards = this._boardService.getBoards();*/
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      // Use the id in your component logic
      console.log('Board ID:',  this.id );
    });
    this.accessToken = localStorage.getItem('accessToken');
this.domain = localStorage.getItem('domain');
console.log( "localStorage.getItem('accessToken')",this.accessToken);
console.log( "localStorage.getItem('domain')",this.domain);
console.log(this.domain);
    this.get(this.id);
    this.getTalks(this.id);
    console.log(this.lists);
  
  }
  private getTalks(id : any) : void {
    this.cardService.list(id).subscribe(data=> {
      console.log("this.cardService.list().subscribe");
      console.log(data);
      this.talks = data.records;    
      this.talks.forEach(element => {
        const createdAt = element.createdAt__c; // Replace this with your actual value

        const dateObject = new Date(createdAt);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, "0");
        const day = String(dateObject.getDate()).padStart(2, "0");
        
        const formattedDate = `${year}-${month}-${day}`;
        element.createdAt__c = formattedDate;
   });
     
  
      this.numColumns=data.totalSize; 
      console.log( "haadi hiya talks",this.talks);
     
    })
  }

 
  
  private delete(id:any) : void {
    this.cardService.delete(id).subscribe({
      next : () => {
      console.log("talks deleted");
        
     
      console.log( "haadi hiya talks",this.talks);
      }
    })
  }
  private get(id : any) : void {
    this. _boardService.list(id).subscribe(data=> {
      console.log(" this. _boardService.list().subscribe");
      console.log(data);
      this.lists = data.records;      
     
      console.log( "haadi hiya list",this.lists);
    })
  }
  /**
   * An array of all track ids. Each id is associated with a `cdkDropList` for the
   * track talks. This property can be used to connect all drop lists together.
   */
  trackIds(boardIndex): string[] {
    
    return this.boards.tracks.map(track => track.id);
    
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
  openCreateTrackDialog(ids:any): void {
    const dialogRef: MatDialogRef<CreateTrackDialogComponent> = this.dialog.open(CreateTrackDialogComponent, {
      width: '400px',
      data: this.newTrack
    });
    dialogRef.componentInstance.id = ids;
    dialogRef.afterClosed().subscribe((result: Track | undefined) => {
      if (result) {
        console.log(result);
        // Generate a unique id for the new project
        
        result.id = '7';

        // Add the new project to the projects array
        this.boards.tracks.push(result);
        console.log('hello'+this.boards.tracks);

        // Reset the newProject object for the next project
        this.newTrack = { id: '0', title: '' ,talks: []};
      }
    });
  }

  onTrackDrop(event: CdkDragDrop<Track[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

 /* addEditTalk(talk: Talk, track: Track, edit = false) {
    // Use the injected dialog service to launch the previously created edit-talk
    // component. Once the dialog closes, we assign the updated talk data to
    // the specified talk.
    this._dialog.open(EditTalkComponent, {data: {talk,users:this.boards.users, edit}, width: '500px'})
      .afterClosed()
      .subscribe(newTalkData => edit ? Object.assign(talk, newTalkData) : track.talks.unshift(newTalkData));
  }*/
  addEditTalk(talk: Talk, track: Track,name:string, edit = false) {
    // Use the injected dialog service to launch the previously created edit-talk
    // component. Once the dialog closes, we assign the updated talk data to
    // the specified talk.
    console.log("haada howaa name",name);
    const dialogData = {
      talk,
     
      edit,
      trackName: name// Pass the track name as part of the data object
      
    };
  
    this._dialog.open(EditTalkComponent, { data: dialogData, width: '500px' })
      .afterClosed()
      .subscribe(newTalkData => {
        if (edit) {
          Object.assign(talk, newTalkData);
        } else {
          track.talks.unshift(newTalkData);
        }
      });
  }
  

  deleteTalk(talk: Talk, track: Track) {
    // Open a dialog
    this._dialog.open(DeleteTalkComponent, {data: talk, width: '500px'})
      .afterClosed()
      .subscribe(response => {
        // Wait for it to close and delete the talk if the user agreed.
        if (response) {
         // track.talks.splice(track.talks.indexOf(talk), 1);

         console.log("deleteTalk dial boaard",talk?.Id);
         this.cardService.delete(talk?.Id).subscribe(
          response => {
            console.log('List created successfully:', response);
            window.location.reload();
           // this.dialogRef.afterClosed().subscribe(result => {
              //this.router.navigate(['board/1']);
          //  });
            // Handle success, e.g., display a success message
            //a018d00000P4ZIYAA3
          },
          error => {
            console.error('Error creating list:', error);
            // Handle error, e.g., display an error message
          }
        );
        }
      });
  }

  
  deleteList(track: Track){
    console.log("track li katji ",track)
    this._dialog.open(DeleteTalkComponent, {data: track, width: '500px'})
    .afterClosed()
    .subscribe(response => {
      // Wait for it to close and delete the talk if the user agreed.
  
       // track.talks.splice(track.talks.indexOf(talk), 1);
       if (response) {
        // track.talks.splice(track.talks.indexOf(talk), 1);
        console.log("Id of list : ",track)


        this.cardService.checkListIfEmpty(track).subscribe(
          (response: CheckListResponse) => {
            console.log('checkListIfEmpty:', response);
            console.log('totalSize:', response.totalSize);
            if(response.totalSize!=0){
              console.log("this list is nooot empty");
             
              this.dialog.open(DeleteListDialogComponent, { data: track, width: '500px' });
            }else{
             
              console.log("this list is empty");
              this.cardService.deleteList(track).subscribe(
                response => {
                  console.log('List deleted successfully:', response);
                  window.location.reload();
                  //this.router.navigate(['board', this.id]);
                },
                error => {
                  console.error('Error creating list:', error);
                 
                }
              );
            }
          },
          error => {
            console.error('Error checkListIfEmpty list:', error);
           
          }
        );

        //////////////////////////////////////////////////////////////////////
     /*   if(this.cardService.checkListIfEmpty(track).totalSize!=0){

          console.log("this list is empty");
        }else{
          console.log("this list is nooot empty");
        }*/
      /*  this.cardService.deleteList(track).subscribe(
         response => {
           console.log('List deleted successfully:', response);
         
    
         },
         error => {
           console.error('Error creating list:', error);
          
         }
       );*/
    
       }

    });
  }
  filterByDate(talks, asc = 1) {
    talks = [...talks.sort((a: any, b: any) => (asc) * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))];
    console.log(talks);
  }

}
