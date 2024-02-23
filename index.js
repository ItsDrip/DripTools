/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "./config";
import { romanToNumber, numberToRoman } from "./utils/romanNumerals";
import { getLevelByExp, getExpByLevel } from "./utils/skillExpMappings";

register("command", () => Settings.openGUI()).setName("dt", true);

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

register("chat", (event) => {
  if (!Settings.profileIdHider) {
    return;
  }
  let message = ChatLib.getChatMessage(event, true);
  if (message.includes("&r&8Profile ID: ")) {
    cancel(event);
  }
});

// register("tick", () => {
//   // ChatLib.chat(
//   //   Player.getInventory().getStackInSlot(Player.getHeldItemIndex())
//   //     ? Player.getInventory().getStackInSlot(Player.getHeldItemIndex())
//   //     : "Empty"
//   // );

//   // if (Player.getContainer().getName() == "Your Skills")
//   //   ChatLib.chat(Player.getContainer().getName());

//   if (Player.getContainer().getName() == "Your Skills") {
//     Player.getContainer()
//       .getItems()
//       .forEach((item) => {
//         if (item) {
//           if (
//             item.getRegistryName() == "minecraft:stone_sword" &&
//             item.getName().includes("§aCombat") //§aCombat
//           ) {
//             ChatLib.chat(item.getName());
//             console.log(item.getName());
//             if (item.getName().match(/(I|V|X|L)+/)) {
//               item.setName(
//                 item
//                   .getName()
//                   .replace(
//                     /(I|V|X|L)+/,
//                     romanToNumber(item.getName().match(/(I|V|X|L)+/)[0])
//                   )
//               );
//             }
//           }
//         }
//       });
//   }
// });

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

// TODO: confirm if this works with SBA's roman to number setting
// TODO: make code run on open gui, not on hover (SkyHanni mode)
// TODO: edit lore option?
// ? add rainbow name to skill

register("tick", () => {
  if (
    Player.getContainer().getName() !== "Your Skills" &&
    newSkillLevels.combat !== -1
  ) {
    console.log("Called tick even not in skills menu !");
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
});

register("tick", () => {
  // If the item is not in the "Your Skills" menu, return
  if (Player.getContainer().getName() !== "Your Skills") {
    return;
  }
  if (newSkillLevels.combat !== -1) {
    console.log("Called!" + Date.now());
    return;
  }

  // If the item is not a skill, return
  // Every skill is initialized to -1, so if it's not -1, it's been set and we return
  Player.getContainer()
    .getItems()
    .forEach((item) => {
      if (
        item === null ||
        newSkillLevels[
          item.getName().slice(2, item.getName().indexOf(" ")).toLowerCase()
        ] !== -1
      ) {
        return;
      }
      var newName = getNewSkillLevelName(item.getLore(), item);
      if (newName !== undefined) {
        // console.log(newSkillLevels[item.getName().slice(2, item.getName().indexOf(" ")).toLowerCase()]);
        item.setName(newName);
      }
      // console.log(getNewSkillLevelName(item.getLore(), item));
    });
});

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
}

function getNewSkillLevelName(lore, item) {
  let itemName = item.getName();

  let romanRegex = / (I|V|X|L|C)+/g;

  let loreString = lore.toLocaleString().replace(/,/g, "");
  let overflowExpText = loreString.match(/§r (§6|§e)(\d+)/g);

  // console.log(loreString);

  if (overflowExpText == null) return;

  let expNumber = Number(overflowExpText[0].slice(5));
  //! Coleweight conflicts?

  let newSkillLevel = getSkillLevelFromItem(item);
  // We add skill exp for a level to the assument amount of overflow, but the last level of the skill (50 or 60) is not included in that. This means that we are crediting the player with 1 too many levels, we correct for that
  if (loreString.includes("§8Max Skill level reached!")) {
    newSkillLevel -= 1;
  }

  let progressToNextLevel = loreString.match(/§e(\d+\.?\d*)%/);
  if (progressToNextLevel != null) {
    if (progressToNextLevel[1] > 100) {
      newSkillLevel -= 1;
    }
  }
  // ChatLib.chat(
  //   getExpByLevel(newSkillLevel) +
  //     " + " +
  //     expNumber +
  //     " = " +
  //     totalSkillExp +
  //     " exp becomes level " +
  //     getLevelByExp(totalSkillExp) +
  //     "! This is " +
  //     numberToRoman(getLevelByExp(totalSkillExp)) +
  //     " in roman!"
  // );

  let totalSkillExp = getExpByLevel(newSkillLevel) + expNumber;
  newSkillLevel = getLevelByExp(totalSkillExp);

  let newSkillTitle = itemName.replace(
    romanRegex,
    " " + numberToRoman(newSkillLevel)
  );

  newSkillLevels[
    item.getName().slice(2, item.getName().indexOf(" ")).toLowerCase()
  ] = newSkillLevel;

  return newSkillTitle;
}

// * For testing
register("command", (args) => {
  ChatLib.chat("Exp req for level: " + args + " = " + getExpByLevel(args));
}).setName("getexp");

// * For testing
register("command", (args) => {
  ChatLib.chat("Level with " + args + " exp = " + getLevelByExp(args));
}).setName("getlevel");
