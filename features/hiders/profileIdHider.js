import Settings from "../config.js";

export function profileIdHider(event) {
  if (!Settings.profileIdHider) {
    return;
  }
  let message = ChatLib.getChatMessage(event, true);
  if (message.includes("&r&8Profile ID: ")) {
    cancel(event);
  }
}
