// prettier-ignore
import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, Color, @CheckboxProperty, @SelectorProperty } from 'Vigilance';

@Vigilant("DripTools", "Settings", {
  getCategoryComparator: () => (a, b) => {
    const categories = ["Chat Utilities", "Hiders"];
    return categories.indexOf(a.name) - categories.indexOf(b.name);
  },
  getSubcategoryComparator: () => (a, b) => {
    const subcategories = ["Vanquishers", "Replacements", "Chat prefixes", "Messages"];

    return (
      subcategories.indexOf(a.getValue()[0].attributesExt.subcategory) -
      subcategories.indexOf(b.getValue()[0].attributesExt.subcategory)
    );
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

  @TextProperty({
    name: "Customize Vanquisher Message",
    description: "Use [x], [y], [z], and [loc] to replace coordinates and location",
    placeholder: "Write your own message here...",
    category: "Chat Utilities",
    subcategory: "Vanquishers",
  })
  vanquisherMessageTemplate = "A Vanquisher has spawned at [x] [y] [z] ([loc])";

  @SwitchProperty({
    name: "Implosion Hider",
    description: "Hides implosion messages, can also be toggled with §b/ih§r. \n§a§lPro tip: §r§7Use Skytils to bind a keyboard key to §b/ih§r to quickly toggle it!",
    category: "Hiders",
  })
  implosionHider = false;

  @SwitchProperty({
    name: "Witch Mask Hider",
    description: "Hides the damage messages whenever a bat hits an enemy",
    category: "Hiders",
  })
  witchMaskHider = false;

  @SwitchProperty({
    name: "Watchdog Hider",
    description: "Hides watchdog messages. §6§lNote: §r§7this will make it so that the §oWatchdog Message§r is not sent.",
    category: "Hiders",
  })
  watchDogHider = false;

  @TextProperty({
    name: "Watchdog Message",
    description: "Sends a message to 'thank' watchdog. Leave empty to disable",
    placeholder: "§cDisabled...",
    category: "Chat Utilities",
    subcategory: "Messages",
  })
  watchDogMessage = "Thanks, watchdog!";

  @TextProperty({
    name: "Kicked Message",
    description:
      "Sends a message in party chat when you're kicked from SkyBlock. Leave empty to disable",
    placeholder: "§cDisabled...",
    category: "Chat Utilities",
    subcategory: "Messages",
  })
  kickedMessage =
    "I have been kicked from SkyBlock! You can warp me back in a minute!";

  @TextProperty({
    name: "Bingo Message",
    description: "Sends a custom thank you message with /bongo",
    placeholder: "§cDisabled...",
    category: "Chat Utilities",
    subcategory: "Messages",
  })
  bingoMessage = "Tysm!";

  @SwitchProperty({
    name: "Shorten Party Chat",
    description: "Shorten §9Party§r to §9P",
    category: "Chat Utilities",
    subcategory: "Chat prefixes",
  })
  shortenPartyChat = false;

  @SwitchProperty({
    name: "Shorten Guild Chat",
    description: "Shorten §2Guild§r to §2G",
    category: "Chat Utilities",
    subcategory: "Chat prefixes",
  })
  shortenGuildChat = false;

  @SwitchProperty({
    name: "Shorten Co-op Chat",
    description: "Shorten §bCo-op§r to §bC",
    category: "Chat Utilities",
    subcategory: "Chat prefixes",
  })
  shortenCoopChat = false;

  @SwitchProperty({
    name: "Post Coordinates With [cords]",
    description:
      "Replaces [cords] in your message with your current coordinates",
    category: "Chat Utilities",
    subcategory: "Replacements",
  })
  replaceCords = false;

  @SwitchProperty({
    name: "Start Message With Caps",
    description:
      "Replaces the first character of your message with a capital letter",
    category: "Chat Utilities",
    subcategory: "Replacements",
  })
  autoCaps = false;

  constructor() {
    this.initialize(this);
  }
}

export default new Settings();
