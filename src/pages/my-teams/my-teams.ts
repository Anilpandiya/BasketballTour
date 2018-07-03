import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { EliteApi } from '../../Provider/elite-api';

import { TournamentsPage } from '../tournaments/tournaments';
import { TeamHomePage } from '../team-home/team-home';

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html'
})
export class MyTeamsPage {

  favourite = [{team : { id : 795 ,name : "DC Assault", coach : "Bartlett"}, tourId : "98c6857e-b0d1-4295-b89e-2d95a45437f2" , tourName :"Holiday Hoops Challenge"},
                {team : { id : 797 ,name : "Reisterstown Wolfpack", coach : "Hightower"}, tourId : "98c6857e-b0d1-4295-b89e-2d95a45437f2" , tourName : "Holiday Hoops Challenge"}];

  constructor(public navCtrl: NavController,
              public eliteApi : EliteApi,
              public loadingController : LoadingController) {
  }

  goToTournaments(){
    this.navCtrl.push(TournamentsPage);
  }

  favTapped($event, favourite){
     let loader = this.loadingController.create({
      content: 'Getting data...',
      spinner : 'ios',
      dismissOnPageChange : true
    });
    loader.present();
    this.eliteApi.getTournamentData(favourite.tourId)
        .subscribe(t => this.navCtrl.push(TeamHomePage, favourite.team))

    
  }
}
