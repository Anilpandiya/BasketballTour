import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController} from 'ionic-angular';
import * as _ from 'lodash';

import { TeamHomePage } from '../team-home/team-home';
import { EliteApi } from '../../Provider/elite-api';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html'
})
export class TeamsPage {

   public  teams  = [];
   private allTeams : any ;
   private allTeamDivisons : any ;

  constructor(public navCtrl: NavController, private navParams: NavParams, public eliteApi : EliteApi, public loadCtrl :         LoadingController) {
  }

   ionViewDidLoad(){
    let tourney = this.navParams.data;

    let loader = this.loadCtrl.create({
      content : 'loading Teams',
      spinner : 'bubbles'
    });

    loader.present().then( () => {
       this.eliteApi.getTournamentData(tourney.id)
      .subscribe(data=>{
          this.allTeams = data.teams;

          this.allTeamDivisons =
                                 _.chain(data.teams)
                                  .groupBy('division')
                                  .toPairs()
                                  .map( item => _.zipObject(['divisionName' , 'divisionTeams'] , item))
                                  .value();
                                  
          this.teams = this.allTeamDivisons;
          console.log('Division Teams : ', this.teams);                                  
          loader.dismiss();
      });
    });
   
      console.log("Tournament selected : "+ tourney.name);
      console.log("*************Teams Page************");
  }


  itemTapped($event,team){
    this.navCtrl.push(TeamHomePage, team);
    console.log("Parameters from Teams Page : ", team);
    console.log("Team selected : " , team.name);
  }
}
