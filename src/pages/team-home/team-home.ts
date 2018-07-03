import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StandingsPage } from '../standings/standings';
import { TeamDetailsPage } from '../team-details/team-details';


@Component({
  templateUrl: 'team-home.html',
})
export class TeamHomePage {
  team: any;
  teamDetailTab = TeamDetailsPage;
  standingsTab = StandingsPage;

  constructor(private nav: NavController, private navParams: NavParams) {
    this.team =  this.navParams.data;
  }

  ionViewDidLoad(){
    console.log('***************Team Home Page*****************');
  }
  goHome(){
    this.nav.popToRoot();
  }
}