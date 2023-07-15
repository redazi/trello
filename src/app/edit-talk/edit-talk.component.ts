import { Component, OnInit, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef, MatChipInputEvent } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { ColorPickerDialogComponent } from '../shared/components/color-picker-dialog/color-picker-dialog.component';
import { IssueType, Talk, User } from '../shared/models/schema.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { appConstants } from '../shared/appConstants';
import { CardService } from '../card/service/card.service';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-edit-talk',
  templateUrl: './edit-talk.component.html',
  styleUrls: ['./edit-talk.component.scss'],


})
export class EditTalkComponent implements OnInit {
  users: User[];
  formGroup: FormGroup;
  issueTypesArrayWithColor = Object.values(appConstants.issueTypeListWithColor);
  PriorityArray = Object.values(appConstants.PriorityList);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {talk: Talk,users:User[],trackName:any, edit: boolean,sliderValue:any},
    private dialogRef: MatDialogRef<EditTalkComponent>,
    public formBuilder: FormBuilder,
    public colorPickerdialog: MatDialog,private cardService: CardService
  ) {
  }

  ngOnInit() {
    const talk = this.data && this.data.talk ? this.data.talk : null;
    const trackName = this.data && this.data.trackName ? this.data.trackName : null;
    this.formGroup = this.formBuilder.group({
      text: [talk && talk.text ? talk.text : '', Validators.required],
      priority: [talk && talk.priority ? talk.priority : '', Validators.required],
      image: [talk && talk.image ? talk.image : ''],
      tags: [talk && talk.tags ? talk.tags : []],
      users: [talk && talk.users ? talk.users : []],
      issueType: [talk && talk.issueType ? talk.issueType : ''],
      createdAt: [talk && talk.createdAt ? talk.createdAt : new Date()],
      sliderValue: [this.data && this.data.sliderValue ? this.data.sliderValue : ''],
      
      trackName: [trackName]
    });
  }
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + '%';
    }

    return `${value}`;
  }
  onSubmit() {
    console.log("this.formGroup.value.trackName",this.formGroup.value.trackName)
    this.dialogRef.close(this.formGroup.value);
    this.cardService.add(this.formGroup.value.sliderValue/1000,this.formGroup.value.trackName,this.formGroup.value.createdAt, this.formGroup.value.text,this.formGroup.value.image,this.formGroup.value.issueType,this.formGroup.value.priority,this.formGroup.value.tags).subscribe(
      response => {
        console.log('List created successfully:', response);
        this.dialogRef.close();
        window.location.reload();
        this.dialogRef.afterClosed().subscribe(result => {
          //this.router.navigate(['board/1']);
         
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
onupdate(talkId: string,
  sliderValue: any,
  List__c: string,
  createdAt__c: Date,
  text__c: string,
  image__c: string,
  issueType__c: string,
  priority__c: string,
  tags__c: string){

}
  removeTag(tag: string) {
    // Remove the tag from the tag control's value.
    const tagsControl = this.formGroup.get('tags');
    tagsControl.value.splice(tagsControl.value.indexOf(tag), 1);
  }

  addTag(event: MatChipInputEvent) {
    const tagsControl = this.formGroup.get('tags');

    // Create a new array of tags, if the talk doesn't have any,
    // otherwise add the new tag to the existing array.
    if (tagsControl.value) {
      tagsControl.value.push({name: event.value, color: '#e0e0e0'});
    } else {
      tagsControl.setValue([event.value]);
    }

    // Clear the input's value once the tag has been added.
    event.input.value = '';
  }

  openColorPickerDialog(tag): void {
    const dialogRef = this.colorPickerdialog.open(ColorPickerDialogComponent, {
      // width: '250px',
      data: {},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        tag.color = result;
      }
    });
  }



}

