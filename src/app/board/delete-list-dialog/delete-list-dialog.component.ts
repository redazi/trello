import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-list-dialog',
  templateUrl: './delete-list-dialog.component.html',
  styleUrls: ['./delete-list-dialog.component.css']
})
export class DeleteListDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteListDialogComponent>) { }
}

