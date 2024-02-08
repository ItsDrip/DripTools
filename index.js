/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "./config";

register("command", () => Settings.openGUI()).setName("dt");

const dripToolsPrefix = "§5§kA§a[§bDripTools§a]§5§kA§r§a ";

register("chat", (event) => {
  if (
    ChatLib.getChatMessage(event, true).includes(
      "&r&aA &r&cVanquisher &r&ais spawning nearby!&r"
    )
  ) {
    let messagePrefix;
    let playerLocation;

    switch (Settings.vanquisherMode) {
      case 1:
        messagePrefix = "ac";
        break;
      case 2:
        messagePrefix = "pc";
        break;
      case 3:
        messagePrefix = "gc";
        break;
      case 4:
        messagePrefix = "cc";
        break;
      default:
        return;
    }

    for (i = 0; i < Scoreboard.getLines().length; i++) {
      let scoreBoardLine = String(Scoreboard.getLineByIndex(i));

      if (scoreBoardLine.includes("⏣")) {
        playerLocation = scoreBoardLine.replace(/§./g, "").replace(/ ⏣ /g, "");
      }
    }

    ChatLib.command(
      messagePrefix +
        " A Vanquisher has spawned at " +
        Math.round(Player.getX()) +
        " " +
        Math.round(Player.getY()) +
        " " +
        Math.round(Player.getZ()) +
        " (" +
        playerLocation +
        ")"
    );
  }
});

// register("chat", (event) => {
//   if (!autoPVToggle) {
//     return;
//   }
//   let message = ChatLib.getChatMessage(event, true);
//   let regex =
//     /Party Finder > (.+) joined the dungeon group! \((.+) Level (\d+)\)/;

//   if (regex.test(message)) {
//     let matches = message.match(regex);
//     let playerName = matches[1];
//     ChatLib.command("pv " + playerName);
//   }
// });

register("chat", (event) => {
  if (!Settings.implosionHider) {
    return;
  }
  let message = ChatLib.getChatMessage(event, true);
  let regex =
    /&r&7Your Implosion hit &r&c\d+ &r&7enem(y|ies) for &r&c[\d,]+\.?\d* &r&7damage.&r/;

  if (regex.test(message)) {
    cancel(event);
  }
});

register("chat", (event) => {
  if (Settings.kickedMessage === "") {
    return;
  }

  let message = ChatLib.getChatMessage(event, true);

  if (
    message.includes("You were kicked while joining that server!") ||
    message.includes("Ye be kicked while joinin' that server!")
  ) {
    ChatLib.command(
      "pc " + kickedMessage
    );
  }
});

register("chat", (event) => {
  if (Settings.watchDogHider) {
    return;
  }

  let message = ChatLib.getChatMessage(event, true);
  if (message.includes("&4[WATCHDOG ANNOUNCEMENT]&r")) {
    ChatLib.command("ac " + Settings.watchDogMessage);
  }
});

register("chat", (event) => {
  if (!Settings.watchDogHider) {
    return;
  }

  let message = ChatLib.getChatMessage(event, true);
  let lineOneRegex =
    /&fWatchdog has banned &r&c&l(\d{1,3}(,\d{3})*|\d+)&r&f players in the last 7 days.&r/;
  let lineTwoRegex =
    /&fStaff have banned an additional &r&c&l(\d{1,3}(,\d{3})*|\d+)&r&f in the last 7 days.&r/;
  if (
    message.includes("&4[WATCHDOG ANNOUNCEMENT]&r") ||
    lineOneRegex.test(message) ||
    lineTwoRegex.test(message) ||
    message.includes("&cBlacklisted modifications are a bannable offense!&r")
  ) {
    cancel(event);
  }
});

register("chat", (event) => {
  if (!Settings.shortenGuildChat){
    return
  }

  var message = ChatLib.getChatMessage(event, true);
  if (message.includes("&r&2Guild")){
    cancel(event);
    ChatLib.chat(message.replace("&r&2Guild", "&r&2G"));
  }
});

register("chat", (event) => {
  if (!Settings.shortenGuildChat){
    return
  }

  var message = ChatLib.getChatMessage(event, true);
  if (message.includes("&r&2Guild")){
    cancel(event);
    ChatLib.chat(message.replace("&r&2Guild", "&r&2G"));
  }
});

register("command", () => {
  ChatLib.chat("§r§2Guild > §7 §7ItsDirkie §2[Explo]§f: §r  SKILL LEVEL UP Social VI -> VII§r§r");
}).setName("test");
