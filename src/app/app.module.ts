import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { SelectComponent } from './widgets/select/select.component';
import { ErrorPageComponent } from './utility/error-page/error-page.component';
import { CardHeaderComponent } from './feature/card-header/card-header.component';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from './widgets/confirm-modal/confirm-modal.component';
import { ScoresComponent } from './page/team-scores/components/scores/scores.component';
import { TeamScoresComponent } from './page/team-scores/team-scores.component';
import { FilterComponent } from './page/dashboard/components/filter/filter.component';
import { TeamCardComponent } from './page/dashboard/components/team-card/team-card.component';
import { ResultsComponent } from './page/dashboard/components/team-card/results/results.component';
import { DirectivesModule } from './utility/directive/directive.module';
import { WgtPageLoaderComponent } from './widgets/page-loader/page-loader.component';
import { Interceptor } from './services/interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SelectComponent,
    TeamCardComponent,
    TeamScoresComponent,
    ErrorPageComponent,
    ResultsComponent,
    CardHeaderComponent,
    ScoresComponent,
    ConfirmModalComponent,
    FilterComponent,
    WgtPageLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DirectivesModule,
  ],
  providers: [DatePipe, { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
