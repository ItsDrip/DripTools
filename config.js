import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, Color, @CheckboxProperty, @SelectorProperty } from 'Vigilance';

@Vigilant("DripTools", "ItsDirk", {
  getCategoryComparator: () => (a, b) => {
    const categories = ["Chat utilities"];
    return categories.indexOf(a.name) - categories.indexOf(b.name);
  },
})
class Settings {
    @SelectorProperty({
        name: "Vanquisher chat",
        description: "Select a chat to send vanquisher messages to",
        category: "Chat utilities",
        subcategory: "Vanquishers",
        options: ["OFF", "ALL", "PARTY", "GUILD", "COOP"]
    })
    vanqMode = 0;

  constructor() {
    this.initialize(this);
  }
}

export default new Settings();
