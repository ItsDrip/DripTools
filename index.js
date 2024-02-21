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


register("itemTooltip", (lore, item, event) => {
  if (Player.getContainer().getName() !== "Your Skills") {
    return;
  }

  let itemName = item.getName();
  let romanRegex = / (I|V|X|L|C)+/;

  let loreString = lore.toLocaleString().replace(/,/g, "");
  let match = loreString.match(/§r §6(\d+)/);

  if (match == null) return;

  let expNumber = Number(match[1]);
  // Coleweight conflicts?
  // ChatLib.chat(expNumber ? expNumber : "No match");

  if (itemName.match(romanRegex)) {
    let newSkillLevel = romanToNumber(itemName.match(romanRegex)[0].trim());
    let totalSkillExp = getExpByLevel(newSkillLevel) + expNumber;
    newSkillLevel = getLevelByExp(totalSkillExp);
    ChatLib.chat(
      getExpByLevel(newSkillLevel) +
        " + " +
        expNumber +
        " = " +
        totalSkillExp +
        " exp becomes level " +
        newSkillLevel +
        "! This is " +
        numberToRoman(newSkillLevel) +
        " in roman!"
    );
    newSkillLevel = numberToRoman(newSkillLevel);
    item.setName(itemName.replace(romanRegex, " " + newSkillLevel));
  }

  // console.log(lore.forEach((line) => console.log(line)));
});

register("command", (args) => {
  ChatLib.chat("Exp req for level: " + args + " = " + getExpByLevel(args));
}).setName("getexp");

register("command", (args) => {
  ChatLib.chat("Level with " + args + " exp = " + getLevelByExp(args));
}).setName("getlevel");
