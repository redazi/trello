import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Board, Track } from 'src/app/shared/models/schema.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoardService } from 'src/app/board.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-track-dialog',
  templateUrl: './create-track-dialog.component.html',
  styleUrls: ['./create-track-dialog.component.css']
})
export class CreateTrackDialogComponent {
  listForm: FormGroup;
  id: any;
  constructor(private router :Router ,
    public dialogRef: MatDialogRef<CreateTrackDialogComponent>,
   
    @Inject(MAT_DIALOG_DATA) public track: Track, private formBuilder: FormBuilder,
    private _boardService: BoardService
  ) {

    
    this.listForm = this.formBuilder.group({
      name: ['', Validators.required],
    
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

 

  
   
  
  
    onSubmit(): void {
      if (this.listForm.invalid) {
        return;
      }
  
      const name = this.listForm.controls.name.value;
      const projectId = this.id;
  
      this._boardService.add(name, projectId).subscribe(
        response => {
          console.log('List created successfully:', response);
          this.dialogRef.close();
          this.dialogRef.afterClosed().subscribe(result => {
            window.location.reload();
            console.log(this.id);
          //  this.router.navigate(['board']);
           // this.router.navigate(['board', this.id]);
          });
        
          // Handle success, e.g., display a success message
          //a018d00000P4ZIYAA3
        },
        error => {
          console.error('Error creating list:', error);
          // Handle error, e.g., display an error message
        }
      );
    }
  }
  

