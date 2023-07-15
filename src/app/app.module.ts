import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DrawerComponent } from './drawer/drawer.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CardComponent } from './card/card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditTalkComponent } from './edit-talk/edit-talk.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DeleteTalkComponent } from './delete-talk/delete-talk.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { ColorChromeModule } from 'ngx-color/chrome'; // <color-chrome></color-chrome>
import { ColorPickerDialogComponent } from './shared/components/color-picker-dialog/color-picker-dialog.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ProjetComponent } from './projet/projet.component';
import { BoardComponent } from './board/board.component';

import { CreateProjectDialogComponent } from './projet/create-project-dialog/create-project-dialog.component';
import { CreateTrackDialogComponent } from './board/create-track-dialog/create-track-dialog.component';
import { UserSelectionDialogComponent } from './user-selection-dialog/user-selection-dialog.component';
import { DeleteListDialogComponent } from './board/delete-list-dialog/delete-list-dialog.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { AdduserComponent } from './adduser/adduser.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TeamListComponent } from './team-list/team-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersteamComponent } from './usersteam/usersteam.component';
import {MatSliderModule} from '@angular/material/slider';


@NgModule({
  declarations: [
    AppComponent,
    DrawerComponent,
    CardComponent,
    EditTalkComponent,
    DeleteTalkComponent,
    ColorPickerDialogComponent,
    ProjetComponent,
    BoardComponent,
    CreateProjectDialogComponent,
    CreateTrackDialogComponent,
    UserSelectionDialogComponent,
    DeleteListDialogComponent,
    AddTeamComponent,
    AddprojectComponent,
    AdduserComponent,
    DonutChartComponent,
    HeaderComponent,
    SidebarComponent,
    TeamListComponent,
    UserProfileComponent,
    UsersteamComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatSliderModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatOptionModule,
    MatSelectModule,
    ColorChromeModule
  ],
  providers: [
    Location,
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  entryComponents: [EditTalkComponent, DeleteTalkComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
