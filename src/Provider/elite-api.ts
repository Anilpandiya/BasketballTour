import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class EliteApi {

  private baseUrl = 'https://basketball-tour.firebaseio.com';
  private currentTourney : any = {};
  
  constructor( public http :  Http){}

   getTournaments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tournaments.json`)
      .map((response: Response) => {
        return response.json();
      });
  }

  getTournamentData(tourId) : Observable<any> {
    return this.http.get(`${this.baseUrl}/tournaments-data/${tourId}.json`)
    .map( response => { this.currentTourney = response.json();
          return this.currentTourney;
      }
    );
  }

  getCurrentTourney() {
      return this.currentTourney;
  }
}


