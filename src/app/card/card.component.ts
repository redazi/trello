import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { appConstants } from '../shared/appConstants';
import { IssueType } from '../shared/models/schema.model';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  issueTypesWithColor = appConstants.issueTypeListWithColor;
  issueTypes = Object.values(IssueType);
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Input() text: string;
  @Input() priority: string;
  @Input() tags: [];
  @Input() users: [];
  @Input() image: string;
  @Input() issueType?: string;
  @Input() createdAt: Date;

  constructor() { }
  formatLabel(value: number): string {
    if (value >= 100) {
      return Math.round(value / 100) + '%';
    }

    return `${value}`;
  }
  ngOnInit() {
  }

}
