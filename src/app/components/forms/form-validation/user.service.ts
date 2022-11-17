import { Injectable } from '@angular/core';
import { User } from './user.module';

@Injectable()
export class UserService {
   createUser(user: User) {
       console.log('User Name: ' + user.userName);
       console.log('City: ' + user.city);
   }
} 