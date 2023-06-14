import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ILesson } from '../../interfaces/lesson.interface';

@Injectable({
   providedIn: 'root'
})
export class AcademyService {
   constructor(private _httpClient: HttpClient) {
   }

   createLesson(payload: FormData) {
      return this._httpClient.post(environment.host + 'create-lesson', payload);
   }

   getLessons(): Observable<{ ok: boolean; count: number; lessons: ILesson[] }> {
      return this._httpClient.post<{ ok: boolean; count: number; lessons: ILesson[] }>(environment.host + 'get-lessons', {})
   }
}
