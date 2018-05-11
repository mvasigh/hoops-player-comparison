const searchButton = document.querySelector('#search-button');
const searchInput = document.querySelector('#search-bar');
const searchForm = document.querySelector('.search-form');

// TODO: Add comparison function with colored arrows indicating which player has better stat in that category

function getPlayerStats(playerName) {
  const name = playerName
    .toLowerCase()
    .split(' ')
    .join('-');
  const url = `https://api.mysportsfeeds.com/v1.2/pull/nba/2017-2018-regular/cumulative_player_stats.json?player=${name}`;

  return fetch(url, {
    method: 'GET',
    headers: {
      // import API_KEY
      Authorization: `Basic ${API_KEY}`
    }
  })
    .then(blob => blob.json())
    .then(data =>
      displayPlayerStats(data.cumulativeplayerstats.playerstatsentry)
    );
}

async function displayPlayerStats(playerEntry) {
  if (!playerEntry) {
    alert('Player not found.');
    return;
  }
  const player = await playerEntry[0].player,
    stats = await playerEntry[0].stats,
    team = await playerEntry[0].team,
    playerSlot = document.getElementById('player-2').checked
      ? 'column-2'
      : 'column-1';

  document.getElementById(playerSlot).innerHTML = `
    <div class="box">
      <p class="title">
        #${player.JerseyNumber} ${player.FirstName} ${player.LastName}
      </p>
      <p class="subtitle">
        ${player.Position} - ${team.City} ${team.Name}
      </p>
      <table class="table stat-table is-hoverable">
        <tbody>
          <tr>
            <td>GP</td>
            <td>${stats.GamesPlayed['#text']}</td>
          </tr>
          <tr>
            <td>MPG</td>
            <td>${(stats.MinSecondsPerGame['#text'] / 60).toFixed(1)}</td>
          </tr>
          <tr>
            <td>FG%</td>
            <td>${stats.FgPct['#text']}</td>
          </tr>
          <tr>
            <td>PTS</td>
            <td>${stats.PtsPerGame['#text']}</td>
          </tr>
          <tr>
            <td>AST</td>
            <td>${stats.AstPerGame['#text']}</td>
          </tr>
          <tr>
            <td>REB</td>
            <td>${stats.RebPerGame['#text']}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  getPlayerStats(searchInput.value);
  searchInput.value = '';
});
