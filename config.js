// prettier-ignore
import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, Color, @CheckboxProperty, @SelectorProperty, @SliderProperty, @NumberProperty } from 'Vigilance';

@Vigilant("DripTools", "DripTools Settings", {
  getCategoryComparator: () => (a, b) => {
    const categories = ["Chat Utilities", "Hiders", "Flare Timer", "Other"];
    return categories.indexOf(a.name) - categories.indexOf(b.name);
  },
  getSubcategoryComparator: () => (a, b) => {
    const subcategories = ["Vanquishers", "Replacements", "Auto Caps", "Chat prefixes", "Messages"];

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
    subcategory: "Auto Caps",
  })
  autoCaps = false;
  
  @SwitchProperty({
    name: "Flare Timer",
    description:
    "Puts up a timer for when the flare will expire",
    category: "Flare Timer",
    subcategory: "Flare Timer",
  })
  flareTimer = false;
  
  @SliderProperty({
    name: "Flare Timer Decimals",
    description: "Select the amount of decimals displayed on the flare timer",
    category: "Flare Timer",
    subcategory: "Flare Timer",
    min: 0,
    max: 2,
  })
  flareTimerDecimals = 0;

  @TextProperty({
    name: "Flare Timer Template",
    description: "Set the way in which the text around the timer is displayed.\nUse [time] to insert the time left",
    category: "Flare Timer",
    subcategory: "Flare Timer",
    placeholder: "Empty is disabled...",
  })
  flareTimerTemplate = "Flare: [time]s";
  
  @SliderProperty({
    name: "Flare X",
    description: "Set the x position of the flare timer.\n§a§lPro tip: §r§7Use use §6/dt setflare [x] [y]§7 to adjust the position.",
    category: "Flare Timer",
    subcategory: "Flare Timer",
    min: 0,
    max: Renderer.screen.getWidth() * Renderer.screen.getScale(),
  })
  flareX = 0;
  
  @SliderProperty({
    name: "Flare Y",
    description: "Set the y position of the flare timer.\n§a§lPro tip: §r§7Use use §6/dt setflare [x] [y]§7 to adjust the position.",
    category: "Flare Timer",
    subcategory: "Flare Timer",
    min: 0,
    max: Renderer.screen.getHeight() * Renderer.screen.getScale(),
  })
  flareY = 0;
  
  @SliderProperty({
    name: "Flare Scale",
    description: "Set the scale of the flare timer (5 is default)",
    category: "Flare Timer",
    subcategory: "Flare Timer",
    min: 1,
    max: 25,
  })
  flareScale = 5;

  @SelectorProperty({
    name: "Flare Timer Color",
    description: "Select a color for the flare timer to be displayed in",
    category: "Flare Timer",
    subcategory: "Flare Timer",
    options: ["§zRainbow", "§4Dark Red", "§cRed", "§6Gold", "§eYellow", "§2Dark Green", "§aGreen", "§bAqua", "§3Dark Aqua", "§1Dark Blue", "§9Blue", "§dLight Purple", "§5Dark Purple", "§fWhite", "§7Gray", "§8Dark Gray", "§0Black"]
  })
  flareTimerColour = 0;
  
  @SliderProperty({
    name: "Rainbow Speed",
    description: "Select the speed of the rainbow effect",
    category: "Flare Timer",
    subcategory: "Flare Timer",
    min: 1,
    max: 50,
    hidden: false,
  })
  flareTimerRainbowSpeed = 10;

  @SwitchProperty({
    name: "Flare Shadow Toggle",
    description: "Toggle shadow for the flare timer on or off",
    category: "Flare Timer",
    subcategory: "Flare Timer",
  })
  flareTimerShadow = true;


  @SwitchProperty({
    name: "Ignore Single Character Messages",
    description:
      "Doesn't capitalize messages that are only a single character long",
    category: "Chat Utilities",
    subcategory: "Auto Caps",
  })
  autoCapsIgnoreSingleChar = false;

  @SwitchProperty({
    name: "Profile Id Hider",
    description: "Hides the \"§8Profile id:§r\"-message when switching lobbies",
    category: "Hiders",
  })
  profileIdHider = false;

  @SwitchProperty({
    name: "Enable Overflow Skills",
    description: "Enable showing overflow skill levels",
    category: "Other",
    subcategory: "Overflow Skills",
  })
  overflowSkills = false;

  @SwitchProperty({
    name: "Rainbowify Maxed Skills",
    description: "Uses SBA's §zChroma§r to make the skills rainbow for which you have reached the max level",
    category: "Other",
    subcategory: "Overflow Skills",
  })
  rainbowOverFlowSkills = false;

  @SwitchProperty({
    name: "Fire Sale Hider",
    description: "Hides the fire sale messages: §c♨ §5Random Skin §e(69420 §eleft)§c§r",
    category: "Hiders",
  })
  fireSaleHider = false;
  

  constructor() {
    this.initialize(this);
  }
}

export default new Settings();
