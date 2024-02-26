import Settings from "../config.js";

export function fireSaleHider(event) {
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
}