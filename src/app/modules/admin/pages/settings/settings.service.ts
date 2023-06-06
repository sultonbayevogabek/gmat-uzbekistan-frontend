import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable()

export class SettingsService {
   constructor(
      private _http: HttpClient
   ) {
   }
   changePassword(payload: { currentPassword: string; newPassword: string }): Observable<{ ok: boolean; message: string }> {
      return this._http.post<{ ok: boolean; message: string }>(environment + 'change-password', payload)
   }
}
