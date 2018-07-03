
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { TeamsPage } from '../teams/teams';

import { EliteApi } from '../../Provider/elite-api';

@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html'
})
export class TournamentsPage {

  public tournaments : any = [];
  constructor(public navCtrl: NavController, 
              private navParams: NavParams,
              public eliteApi : EliteApi,
              public loadingController : LoadingController) {

  }

   ionViewDidLoad() {

     console.log("************Tournaments page****************");

    let loader = this.loadingController.create({
      content: 'Getting tournaments...',
      spinner : 'ios'
    });

    loader.present().then(()=>{
      this.eliteApi.getTournaments()
        .subscribe(data=> { this.tournaments = data;
                   loader.dismiss(); })
      }
    );
  }

  tapped($event, tourn){
    this.navCtrl.push(TeamsPage,tourn);
    console.log('Parameter from Tournament Page : ', tourn);
  }
}
