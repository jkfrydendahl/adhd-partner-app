// reminders.js — data arrays organised by section

const reminderSections = [
  {
    title: "If your partner is feeling down",
    emoji: "💙",
    description: "Ask gently:",
    reminders: [
      { text: "What's challenging you right now?", emoji: "🌧️" },
      { text: "Where in your thought process do you get stuck?", emoji: "🔍" },
      { text: "Can you manage or do you need help?", emoji: "🤝" },
    ],
  },
  {
    title: "If there's a mess of unfinished projects",
    emoji: "🧩",
    description: "Ask without judgment:",
    reminders: [
      { text: "Looks quite busy here — are you still working on all of this stuff?", emoji: "👀" },
      { text: "Can any of this be paused and put away (and if so, where)?", emoji: "📦" },
      { text: "Can we move some of these things out of the way, and where do you need us to put a note or something to remind you of the stuff we put away?", emoji: "📝" },
    ],
  },
  {
    title: "If clothes are lying/hanging everywhere",
    emoji: "👕",
    description: "Ask with curiosity:",
    reminders: [
      { text: "You've got a lot of different outfits lying around — do any of them need washing?", emoji: "🧺" },
      { text: "Do you need or want help sorting out any of these clothes?", emoji: "🤲" },
      { text: "Where are these clothes going? They look like they are between locations.", emoji: "🗂️" },
    ],
  },
  {
    title: "If online orders are left in boxes around the house",
    emoji: "📬",
    description: "Ask with interest:",
    reminders: [
      { text: "What is this? (Sound genuinely interested!)", emoji: "✨" },
      { text: "What should we do next with this?", emoji: "🗺️" },
      { text: "Can we do something about this right now?", emoji: "⏰" },
      { text: "Do you need or want help dealing with this?", emoji: "💛" },
    ],
  },
];

// Flat list of all reminders (used for daily random pick)
const reminders = reminderSections.flatMap(s => s.reminders);

// Emojis for the "reminder of the day" decorative display
// (no overlap with reminder or section emojis)
const dayEmojis = [
  "🧠", "💡", "🌟", "💪", "🌈", "🫶", "🌻", "🦋",
  "💚", "🎯", "🌿", "🔆", "🕊️", "🪷", "🌊", "☀️", "🤗",
  "🍀", "🎈", "🌸",
];
