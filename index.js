/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

const dripToolsPrefix = "§5§kA§a[§bDripTools§a]§5§kA§r§a ";

let vanqMode = 0;
let autoPVToggle = false;
let implosionHiderToggle = false;
let kickTimerToggle = false;
let watchDogMessage = "Thanks, Watchdog!";
let bingoMessage = "Tysm!";

const usages = ["/dt vanq", "/dt pv", "/dt ih", "/dt kt"];

register("command", (args) => {
  if (args == null || args == "help") {
    ChatLib.chat(dripToolsPrefix + "§7Usages: " + usages.join(", "));

    return;
  }

  if (args == "vanq" || args == "vanquisher") {
    let vanqModeState;
    switch (vanqMode) {
      case 0:
        vanqModeState = "§f§lALL!";
        vanqMode = 1;
        break;
      case 1:
        vanqModeState = "§9§lPARTY!";
        vanqMode = 2;
        break;
      case 2:
        vanqModeState = "§2§lGUILD!";
        vanqMode = 3;
        break;
      case 3:
        vanqModeState = "§b§lCOOP!";
        vanqMode = 4;
        break;
      case 4:
        vanqModeState = "§c§lOFF!";
        vanqMode = 0;
        break;
      default:
        return;
    }

    ChatLib.chat(
      dripToolsPrefix + "Vanquisher chat is set to " + vanqModeState
    );

    return;
  }

  if (args == "pv" || args == "autopv") {
    autoPVToggle = !autoPVToggle;

    ChatLib.chat(
      dripToolsPrefix +
        "§aAuto PV is now " +
        (autoPVToggle ? "§a§lON!" : "§c§lOFF!")
    );
  }

  if (args == "ih") {
    implosionHiderToggle = !implosionHiderToggle;

    ChatLib.chat(
      dripToolsPrefix +
        "Implosion hider is now " +
        (implosionHiderToggle ? "§a§lON!" : "§c§lOFF!")
    );
  }

  if (args == "kt" || args == "kicktimer") {
    kickTimerToggle = !kickTimerToggle;

    ChatLib.chat(
      dripToolsPrefix +
        "Kicked message is now " +
        (kickTimerToggle ? "§a§lON!" : "§c§lOFF!")
    );
  }

  if (args == "wd" || args == "watchdog") {
    ChatLib.chat(
      dripToolsPrefix +
        "Current watchdog message is: " +
        watchDogMessage +
        "\n§aUse /wdm <message> to change it! (Max 20 words) Leave blank to disable!"
    );
  }

  if (args == "bm" || args == "bingo") {
    ChatLib.chat(
      dripToolsPrefix +
        "Current bingo message is: " +
        bingoMessage +
        "\n§aUse /bm <message> to change it! (Max 20 words) Leave blank to disable!"
    );
  }
}).setName("driptools").setAliases(["dt"]);

register("command", () => {
  implosionHiderToggle = !implosionHiderToggle;

  ChatLib.chat(
    dripToolsPrefix +
      "Implosion hider is now " +
      (implosionHiderToggle ? "§a§lON!" : "§c§lOFF!")
  );
}).setName("ih");

register("command", (args, args2, args3, args4, args5, args6, args7, args8, args9, args10, args11, args12, args13, args14, args15, args16, args17, args18, args19, args20) => {
  watchDogMessage = "";
  if (args == null || args == "") {
    ChatLib.chat(dripToolsPrefix + "Watchdog message §c§lDISABLED!");
    return;
  }
  var arguments = [args, args2, args3, args4, args5, args6, args7, args8, args9, args10, args11, args12, args13, args14, args15, args16, args17, args18, args19, args20];



  for(i = 0; i < arguments.length; i++) {
    if (arguments[i] == null) {
      arguments[i] = "";
    }
    watchDogMessage += arguments[i] + " ";
  }

  ChatLib.chat(dripToolsPrefix + "Watchdog message set to: " + watchDogMessage);
}).setName("wdm");

register("command", (args, args2, args3, args4, args5, args6, args7, args8, args9, args10, args11, args12, args13, args14, args15, args16, args17, args18, args19, args20) => {
  bingoMessage = "";
  if (args == null || args == "") {
    ChatLib.chat(dripToolsPrefix + "Bingo message §c§lDISABLED!");
    return;
  }
  var arguments = [args, args2, args3, args4, args5, args6, args7, args8, args9, args10, args11, args12, args13, args14, args15, args16, args17, args18, args19, args20];
  
  for(i = 0; i < arguments.length; i++) {
    if (arguments[i] == null) {
      arguments[i] = "";
    }
    bingoMessage += arguments[i] + " ";
  }

  ChatLib.chat(dripToolsPrefix + "Bingo message set to: " + bingoMessage);
}).setName("bm").setAliases(["bingomessage"]);

register("command", () => {
  if (bingoMessage.isempty()) {
    return;
  }

  ChatLib.command("ac " + bingoMessage);
}).setName("bingo").setAliases(["bongo"]);

register("chat", (event) => {
  if (
    ChatLib.getChatMessage(event, true).includes(
      "&r&aA &r&cVanquisher &r&ais spawning nearby!&r"
    )
  ) {
    let messagePrefix;
    let playerLocation;

    switch (vanqMode) {
      case 1:
        messagePrefix = "ac A Vanquisher has spawned at ";
        break;
      case 2:
        messagePrefix = "pc A Vanquisher has spawned at ";
        break;
      case 3:
        messagePrefix = "gc A Vanquisher has spawned at ";
        break;
      case 4:
        messagePrefix = "cc A Vanquisher has spawned at ";
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

register("chat", (event) => {
  if (!autoPVToggle) {
    return;
  }
  let message = ChatLib.getChatMessage(event, true);
  let regex =
    /Party Finder > (.+) joined the dungeon group! \((.+) Level (\d+)\)/;

  if (regex.test(message)) {
    let matches = message.match(regex);
    let playerName = matches[1];
    ChatLib.command("pv " + playerName);
  }
});

register("chat", (event) => {
  if (!implosionHiderToggle) {
    return;
  }

  let message = ChatLib.getChatMessage(event, true);

  if (message.includes("Your Implosion hit")) {
    cancel(event);
  }
});

register("chat", (event) => {
  if (!kickTimerToggle) {
    return;
  }

  let message = ChatLib.getChatMessage(event, true);

  if (
    message.includes("You were kicked while joining that server!") ||
    message.includes("Ye be kicked while joinin' that server!")
  ) {
    ChatLib.command(
      "pc I have been kicked from SkyBlock! You can warp me back in a minute!"
    );
  }
});

register("chat", (event) => {
  if (watchDogMessage.isempty()) {
    return;
  }

  let message = ChatLib.getChatMessage(event, true);
  if (message.includes("&4[WATCHDOG ANNOUNCEMENT]&r")) {
    ChatLib.command("ac " + watchDogMessage);
  }
});
