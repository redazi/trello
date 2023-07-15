

import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EditTalkComponent } from '../edit-talk/edit-talk.component';

import { DeleteTalkComponent } from '../delete-talk/delete-talk.component';
import { Board, Talk, Track, User } from '../shared/models/schema.model';

import { CreateProjectDialogComponent } from './create-project-dialog/create-project-dialog.component';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AddprojectComponent } from '../addproject/addproject.component';
import { SalesforceService } from '../salesforce.service';


@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent   {
    projects: Board[] = [];
    users: User[] = [];
    newProject: Board = { id: 0, title: '', description: '' ,tracks: [],users: []};
    showCreateProjectDialog = false;
    public accounts!: any[];
  public filteredAccounts!: any[];
  isSubmitting: boolean = false;
  IdAccount!: string;
    constructor(
      private projectService: BoardService,
      private userService: UserService,
      private dialog: MatDialog,
      private router: Router,
      public dialogRef: MatDialogRef<AddprojectComponent>,
      private salesforceService: SalesforceService
    ) {
      this.fetchProjects();
      this.fetchUsers();
    }
    openFieldFormDialog() {
      this.isSubmitting = true;
      const dialogRef = this.dialog.open(AddprojectComponent, {
        width: '500px'
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        this.isSubmitting = false;
      });
    }
    onDivClick(id: any) {
      // Perform the action you want when the div is clicked
      console.log("Div clicked! : ",id );
      this.router.navigate(['/board', id]);
      // Add your logic here
    }
    searchProjects(event: any) {
      const searchValue = event.target.value;
      
      if (searchValue.trim() === '') {
        this.filteredAccounts = this.accounts;
      } else {
        this.filteredAccounts = this.accounts.filter(account =>
          account.Name.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
    }
    ngOnInit() {

      console.log("redaaaaaaa");
      this.salesforceService.getInfoUserLog().subscribe(
        response => {
          this.IdAccount = response.user_id;
          console.log(this.IdAccount);
  
          this.salesforceService.getInfos(`SELECT Id , Name, theme__r.Name, Description__c FROM Project__c WHERE Team__c IN (SELECT Team__c FROM UserTeam__c WHERE User__r.Id = '${this.IdAccount}')`)
            .subscribe(
              response => {
                this.accounts = response.records;
                this.filteredAccounts = this.accounts;
                console.log(this.accounts);
              },
              error => {
                console.error('Error retrieving accounts:', error);
              }
            );
        },
        error => {
          console.error('Error retrieving user info:', error);
        }
      );
    }
    addUserToProject(user: any, project: any) {

      if (!project.users.some((existingUser: any) => existingUser.name === user.name)) {
    project.users.push(user);
  }
    }
    expandedProjects: Set<any> = new Set<any>();

toggleProjectExpansion(project: any): void {
  console.log(project);

  if (this.isProjectExpanded(project)) {
    this.expandedProjects.delete(project); // Collapse the currently expanded project
  } else {
    this.expandedProjects.add(project); // Expand the selected project
  }
}

isProjectExpanded(project: any): boolean {
  return this.expandedProjects.has(project);
}
  
    async fetchProjects(): Promise<void> {
      this.projects = await this.projectService.getBoards();
    }
    async fetchUsers(): Promise<void> {
      this.users = await this.userService.getUsers();
    }
  
    openCreateProjectDialog(): void {
      const dialogRef: MatDialogRef<CreateProjectDialogComponent> = this.dialog.open(CreateProjectDialogComponent, {
        width: '400px',
        data: { project: this.newProject, users: this.users }
      });
  
      dialogRef.afterClosed().subscribe((result: Board | undefined) => {
        if (result) {
          // Generate a unique id for the new project
          result.id = this.projects.length + 1;
  
          // Add the new project to the projects array
          this.projects.push(result);
  
          // Reset the newProject object for the next project
          this.newProject = { id: 0, title: '', description: '' ,tracks: [],users: []};
        }
      });
    }
}

