import { Component, OnInit, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Talk, Track } from '../shared/models/schema.model';
import { CardService } from '../card/service/card.service';

@Component({
  selector: 'app-delete-talk',
  templateUrl: './delete-talk.component.html',
  styleUrls: ['./delete-talk.component.scss']
})
export class DeleteTalkComponent implements OnInit {
  talks! : any;
  constructor(@Inject(MAT_DIALOG_DATA) public track: Track,private dialogRef: MatDialogRef<DeleteTalkComponent>,private cardService: CardService) {}

  ngOnInit() {
     this.talks = this.track && this.track ? this.track : null;
    console.log(" deleeeeette");
    console.log(this.talks);
  }
  onDelete(){
console.log("onDelete khadaama");
/*
    this.cardService.delete(this.talks.Id).subscribe(
      response => {
        console.log('List created successfully:', response);
        this.dialogRef.close();
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
    );*/
  }
  
  }

