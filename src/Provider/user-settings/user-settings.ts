import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserSettings{

  constructor(private storage : Storage){
  }

  favouriteTeam(team, tourId, tourName){
    
    let item = {team : team , tourId : tourId, tourName : tourName};
    this.storage.set(team.id.toString(), JSON.stringify(item));
  } 

  unfavouriteTeam(team){
    this.storage.remove(team.id.toString());
  }

  isFavouriteTeam(teamId : string ) : Promise<boolean>{
    return this.storage.get(teamId).then(value => value ? true : false); 
  }
}