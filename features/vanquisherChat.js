import Settings from "../config.js";

export function vanquisherChat() {
  if (Settings.vanquisherMode === 0) {
    return;
  }

  if (
    ChatLib.getChatMessage(event, true).includes(
      "&r&aA &r&cVanquisher &r&ais spawning nearby!&r"
    )
  ) {
    let messageChat;
    let playerLocation;

    let availableChats = ["ac", "pc", "gc", "cc"];
    messageChat = availableChats[Settings.vanquisherMode - 1];

    for (i = 0; i < Scoreboard.getLines().length; i++) {
      let scoreBoardLine = String(Scoreboard.getLineByIndex(i));

      if (scoreBoardLine.includes("⏣")) {
        playerLocation = scoreBoardLine.replace(/§./g, "").replace(/ ⏣ /g, "");
      }
    }

    let message = Settings.vanquisherMessageTemplate
      .replace("[x]", Math.round(Player.getX()))
      .replace("[y]", Math.round(Player.getY()))
      .replace("[z]", Math.round(Player.getZ()))
      .replace("[loc]", playerLocation);

    ChatLib.command(messageChat + " " + message);
  }
}
