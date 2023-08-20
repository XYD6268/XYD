const server = require('nukkit').server;

function joinTeam(player, teamColor) {
  const command = 'team join ' + teamColor;
  server.dispatchCommand(server.getConsoleSender(), command);
  player.sendMessage('你加入了' + teamColor + '队！');
}

function showTeamSelectionGUI(player) {
  const form = new FormWindowSimple('团队选择', '请选择一个队伍：');
  form.addButton(new ElementButton('红队'));
  form.addButton(new ElementButton('蓝队'));

  player.showFormWindow(form);
}

server.on('player.join', (event) => {
  const player = event.player;
  showTeamSelectionGUI(player);
});

server.on('form.responded', (event) => {
  const player = event.player;
  const response = event.response;

  if (response instanceof FormWindowSimple.Response) {
    const clickedButtonIndex = response.getClickedButtonId();

    if (clickedButtonIndex === 0) {
      joinTeam(player, 'Red');
    } else if (clickedButtonIndex === 1) {
      joinTeam(player, 'Blue');
    }
  }
});
