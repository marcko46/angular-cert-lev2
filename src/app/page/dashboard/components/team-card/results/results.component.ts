import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ResultsDTO } from 'src/app/model/dto/results-dto';
import { ActionService } from 'src/app/services/action.service';
import { TeamService } from 'src/app/services/team.service';
import { UtilService } from 'src/app/services/util.service';
import { BaseComponent } from 'src/app/utility/base.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input("id") id?: number;
  @Input("cod") cod?: string;
  @Input('pastDays') pastDays!: number;
  pastDates!: string[];
  pastTrackingDaysChangeSubj!: Subscription;
  logoUrl!: string;
  results!: ResultsDTO[];
  avgScored!: number;
  avgConceded!: number;
  winLoss!: string[];

  constructor(private service: TeamService, private utilService: UtilService, protected actionService:ActionService) {
    super();
  }
  ngOnDestroy(): void {
    if(this.pastTrackingDaysChangeSubj){
      this.pastTrackingDaysChangeSubj.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.winLoss = new Array();
    this.retrieveTeamLogo();
    this.pastDates = this.utilService.getLastDates(this.pastDays);
    this.pastTrackingDaysChangeSubj = this.actionService.pastTrackingDaysChangeSubj.subscribe( pastDays => {
      this.pastDays = pastDays;
      this.pastDates = this.utilService.getLastDates(pastDays);
      this.getGameResults();
    });
    this.getGameResults();
  }

  getGameResults(){
    let subscription = this.service.getResultsByDatesAndId(this.pastDates, this.id!).subscribe(resp =>{
      if(resp && resp.data){
        this.results = this.utilService.mapResults(resp.data);
        this.lastGames();
        this.calcAverages();
        console.log(this.results);
      }
      this.actionService.stopLoader();
      subscription.unsubscribe();
		});
  }

  private lastGames(){
    this.winLoss = new Array();
    for(let game of this.results){
      this.winLoss.push(this.id == game.winner ? this.constants.results.win : this.constants.results.lose);
    }
  }

  private calcAverages(){
    this.calcAvgScored();
    this.calcAvgConceded();
  }

  private calcAvgScored(){
    let numTotalEl = this.results.length;
    let sum = 0;

    for(let game of this.results){
      sum += this.id == game.homeTeam.id ? game.homeScore : game.visitorScore;
    }

    this.avgScored = numTotalEl > 0 ? Math.floor(sum / numTotalEl) : 0;
  }

  private calcAvgConceded(){
    let numTotalEl = this.results.length;
    let sum = 0;

    for(let game of this.results){
      sum += this.id == game.homeTeam.id ? game.visitorScore : game.homeScore;
    }

    this.avgConceded = numTotalEl > 0 ? Math.floor(sum / numTotalEl) : 0;
  }

  private retrieveTeamLogo(){
    this.logoUrl = this.endpoints.logos + this.cod! + this.endpoints.extention_png;
  }
}
