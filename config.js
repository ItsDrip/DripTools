import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, Color, @CheckboxProperty, @SelectorProperty } from 'Vigilance';

@Vigilant("DripTools", "ItsDirk", {
  getCategoryComparator: () => (a, b) => {
    const categories = ["Chat utilities"];
    return categories.indexOf(a.name) - categories.indexOf(b.name);
  },
})
class Settings {
  @SelectorProperty({
    name: "Vanquisher messages",
    description: "Select a chat to send vanquisher messages to",
    category: "Chat utilities",
    subcategory: "Vanquishers",
    options: ["OFF", "ALL", "PARTY", "GUILD", "COOP"],
  })
  vanquisherMode = 0;

  @SwitchProperty({
    name: "Implosion Hider",
    description: "Hides implosion messages",
    category: "Hiders",
  })
  implosionHider = false;

  @SwitchProperty({
    name: "Watchdog hider",
    description: "Hides watchdog messages",
    category: "Hiders",
  })
  watchDogHider = false;

  @TextProperty({
    name: "Watchdog message",
    description: "Sends a message to 'thank' watchdog. Leave empty to disable",
    placeholder: "Enter message...",
    category: "Chat utilities",
    subcategory: "Messages",
  })
  watchDogMessage = "Thanks, watchdog!";

  @TextProperty({
    name: "Kicked message",
    description:
      "Sends a message in party chat when you're kicked from SkyBlock. Leave empty to disable",
    placeholder: "Enter message...",
    category: "Chat utilities",
    subcategory: "Messages",
  })
  kickedMessage =
    "I have been kicked from SkyBlock! You can warp me back in a minute!";

  @TextProperty({
    name: "Bingo message",
    description: "Sends a custom thank you message with /bongo",
    placeholder: "Enter message...",
    category: "Chat utilities",
    subcategory: "Messages",
  })
  bingoMessage = "Tysm!";

  constructor() {
    this.initialize(this);
  }
}

export default new Settings();
