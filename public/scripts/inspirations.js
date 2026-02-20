// inspirations.js — data arrays organised by section

const inspirationSections = [
  {
    title: "If your partner seems down",
    emoji: "💙",
    description: "Ask gently:",
    inspirations: [
      { text: "What's challenging you right now?", emoji: "🌧️" },
      { text: "Where in your thought process do you get stuck?", emoji: "🔍" },
      { text: "Can you manage or do you need help?", emoji: "🤝" },
      { text: "Is there anything I can take off your plate today?", emoji: "🎒" },
      { text: "Do you want me to just listen, or are you looking for ideas?", emoji: "🫂" },
    ],
  },
  {
    title: "If unfinished projects pile up",
    emoji: "🧩",
    description: "Ask without judgment:",
    inspirations: [
      { text: "Looks quite busy here — are you still working on all of this stuff?", emoji: "👀" },
      { text: "Can any of this be paused and put away (and if so, where)?", emoji: "📦" },
      { text: "Can we move some of these things out of the way, and where do you need us to put a note or something to remind you of the stuff we put away?", emoji: "📝" },
      { text: "Which of these are you most excited about, and why?", emoji: "🌱" },
      { text: "Would it help if we made a small plan together for just one of these?", emoji: "🗓️" },
    ],
  },
  {
    title: "If clothes are lying everywhere",
    emoji: "👕",
    description: "Ask with curiosity:",
    inspirations: [
      { text: "You've got a lot of different outfits lying around — do any of them need washing?", emoji: "🧺" },
      { text: "Do you want/need help sorting out any of these clothes?", emoji: "🤲" },
      { text: "Where are these clothes going? They look like they are between locations.", emoji: "🗂️" },
      { text: "Want to do a quick 5-minute sort together?", emoji: "⏱️" },
      { text: "Is there a system that would make this easier for you?", emoji: "🧲" },
    ],
  },
  {
    title: "If online orders sit in boxes",
    emoji: "📬",
    description: "Ask with interest:",
    inspirations: [
      { text: "What is this? (Sound genuinely interested!)", emoji: "✨" },
      { text: "What should we do next with this?", emoji: "🗺️" },
      { text: "Can we do something about this right now?", emoji: "⏰" },
      { text: "Do you want/need help dealing with this?", emoji: "💛" },
      { text: "Is there anything in here that needs to go back?", emoji: "🔄" },
    ],
  },
];

// Flat list of all inspirations (used for daily random pick)
const inspirations = inspirationSections.flatMap(s => s.inspirations);

// Emojis for the "daily partner inspiration" decorative display
// (no overlap with inspiration or section emojis)
const dayEmojis = [
  "🧠", "💡", "🌟", "💪", "🌈", "🫶", "🌻", "🦋",
  "💚", "🎯", "🌿", "🔆", "🕊️", "🪷", "🌊", "☀️", "🤗",
  "🍀", "🎈", "🌸",
];
