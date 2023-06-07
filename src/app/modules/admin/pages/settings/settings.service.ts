import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class SettingsService {
   constructor(
      private _httClient: HttpClient,
   ) {
   }

   changePassword(payload: { currentPassword: string; newPassword: string }): Observable<any> {
     return this._httClient.post(environment.host + 'change-password', payload);
   }
}