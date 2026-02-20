// inspirations.js - daily inspiration quotes + helper question list

// ─────────────────────────────────────────────
//  Daily Partner Inspiration quotes
//  One is shown per day in the top card.
// ─────────────────────────────────────────────
const dailyInspirations = [
  // Things to say - words of affirmation
  { text: "Tell them: \"I trust you.\"", emoji: "🔐" },
  { text: "Tell them: \"I accept you - all of you.\"", emoji: "🌻" },
  { text: "Tell them: \"You can do this.\"", emoji: "🚀" },
  { text: "Tell them: \"I'm not going anywhere.\"", emoji: "⚓" },
  { text: "Tell them: \"You're enough.\"", emoji: "🩵" },
  { text: "Tell them: \"I'm proud of you.\"", emoji: "🏆" },
  { text: "Tell them: \"It's okay. We'll figure things out.\"", emoji: "🧩" },
  { text: "Tell them: \"I see how hard you're trying.\"", emoji: "🪞" },
  { text: "Tell them: \"Whatever you need right now, I'm here for you.\"", emoji: "🫱🏼‍🫲🏽" },
  { text: "Tell them: \"Tell me about your day - I want to understand.\"", emoji: "💬" },
  { text: "Tell them: \"You don't have to explain. I get it.\"", emoji: "🩷" },
  // Things to do - quality time
  { text: "Sit near them while they do their thing. You don't have to talk - just be close.", emoji: "🛋️" },
  { text: "Ask them to show you something they're hyperfocusing on right now. Listen with curiosity.", emoji: "🔎" },
  { text: "Suggest a low-pressure activity together - a walk, a drive, or just coffee on the couch.", emoji: "☕" },
  // Things to do - acts of service
  { text: "Handle one small task today that you know they've been avoiding. Don't make a big deal of it.", emoji: "✅" },
  { text: "Set a gentle reminder for them about something coming up - no lectures, just a heads-up.", emoji: "🔔" },
  { text: "Make their morning a little easier - lay out what they need, or have coffee ready.", emoji: "🌤️" },
  { text: "Help them break a big task into small steps. Write them down together on sticky notes.", emoji: "🗒️" },
  // Things to do - physical touch
  { text: "Offer a firm hug or a hand squeeze. Sometimes grounding touch says more than words.", emoji: "🤗" },
  // Things to do - small gifts / gestures
  { text: "Pick up a small treat for them at the shop - something they like but wouldn't buy themselves.", emoji: "🎁" },
  { text: "Send them a meme or clip about something they love. It says: \"I see you and I get you.\"", emoji: "😄" },
];

// ─────────────────────────────────────────────
//  Helper question list (shown below the daily quote)
//  "How you can help your partner help you"
// ─────────────────────────────────────────────
const inspirationSections = [
  {
    title: "If your partner is feeling down",
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
      { text: "Looks quite busy here - are you still working on all of this stuff?", emoji: "👀" },
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
      { text: "You've got a lot of different outfits lying around - do any of them need washing?", emoji: "🧺" },
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

// Emojis for the daily inspiration decorative display
// (no overlap with section emojis)
const dayEmojis = [
  "🧠", "💡", "🌟", "💪", "🌈", "🫶", "🌻", "🦋",
  "💚", "🎯", "🌿", "🔆", "🕊️", "🪷", "🌊", "☀️", "🤗",
  "🍀", "🎈", "🌸",
];
