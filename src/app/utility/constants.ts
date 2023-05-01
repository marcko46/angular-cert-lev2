
export const constants = {
  labels: {
    trackTeam: "Track team",
    back: "Back",
    backToDashboard: "Back to dashboard",
    details: "Details",
    conference_LOWER: "conference",
    avgPointsScored: "Avg pts scored: ",
    avgPointsConceded: "Avg pts conceded: ",
    seeGameResults: "See game results >>",
    teamAlreadyTracked: "The selected team is already being tracked!",
    east: "East",
    west: "West",
    no: "No",
    yes: "Yes",
    ok: "Ok",
  },
  actionType: {
    addToTrack: "ADD_TO_TRACK",
    backToDashboard: "BACK_TO_DASHBOARD",
    goToGameResults: "GO_TO_RESULTS",
  },
  results: {
    home: "HOME_TEAM",
    visitor: "VISITOR_TEAM",
    win: "W",
    lose: "L",
    draw: "D",
  }
}

export const endpoints = {
  base_url_teams: "https://free-nba.p.rapidapi.com/teams/",
  base_url_games: "https://free-nba.p.rapidapi.com/games",
  dashboard: "/dashboard",
  results: "/results/",
  notFound: "/error-page",
  logos: "https://interstate21.com/nba-logos/",
  extention_png: ".png",
}

export const GRID_COLL_CSS_CLASS: Map<number, any> =
    new Map( [
        [1, ['col-1']],
        [2, ['col-2']],
        [3, ['col-3']],
        [4, ['col-4']],
        [5, ['col-5']],
        [6, ['col-6']],
        [7, ['col-7']],
        [8, ['col-8']],
        [9, ['col-9']],
        [10, ['col-10']],
        [11, ['col-11']],
        [12, ['col-12']]
] );
