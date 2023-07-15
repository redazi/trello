import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Board, User } from 'src/app/shared/models/schema.model';



@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.css']
})
export class CreateProjectDialogComponent {
  users: User[];
  project: Board;
  
  
  constructor(
    public dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Board, users: User[]},
   
  ) {
    this.project = data.project;
    this.users = data.users;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
