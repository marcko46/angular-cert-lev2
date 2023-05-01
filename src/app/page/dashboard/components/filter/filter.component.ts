import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConferenceDTO } from 'src/app/model/dto/conference-dto';
import { DivisionDTO } from 'src/app/model/dto/division-dto';
import { TeamDTO } from 'src/app/model/dto/team-dto';
import { TrackFilter } from 'src/app/model/filter/track-filter';
import { TeamService } from 'src/app/services/team.service';
import { UtilService } from 'src/app/services/util.service';
import { BaseComponent } from 'src/app/utility/base.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent extends BaseComponent implements OnInit {

  conferenceList: Array<ConferenceDTO> = [ {id:'West', name: 'Western Conference'}, {id:'East', name: 'Eastern Conference'}]

  divisionList: Array<DivisionDTO> = [{id:'Atlantic', name: 'Atlantic Division', conference:'East'},{id:'Central', name: 'Central Division', conference:'East'},
                                      {id:'Southeast', name: 'Southeast Division', conference:'East'},{id:'Northwest', name: 'Northwest Division', conference:'West'},
                                      {id:'Pacific', name: 'Pacific Division', conference:'West'},{id:'Southwest', name: 'Southwest Division', conference:'West'}]

  filter: TrackFilter = new TrackFilter();
  divisionFilteredList!: Array<DivisionDTO>;
  @Input()teams!: Array<TeamDTO>;
  @Output('onChose')onChoseEmitter:EventEmitter<string> = new EventEmitter<string>();
  teamsFilteredList!: Array<TeamDTO>;

  constructor() {
    super();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.teamsFilteredList = this.teams;
    this.divisionFilteredList = this.divisionList;
  }

  trackTeam(){
    this.onChoseEmitter.emit(this.filter.team);
  }

  conferenceChange(){
    if(this.filter.conference && 'undefined' != this.filter.conference){
      this.divisionFilteredList = this.divisionList.filter(d => d.conference == this.filter.conference);
      this.teamsFilteredList = this.teams.filter(t => t.conference ==  this.filter.conference);
    } else {
      this.divisionFilteredList = this.divisionList;
      this.teamsFilteredList = this.teams;
    }
  }

  divisionChange(){
    if(this.filter.division && 'undefined' != this.filter.division){
      this.teamsFilteredList = this.teams.filter(t => t.division ==  this.filter.division);
    } else {
      this.conferenceChange();
    }
  }

}
