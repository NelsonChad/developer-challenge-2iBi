import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentService } from './environment.service';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CountriesService {


  constructor(private http: HttpClient, private env: EnvironmentService) { }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  // All
  getAllCoutries(): Observable<any> {
    let url = `${this.env.BASE_API_URL}/all`
    return this.http.get(url).pipe(
      map(this.extractData),
      retry(2)
    );
  }

  getCountry(name: string): Observable<any> {
    console.log('SHOWING NAME: ', name);
    const url = `${this.env.BASE_API_URL}/name/${name}`;
    console.log('URL: ', url);
    return this.http.get(url).pipe(
      map(this.extractData));
  }
}
