import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { BaseComponent } from 'src/app/utility/base.component';
import { TeamDTO } from '../../model/dto/team-dto';
import { TeamService } from 'src/app/services/team.service';
import { ActionService } from 'src/app/services/action.service';

@Component({
  selector: 'app-team-scores',
  templateUrl: './team-scores.component.html',
  styleUrls: ['./team-scores.component.css']
})
export class TeamScoresComponent extends BaseComponent implements OnInit {

  id!: number;
  team!: TeamDTO;
  conference!: string;

  constructor(protected service: TeamService, private utilService: UtilService, protected actionService: ActionService) {
    super();
  }

  ngOnInit(): void {
    let cod = this.utilService.getTeamCod();
    if(cod.length == 0){
      this.utilService.navigate([this.endpoints.notFound]);
    }
    this.id = this.utilService.getTeamId();
    if(this.id != -1){
      this.retrieveTeam();
    }
  }

  retrieveTeam(){
    let subscription = this.service.getTeamById(this.id).subscribe(resp =>{
        if(resp){
          this.team = resp ? resp : new TeamDTO();
          if(this.team.conference && this.team.conference?.trim() != ""){
            this.conference = this.team.conference.startsWith(this.constants.labels.west) ? "Western conference" : "Eastern conference";
          }
        }
        this.actionService.stopLoader();
        subscription.unsubscribe();
      });
  }

  backToDashboard(){
    this.utilService.navigate([this.endpoints.dashboard]);
  }

  ngOnDestroy(){
    sessionStorage.removeItem("teamId");
  }
}
