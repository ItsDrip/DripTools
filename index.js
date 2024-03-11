/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "./config";
import { romanToNumber, numberToRoman } from "./utils/romanNumerals";
import { getLevelByExp, getExpByLevel } from "./utils/skillExpMappings";

register("command", (arg1, arg2, arg3) => {
  if (!arg1) {
    Settings.openGUI();
  }

  if (arg1 === "setflare") {
    setFlareCords(arg2, arg3);
  }
}).setName("dt", true);

function setFlareCords(x, y) {
  x = Number(x.replace(/[^0-9.]/g, ""));
  y = Number(y.replace(/[^0-9.]/g, ""));
  if (isNaN(x) || isNaN(y)) {
    ChatLib.chat(
      dripToolsPrefix +
        "§cInvalid coordinates! Please use §6/dt setflare [x] [y]§c."
    );
    return;
  }
  Settings.flareX = x;
  Settings.flareY = y;
  if (flareTicksRemaining >= 100) {
    ChatLib.chat(
      dripToolsPrefix +
        "§7Flare cords set to §6" +
        Settings.flareX +
        "§7, §6" +
        Settings.flareY +
        "§7!"
    );
  } else {
    flareTicksRemaining = 100;
    ChatLib.chat(
      dripToolsPrefix +
        "§7Flare cords set to §6" +
        Settings.flareX +
        "§7, §6" +
        Settings.flareY +
        "§7!\n§7Showing a §b5 second§7 preview."
    );
  }
}

const dripToolsPrefix = "§5§kA§a[§bDripTools§a]§5§kA§r§a ";

register("chat", (event) => {
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

  if (Settings.autoCapsIgnoreSingleChar && message.length === 1) {
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

register("chat", (event) => {
  if (!Settings.profileIdHider) {
    return;
  }
  let message = ChatLib.getChatMessage(event, true);
  if (message.includes("&r&8Profile ID: ")) {
    cancel(event);
  }
});

newSkillLevels = {
  combat: -1,
  farming: -1,
  fishing: -1,
  mining: -1,
  foraging: -1,
  enchanting: -1,
  alchemy: -1,
  carpentry: -1,
  runecrafting: -1,
  taming: -1,
  social: -1,
};

// ? edit lore option?
// ? add option to change the skill level scaling?
register("tick", () => {
  if (!Settings.overflowSkills) {
    return;
  }
  if (Player.getContainer().getName() !== "Your Skills") {
    if (newSkillLevels.combat !== -1) {
      newSkillLevels = {
        combat: -1,
        farming: -1,
        fishing: -1,
        mining: -1,
        foraging: -1,
        enchanting: -1,
        alchemy: -1,
        carpentry: -1,
        runecrafting: -1,
        taming: -1,
        social: -1,
      };
    }
    return;
  }

  Player.getContainer()
    .getItems()
    .forEach((item) => {
      if (item === null) {
        return;
      }
      let currentSkill = item
        .getName()
        .slice(2, item.getName().indexOf(" "))
        .toLowerCase();
      if (newSkillLevels[currentSkill] !== -1) {
        item.setName(
          getNameForNewSkillLevel(item, newSkillLevels[currentSkill])
        );
        return;
      }
      var newName = getNewSkillLevelName(item.getLore(), item);
      if (newName !== undefined) {
        item.setName(newName);
      }
    });
});

function getNewSkillLevelName(lore, item) {
  let expNumber = getSkillOverFlowFromItem(lore);
  let expLevel = getSkillLevelFromItem(item);

  if (expAmountIsOverFlow(lore)) {
    expLevel -= 1;
  }

  let newSkillLevel = getLevelByExp(getExpByLevel(expLevel) + expNumber);

  newSkillLevels[
    item.getName().slice(2, item.getName().indexOf(" ")).toLowerCase()
  ] = newSkillLevel;

  return getNameForNewSkillLevel(item, newSkillLevel);
}

function getSkillLevelFromItem(item) {
  let itemName = item.getName();
  let romanRegex = / (I|V|X|L|C)+/g;
  if (itemName.match(romanRegex) == null) {
    return null;
  }
  return romanToNumber(itemName.match(romanRegex)[0].trim());
}

function getSkillOverFlowFromItem(lore) {
  let loreString = lore.toLocaleString().replace(/,/g, "");
  let overFlowExpRegex = /§r (§6|§e)(\d+)/g;
  let overflowExpText = loreString.match(overFlowExpRegex);
  if (overflowExpText == null) {
    return null;
  }
  return Number(overflowExpText[0].slice(5));
}

function expAmountIsOverFlow(lore) {
  let loreString = lore.toLocaleString().replace(/,/g, "");
  if (loreString.includes("§8Max Skill level reached!")) {
    return true;
  }

  let progressToNextLevel = loreString.match(/§e(\d+\.?\d*)%/);
  if (progressToNextLevel != null) {
    if (progressToNextLevel[1] > 100) {
      return true;
    }
  }
  return false;
}

function skillIsMaxed(lore) {
  let loreString = lore.toLocaleString().replace(/,/g, "");
  if (loreString.includes("§8Max Skill level reached!")) {
    return true;
  }
  return false;
}

function getNameForNewSkillLevel(item, newSkillLevel) {
  let romanRegex = / (I|V|X|L|C)+/g;
  let newSkillTitle = item
    .getName()
    .replace(romanRegex, " " + numberToRoman(newSkillLevel));
  if (Settings.rainbowOverFlowSkills && skillIsMaxed(item.getLore())) {
    newSkillTitle = newSkillTitle.replace("§a", "§z");
  }
  return newSkillTitle;
}

register("chat", (event) => {
  if (!Settings.fireSaleHider) {
    return;
  }
  let message = ChatLib.getChatMessage(event, true);
  if (
    message.includes("♨") ||
    message.includes("&6&k&lA&r &c&lFIRE SALE &r&6&k&lA&r")
  ) {
    cancel(event);
  }
});

register("chat", (event) => {
  if (!Settings.skyMallHider) {
    return;
  }
  let message = ChatLib.getChatMessage(event, true);
  if (
    message.includes(
      "&r&bNew day! &r&eYour &r&2Sky Mall &r&ebuff changed!&r"
    ) ||
    message.includes(
      "&r&8&oYou can disable this messaging by toggling Sky Mall in your /hotm!&r"
    )
  ) {
    cancel(event);
  }
  if (message.includes("&r&eNew buff&r&r&r: ")) {
    cancel(event);
    let newMessage = message.replace(
      "&r&eNew buff&r&r&r: ",
      "§r§2§lSkyMall §6§lBuff§r: "
    );
    ChatLib.chat(newMessage);
  }
});

register("chat", (event) => {
  if (!Settings.guildExpHider) {
    return;
  }

  let message = ChatLib.getChatMessage(event, true);
  let regex = /&r&aYou earned &r&2\d+ GEXP &r&afrom playing SkyBlock!&r/;

  if (regex.test(message)) {
    cancel(event);
  }
});

register("chat", (event) => {
  if (!Settings.lobbyJoinHider) {
    return;
  }

  let message = ChatLib.getChatMessage(event, true);

  if (message.includes("&f &6joined the lobby!&r") || message.includes("&f &6joined the lobby!&r &a<&c<&b<&r")) {
    cancel(event);
  }
});