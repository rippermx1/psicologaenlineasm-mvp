import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private http: HttpClient,
  ) { }

  setDefaultDays(endpoint: string): Observable<any> {
    return this.http.get(`${environment.api_url}${endpoint}`);
  }
}
