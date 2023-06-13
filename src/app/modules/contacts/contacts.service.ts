import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
   providedIn: 'root'
})
export class ContactsService {
   constructor(
      private _httpClient: HttpClient
   ) {
   }

   getUsers(): Observable<{ ok: boolean; users: IUser[]; count: number }> {
      return this._httpClient.post<{ ok: boolean; users: IUser[]; count: number }>(environment.host + 'get-users', {});
   }

   deleteUser(id: string): Observable<{ ok: true; message: string }> {
      return this._httpClient.post<{ ok: true; message: string }>(environment.host + 'delete-user', { id });
   }

   changeRole(id: string): Observable<{ ok: true; message: string }> {
      return this._httpClient.post<{ ok: true; message: string }>(environment.host + 'change-role', { id });
   }

   setScreenshotAsSeen(id: string) {
      this._httpClient.post<{
         ok: true;
         message: string
      }>(environment.host + 'set-screenshot-as-seen', { id }).subscribe();
   }
}
