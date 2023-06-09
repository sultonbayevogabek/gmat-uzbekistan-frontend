import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
   providedIn: 'root'
})
export class SettingsService {
   constructor(
      private _httClient: HttpClient,
   ) {
   }

   changePassword(payload: { currentPassword?: string; newPassword: string }): Observable<any> {
     return this._httClient.post(environment.host + 'change-password', payload);
   }

   updateCredentials(payload: { name: string; phone: string }): Observable<any> {
      return this._httClient.post(environment.host + 'update-credentials', payload);
   }
}
