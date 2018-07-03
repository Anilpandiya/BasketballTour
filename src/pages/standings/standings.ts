import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EliteApi } from '../../Provider/elite-api';

@Component({
  templateUrl: 'standings.html',
})
export class StandingsPage {

  public allStandings : any[];
  public standings : any[];
  public team : any[];

  constructor(public navCtrl: NavController, public navParam : NavParams, public eliteApi : EliteApi) {
   
  }

  ionViewDidLoad(){
      this.team = this.navParam.data;
      let tourneyData = this.eliteApi.getCurrentTourney();
      this.allStandings = tourneyData.standings;

      this.standings = _.chain(this.allStandings)
                           .groupBy('division')
                           .toPairs()
                           .map(item => _.zipObject(['divisionName', 'divisionStandings'],item))
                           .value();

      console.log('standings : ',this.allStandings);
      console.log('Division Standing : ',this.standings);
  }
}