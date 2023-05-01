import { Component, Input, OnInit } from '@angular/core';
import { ResultsDTO } from 'src/app/model/dto/results-dto';
import { ActionService } from 'src/app/services/action.service';
import { TeamService } from 'src/app/services/team.service';
import { UtilService } from 'src/app/services/util.service';
import { BaseComponent } from 'src/app/utility/base.component';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent extends BaseComponent implements OnInit {
  results!: ResultsDTO[];
  pastDates!: string[];
  @Input("id") id?: number;
  pastDays!: number;

  constructor(private service: TeamService, private utilService: UtilService, protected actionService:ActionService) {
    super();
  }

  ngOnInit(): void {
    this.pastDays = this.utilService.getPastDays();
    this.pastDates = this.utilService.getLastDates(this.pastDays);
    this.getGameResults();
  }

  getGameResults(){
    let subscription = this.service.getResultsByDatesAndId(this.pastDates, this.id!).subscribe(resp =>{
      if(resp && resp.data){
        this.results = this.utilService.mapResults(resp.data);
        console.log(this.results);
      }
      this.actionService.stopLoader();
      subscription.unsubscribe();
		});
  }

}
