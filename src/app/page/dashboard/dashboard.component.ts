import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActionService } from 'src/app/services/action.service';
import { TeamService } from 'src/app/services/team.service';
import { UtilService } from 'src/app/services/util.service';
import { BaseComponent } from 'src/app/utility/base.component';
import { ModalService } from 'src/app/widgets/modal/modal.service';
import { TeamDTO } from '../../model/dto/team-dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  trackingDays:number = 12;
  trackingDaysList:Array<number> = [6, 12, 20];

  constructor(
    protected service: TeamService,
    protected utilService: UtilService,
    protected modalService: ModalService,
    protected actionService: ActionService) {
      super();
    }

  teams!: Array<TeamDTO>;
  trackedTeams: Array<TeamDTO> = [];

  ngOnInit(): void {
    this.trackingDays = this.utilService.getPastDays();
    this.retrieveTrackedTeams();
    this.populateTeams();
  }

  retrieveTrackedTeams(): void{
    let teamsFromSession = sessionStorage.getItem("trackedTeams");
    if(teamsFromSession){
      this.trackedTeams = JSON.parse(teamsFromSession) as TeamDTO[];
    }
  }

  populateTeams(): void{
    let subscription = this.service.getListTeams().subscribe(resp =>{
      if(resp){
        this.teams = [];
        this.teams = resp ? resp.data?.filter(t => t.conference && t.division)! : [];
      }
      this.actionService.stopLoader();
      subscription.unsubscribe();
		});
  }

  trackTeam(teamId:string, templateRef: TemplateRef<Element>): void{
    if(teamId){
      let team = this.teams.filter((x) => x.id == Number.parseInt(teamId))[0];
      if(!this.trackedTeams.find((x) => x.id == team.id)){
        this.trackedTeams.push(team);
        this.addToSession();
      } else {
        this.modalService.openModal(templateRef, false);
      }
      console.log(this.trackedTeams);
    }
  }

  trackingDaysChange(){
    this.actionService.pastTrackingDaysChange(this.trackingDays);
  }

  removeCard(id: number, templateRef: TemplateRef<Element>): void{
    this.modalService.openModal(templateRef, true);
    let sub = this.modalService.onChoose.subscribe(choose=>{
        sub.unsubscribe();
        if(choose){
          this.trackedTeams = this.trackedTeams.filter((x) => x.id != id);
          this.removeFromSession();
        }
    })
  }

  addToSession(){
    sessionStorage.clear();
    sessionStorage.setItem("trackedTeams", JSON.stringify(this.trackedTeams));
  }

  removeFromSession(){
    sessionStorage.clear();
    sessionStorage.setItem("trackedTeams", JSON.stringify(this.trackedTeams));
  }

  closeModal(){
    this.modalService.closeModal();
  }

}
