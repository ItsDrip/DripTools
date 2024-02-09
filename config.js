import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, Color, @CheckboxProperty, @SelectorProperty } from 'Vigilance';

@Vigilant("DripTools", "ItsDirk", {
  getCategoryComparator: () => (a, b) => {
    const categories = ["Chat Utilities"];
    return categories.indexOf(a.name) - categories.indexOf(b.name);
  },
})
class Settings {
  @SelectorProperty({
    name: "Vanquisher Notifications",
    description: "Select a chat to send vanquisher notifications to",
    category: "Chat Utilities",
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
    name: "Witch Mask Hider",
    description: "Hides the damage messages whenever a bat hits an enemy",
    category: "Hiders"
  })
  witchMaskHider = false;

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
    category: "Chat Utilities",
    subcategory: "Messages",
  })
  watchDogMessage = "Thanks, watchdog!";

  @TextProperty({
    name: "Kicked Message",
    description:
      "Sends a message in party chat when you're kicked from SkyBlock. Leave empty to disable",
    placeholder: "§fEnter message...",
    category: "Chat Utilities",
    subcategory: "Messages",
  })
  kickedMessage =
    "I have been kicked from SkyBlock! You can warp me back in a minute!";

  @TextProperty({
    name: "Bingo Message",
    description: "Sends a custom thank you message with /bongo",
    placeholder: "§fEnter message...",
    category: "Chat Utilities",
    subcategory: "Messages",
  })
  bingoMessage = "Tysm!";

  @SwitchProperty({
    name: "Shorten Party Chat",
    description: "Shorten §9Party§r to §9P",
    category: "Chat Utilities",
    subcategory: "Chat prefixes"
  })
  shortenPartyChat = false;

  @SwitchProperty({
    name: "Shorten Guild Chat",
    description: "Shorten §2Guild§r to §2G",
    category: "Chat Utilities",
    subcategory: "Chat prefixes"
  })
  shortenGuildChat = false;

  @SwitchProperty({
    name: "Shorten Co-op Chat",
    description: "Shorten §bCo-op§r to §bC",
    category: "Chat Utilities",
    subcategory: "Chat prefixes"
  })
  shortenCoopChat = false;

  @SwitchProperty({
    name: "Post Coordinates With [cords]",
    description: "Replaces [cords] in your message with your current coordinates",
    category: "Chat Utilities",
    subcategory: "Replacements"
  })
  replaceCords = false;

  @SwitchProperty({
    name: "Start Message With Caps",
    description: "Replaces the first character of your message with a capital letter",
    category: "Chat Utilities",
    subcategory: "Replacements"
  })
  autoCaps = false;

  constructor() {
    this.initialize(this);
  }
}

export default new Settings();
