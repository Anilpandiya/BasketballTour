import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { IonicStorageModule, Storage } from '@ionic/storage';


import { MyTeamsPage } from '../pages/my-teams/my-teams';
import { GamesPage } from '../pages/games/games';
import { TeamsPage } from '../pages/teams/teams';
import { TeamDetailsPage } from '../pages/team-details/team-details';
import { TournamentsPage } from '../pages/tournaments/tournaments';
import { TeamHomePage } from '../pages/team-home/team-home';
import { StandingsPage } from '../pages/standings/standings';

import { EliteApi } from '../Provider/elite-api';
import { UserSettings } from '../Provider/user-settings/user-settings';

@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    GamesPage,
    TeamsPage,
    TeamDetailsPage,
    TournamentsPage,
    TeamHomePage,
    StandingsPage
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    GamesPage,
    TeamsPage,
    TeamDetailsPage,
    TournamentsPage,
    TeamHomePage,
    StandingsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EliteApi,
    UserSettings    
  ]
})
export class AppModule {}
