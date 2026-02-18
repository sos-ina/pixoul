export const intents = [
  {
    keywords: [
      "recommend",
      "recommendation",
      "suggest",
      "suggestion",
      "what should i play",
      "what can i play",
      "pick a game",
      "game recommendation",
    ],
    type: "recommendation",
  },
  {
    keywords: [
      "hi",
      "hello",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
      "how are you",
      "thanks",
      "thank you",
    ],
    type: "casual",
  },
  {
    keywords: ["vr", "virtual reality", "headset", "oculus", "meta quest"],
    route: "/experience/vr",
    response: "Sure! Taking you to our VR games 🎮",
  },
  {
    keywords: ["pc", "computer", "steam", "keyboard", "mouse"],
    route: "/experience/pc",
    response: "Got it! Taking you to our PC games 🖥️",
  },
  {
    keywords: ["retro", "classic", "old school", "8-bit", "16-bit", "arcade classic"],
    route: "/experience/retro",
    response: "Awesome! Taking you to our Retro games 🕹️",
  },
  {
    keywords: ["console", "playstation", "ps", "xbox", "nintendo", "controller"],
    route: "/experience/console",
    response: "Sure! Taking you to our Console games 🎮",
  },
  {
    keywords: ["arcade", "coin", "ticket", "cabinet", "air hockey", "whack"],
    route: "/experience/arcade",
    response: "Let’s go! Taking you to our Arcade games 🕹️",
  },
  {
    keywords: ["sport", "sports", "bowling", "billiards", "pool"],
    route: "/experience/sport",
    response: "Nice! Taking you to our Sport games 🎳",
  },
  {
    keywords: ["all games", "all", "everything", "browse games", "view all"],
    route: "/experience/all",
    response: "Sure! Showing you all games 🎮",
  },
  {
    keywords: ["the hall", "hall venue", "event hall", "hall"],
    route: "/events/hall",
    response: "Sure! Taking you to The Hall 🏟️",
  },
  {
    keywords: ["social room", "social", "group room", "hangout"],
    route: "/events/social-room",
    response: "Got it! Taking you to the Social Room 👥",
  },
  {
    keywords: ["vip lounge", "vip", "lounge"],
    route: "/events/vip-lounge",
    response: "Absolutely! Taking you to the VIP Lounge ✨",
  },
  {
    keywords: ["observation deck", "deck", "observation"],
    route: "/events/observation-deck",
    response: "Sure! Taking you to the Observation Deck 🌌",
  },
  {
    keywords: ["school visit", "school", "field trip", "school trip", "academy"],
    route: "/events/school-visit",
    response: "Sure! Here’s the School Visit info 🎓",
  },
  {
    keywords: ["event", "school", "hall"],
    route: "/events",
    response: "Here are our events 📅",
  },
  {
    keywords: ["forums", "forum", "discussion", "discussions"],
    route: "/community/forums",
    response: "Sure! Taking you to the forums 💬",
  },
  {
    keywords: ["reviews", "review", "rating", "ratings"],
    route: "/community/reviews",
    response: "Sure! Taking you to reviews ⭐",
  },
  {
    keywords: ["player profile", "profile", "my profile", "account"],
    response: "Player Profile isn’t available yet — taking you to the community for now 💬",
  },
  {
    keywords: ["challenges", "challenge", "tournament", "leaderboard"],
    response: "Challenges aren’t available yet — taking you to the community for now 💬",
  },
  {
    keywords: ["fan art", "fanart", "art", "gallery"],
    response: "Fan Art isn’t available yet — taking you to the community for now 💬",
  },
  {
    keywords: ["dev updates", "developer updates", "updates", "patch notes", "news"],
    response: "Dev Updates aren’t available yet — taking you to the community for now 💬",
  },
  {
    keywords: ["community"],
    route: "/community/forums",
    response: "Let’s check out the community 💬",
  },
  {
    keywords: ["home", "start", "main"],
    route: "/",
    response: "Going back to the homepage 🏠",
  },
];
