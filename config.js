import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, Color, @CheckboxProperty, @SelectorProperty } from 'Vigilance';

@Vigilant("DripTools", "ItsDirk", {
  getCategoryComparator: () => (a, b) => {
    const categories = ["Chat utilities"];
    return categories.indexOf(a.name) - categories.indexOf(b.name);
  },
})
class Settings {
  @SelectorProperty({
    name: "Vanquisher Notifications",
    description: "Select a chat to send vanquisher notifications to",
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
    name: "Watchdog Hider",
    description: "Hides watchdog messages",
    category: "Hiders",
  })
  watchDogHider = false;

  @TextProperty({
    name: "Watchdog Message",
    description: "Sends a message to 'thank' watchdog. Leave empty to disable",
    placeholder: "§fEnter message...",
    category: "Chat utilities",
    subcategory: "Messages",
  })
  watchDogMessage = "Thanks, watchdog!";

  @TextProperty({
    name: "Kicked Message",
    description:
      "Sends a message in party chat when you're kicked from SkyBlock. Leave empty to disable",
    placeholder: "§fEnter message...",
    category: "Chat utilities",
    subcategory: "Messages",
  })
  kickedMessage =
    "I have been kicked from SkyBlock! You can warp me back in a minute!";

  @TextProperty({
    name: "Bingo Message",
    description: "Sends a custom thank you message with /bongo",
    placeholder: "§fEnter message...",
    category: "Chat utilities",
    subcategory: "Messages",
  })
  bingoMessage = "Tysm!";

  @SwitchProperty({
    name: "Shorten Party Chat",
    description: "Shorten §9Party§r to §9P",
    category: "Chat utilities",
    subcategory: "Chat prefixes"
  })
  shortenPartyChat = false;

  @SwitchProperty({
    name: "Shorten Guild Chat",
    description: "Shorten §2Guild§r to §2G",
    category: "Chat utilities",
    subcategory: "Chat prefixes"
  })
  shortenGuildChat = false;

  @SwitchProperty({
    name: "Shorten Co-op Chat",
    description: "Shorten §bCo-op§r to §bCC",
    category: "Chat utilities",
    subcategory: "Chat prefixes"
  })
  shortenCoopChat = false;

  constructor() {
    this.initialize(this);
  }
}

export default new Settings();
