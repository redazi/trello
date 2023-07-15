import { Injectable } from '@angular/core';
import { User } from './shared/models/schema.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = require('./dat.json');


 

  getUsers(): User[] {
    return this.users;
  }
}
