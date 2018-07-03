import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import * as _ from 'lodash';

import { EliteApi } from '../../Provider/elite-api';
//import { UserSettings } from '../../Provider/user-settings/user-settings';

import { GamesPage } from '../games/games';
 
@Component({
  selector: 'page-team-details',
  templateUrl: 'team-details.html'
})
export class TeamDetailsPage {

  public team : any = {};
  public teamStanding : any = {};
  public games : any = [];
  private tourneyData : any ;

  public isFollowing : boolean = false;

  constructor(public navCtrl: NavController, public navParam : NavParams, public eliteApi : EliteApi, public alertController : AlertController, public toastController : ToastController) {
         
        this.team = this.navParam.data;
        this.tourneyData = this.eliteApi.getCurrentTourney();
        console.log("*****************Team Details Tab**************");
        console.log("*Parameters from Team page: ",this.navParam.data);
        console.log("Complete Tournament Data - TourneyData : ",this.tourneyData);
  }

  ionViewDidLoad(){
        
    this.games = _.chain(this.tourneyData.games)
      .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
      .map(g => {
        let isTeam1 = (g.team1Id === this.team.id);
        let opponentName = isTeam1 ? g.team2 : g.team1;
        let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
        return {
          game:g,
          gameId: g.id,
          opponent: opponentName,
          time: Date.parse(g.time),
          location: g.location,
          locationUrl: g.locationUrl,
          scoreDisplay: scoreDisplay,
          homeAway: (isTeam1 ? "vs." : "at")
        };
      })
      .value();

      this.teamStanding = _.find(this.tourneyData.standings , { 'teamId' : this.team.id});

    //  this.userSettings.isFavouriteTeam(this.team.id.toString()).then(value => this.isFollowing = value);

  }

  gameClicked($event, game){
    this.navCtrl.parent.parent.push(GamesPage, game.game)
  }

  private getScoreDisplay(isTeam1: boolean, team1Score: any, team2Score: any) {
    if (team1Score && team2Score) {
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + opponentScore;
    }
    return "";
  }

  private gameWorL(game){
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  private getColor(game){
    return game.scoreDisplay[0] == 'W' ? 'secondary' : 'danger';
  }

   toggleFollow() {

    if (this.isFollowing) {
      const confirm = this.alertController.create({
        title: 'Unfollow?',
        message: 'Are you sure you want to unfollow?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;

          //  this.userSettings.unfavouriteTeam(this.team);

            let toast = this.toastController.create({
              message : 'You have unfollowed this team.',
              duration : 3000,
              position : 'bottom'
            });

            toast.present();
            }
          },
          {
            text: 'No'
          }
        ]
      });

      confirm.present();
    } else {
      this.isFollowing = true;
        // this.userSettings.favouriteTeam(
        // this.team,
        // this.tourneyData.tournament.id,
        // this.tourneyData.tournamentName);
    }
   }

}

