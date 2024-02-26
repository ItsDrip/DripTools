/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "./config";

register("command", (arg1, arg2, arg3) => {
  if (!arg1) {
    Settings.openGUI();
  }

  if (arg1 === "setflare") {
    setFlareCords(arg2, arg3);
  }
}).setName("dt", true);

function setFlareCords(x, y) {
  x = Number(x.replace(/[^0-9.]/g, ''));
  y = Number(y.replace(/[^0-9.]/g, ''));
  if (isNaN(x) || isNaN(y)) {
    ChatLib.chat(
      dripToolsPrefix +
        "§cInvalid coordinates! Please use §6/dt setflare [x] [y]§c."
    );
    return;
  }
  Settings.flareX = x;
  Settings.flareY = y;
  flareTicksRemaining += 100;
  ChatLib.chat(
    dripToolsPrefix +
      "§7Flare cords set to §6" +
      Settings.flareX +
      "§7, §6" +
      Settings.flareY +
      "§7!\n§7Showing a §b5 second§7 preview."
  );
}

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

register("command", () => {
  Settings.implosionHider = !Settings.implosionHider;
  ChatLib.chat(
    dripToolsPrefix +
      "§7Implosion hider is now " +
      (Settings.implosionHider ? "§a§lON!" : "§c§lOFF!")
  );
}).setName("ih");

register("chat", (event) => {
  if (Settings.kickedMessage === "") {
    return;
  }

  let message = ChatLib.getChatMessage(event, true);

  if (
    message.includes("You were kicked while joining that server!") ||
    message.includes("Ye be kicked while joinin' that server!")
  ) {
    ChatLib.command("pc " + kickedMessage);
  }
});

register("command", () => {
  if (Settings.bingoMessage == "") {
    const clickableMessage = new Message(
      dripToolsPrefix,
      new TextComponent(
        "&cYou need to set a message in settings for this command to work! Click &ehere &cto open settings."
      )
        .setClick("run_command", "/dt")
        .setHoverValue("&eClick to open settings")
    );

    ChatLib.chat(clickableMessage);
    return;
  }
  ChatLib.command("ac " + Settings.bingoMessage);
}).setName("bongo");

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
  if (!Settings.shortenPartyChat) {
    return;
  }
  var message = ChatLib.getChatMessage(event, true);
  if (message.includes("&r&9Party")) {
    ChatLib.chat(message.replace("&r&9Party", "&r&9P"));
    cancel(event);
  }
});

register("chat", (event) => {
  if (!Settings.shortenGuildChat) {
    return;
  }
  var message = ChatLib.getChatMessage(event, true);
  if (message.includes("&r&2Guild")) {
    ChatLib.chat(message.replace("&r&2Guild", "&r&2G"));
    cancel(event);
  }
});

register("chat", (event) => {
  if (!Settings.shortenCoopChat) {
    return;
  }
  var message = ChatLib.getChatMessage(event, true);
  if (message.includes("&r&bCo-op")) {
    ChatLib.chat(message.replace("&r&bCo-op", "&r&bC"));
    cancel(event);
  }
});

register("messageSent", (message, event) => {
  if (!Settings.replaceCords) {
    return;
  }

  if (message.includes("[cords]") || message.includes("[coords]")) {
    message = message.replace(
      /\[(cords|coords)\]/,
      Math.round(Player.getX()) +
        " " +
        Math.round(Player.getY()) +
        " " +
        Math.round(Player.getZ())
    );
    cancel(event);
    ChatLib.say(message);
  }
});

register("messageSent", (message, event) => {
  if (
    !Settings.autoCaps ||
    message.charAt(0) === message.charAt(0).toUpperCase()
  ) {
    return;
  }
  const capitalizedMessage = message.charAt(0).toUpperCase() + message.slice(1);
  cancel(event);
  ChatLib.say(capitalizedMessage);
});

register("chat", (event) => {
  if (!Settings.witchMaskHider) {
    return;
  }

  let message = ChatLib.getChatMessage(event, true);
  let regex =
    /&r&7Your Bat Swarm hit &r&c(\d+) &r&7enem(y|ies) for &r&c(\d{1,3}(,\d{3})*(\.\d+)?) &r&7damage.&r/;

  if (regex.test(message)) {
    cancel(event);
  }
});

let flareTicksRemaining = 0;
let flareTimerIsHidden = false;

register("playerInteract", () => {
  if (!Settings.flareTimer) return;
  if (flareTicksRemaining >= (180 - 20) * 20) return; // 180 seconds - 20 seconds because of cooldown)
  if (!Player.getHeldItem()) return;

  flareTimerIsHidden = false;

  const itemNBT = Player.getHeldItem().getRawNBT();
  if (
    itemNBT.includes("WARNING_FLARE") ||
    itemNBT.includes("ALERT_FLARE") ||
    itemNBT.includes("SOS_FLARE")
  ) {
    flareTicksRemaining = 180 * 20; // 180 seconds * 20 ticks per second
  }
});

register("tick", () => {
  if (flareTicksRemaining > 0) {
    flareTicksRemaining--;
  }
});

register("chat", (event) => {
  if (!Settings.flareTimer) {
    return;
  }
  let message = ChatLib.getChatMessage(event, true);

  if (
    message.includes(
      "&r&eYour flare disappeared because you were too far away!&r"
    )
  ) {
    flareTimerIsHidden = true;
  }
});

register("worldUnload", () => {
  flareTicksRemaining = 0;
});

register("renderOverlay", () => {
  if (flareTicksRemaining <= 0 || flareTimerIsHidden) {
    return;
  }
  const text = new Text(
    Settings.flareTimerTemplate.replace(
      "[time]",
      (flareTicksRemaining / 20).toFixed(Settings.flareTimerDecimals)
    ),
    Math.round(Settings.flareX / Renderer.screen.getScale()),
    Math.round(Settings.flareY / Renderer.screen.getScale())
  );
  const colors = [
    Renderer.getRainbow(
      flareTicksRemaining,
      200 / Settings.flareTimerRainbowSpeed
    ),
    Renderer.DARK_RED,
    Renderer.RED,
    Renderer.GOLD,
    Renderer.YELLOW,
    Renderer.DARK_GREEN,
    Renderer.GREEN,
    Renderer.AQUA,
    Renderer.DARK_AQUA,
    Renderer.DARK_BLUE,
    Renderer.BLUE,
    Renderer.LIGHT_PURPLE,
    Renderer.DARK_PURPLE,
    Renderer.WHITE,
    Renderer.GRAY,
    Renderer.DARK_GRAY,
    Renderer.BLACK,
  ];

  text.setColor(colors[Settings.flareTimerColour]);
  text.setShadow(Settings.flareTimerShadow);
  text.setScale(Settings.flareScale / 5);
  text.draw();
});

register("tick", () => {

});
