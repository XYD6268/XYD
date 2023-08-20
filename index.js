const server = require('nukkitx-server');
const EventPriority = Java.type('cn.nukkit.event.EventPriority');

server.on('player.PlayerJoinEvent', (event) => {
  const player = event.getPlayer();
  showTeamSelectionGUI(player);
  updatePlayerLabels(player);
}).priority(EventPriority.HIGH);

server.on('player.PlayerRespawnEvent', (event) => {
  const player = event.getPlayer();
  handlePlayerRespawn(player);
});

function showTeamSelectionGUI(player) {
  const form = server.createCustomFormBuilder('团队选择')
    .addDropdown('team', ['红队', '蓝队'])
    .onSubmit((data) => {
      if (data === null) return;
      const teamColor = data.team === '红队' ? 'red' : 'blue';
      joinTeam(player, teamColor);
    })
    .build();

  form.send(player);
}

function joinTeam(player, teamColor) {
  const command = `/team join ${teamColor}`;
  server.dispatchCommand(server.getConsoleSender(), command);
  player.sendMessage(`§a你加入了${teamColor.toUpperCase()}队！`);
}

function updatePlayerLabels(player) {
  player.setNameTag(`§l${player.getName()}`);
  player.setNameTagVisible(true);
  player.setNameTagAlwaysVisible(true);
}

function handlePlayerRespawn(player) {
  player.setGamemode(3); // 将玩家切换到旁观模式（游戏模式3）
}
