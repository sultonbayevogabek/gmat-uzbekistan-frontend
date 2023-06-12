import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IScreenshot } from '../../interfaces/screenshot.interface';

@Injectable({
   providedIn: 'root'
})
export class SettingsService {
   constructor(
      private _httClient: HttpClient,
   ) {
   }

   changePassword(payload: { currentPassword?: string; newPassword: string }): Observable<{ ok: true; message: string }> {
     return this._httClient.post<{ ok: true; message: string }>(environment.host + 'change-password', payload);
   }

   updateCredentials(payload: { name: string; phone: string }): Observable<{ ok: true; message: string }> {
      return this._httClient.post<{ ok: true; message: string }>(environment.host + 'update-credentials', payload);
   }

   uploadAvatar(payload: FormData): Observable<{ ok: true; message: string }> {
      return this._httClient.post<{ ok: true; message: string }>(environment.host + 'upload-avatar', payload);
   }

   uploadScreenshot(payload: FormData): Observable<{ ok: true; message: string }> {
      return this._httClient.post<{ ok: true; message: string }>(environment.host + 'upload-screenshot', payload);
   }

   getScreenshots(): Observable<{ ok: boolean; screenshots: IScreenshot[] }> {
      return this._httClient.post<{ ok: boolean; screenshots: IScreenshot[] }>(environment.host + 'get-screenshots', {});
   }

   deleteScreenshot(id: string): Observable<{ ok: boolean; message: string }> {
      return this._httClient.post<{ ok: boolean; message: string }>(environment.host + 'delete-screenshot', { id });
   }
}
