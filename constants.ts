import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What is my absolute go-to drink?",
    options: ["Matcha", "Espresso", "Lukewarm Water"],
    correctAnswer: "Matcha",
    hint: "It's green, earthy, and definitely not lukewarm ka!"
  },
  {
    id: 2,
    question: "What is my primary Love Language?",
    options: ["Receiving Gifts", "Physical Touch", "Quality Time"],
    correctAnswer: "Receiving Gifts",
    hint: "I love it when you surprise me with something thoughtful ka!"
  },
  {
    id: 3,
    question: "If I could eat one meal forever, what would it be?",
    options: ["Fried Chicken", "Plain Salads", "Only Crackers"],
    correctAnswer: "Fried Chicken",
    hint: "Crispy, juicy, and definitely not a salad ka."
  },
  {
    id: 4,
    question: "What is my 'guilty pleasure' habit?",
    options: ["Online Shopping", "Waking up early", "Doing Laundry"],
    correctAnswer: "Online Shopping",
    hint: "My packages keep arriving for a reason..."
  },
  {
    id: 5,
    question: "Am I a morning bird or a night owl?",
    options: ["Night Owl", "Morning Bird"],
    correctAnswer: "Night Owl",
    hint: "I'm definitely not someone who loves the sunrise ka."
  },
  {
    id: 6,
    question: "What is my favorite way to 'recharge'?",
    options: ["Being on bed", "Running a marathon", "Networking events"],
    correctAnswer: "Being on bed",
    hint: "Think cozy, horizontal, and very comfortable ka."
  },
  {
    id: 7,
    question: "What’s the fastest way to my heart?",
    options: [
      "All of them!",
      "Buy me food, a small gift, or a flower",
      "Spending time with me and sweet hugs"
    ],
    correctAnswer: "All of them!",
    hint: "It's all the little things you do for me ka!"
  }
];

export const getRank = (score: number) => {
  if (score === 7) return "Soulmate Status 💍";
  if (score >= 4) return "Certified Boyfriend ✨";
  return "Needs More Cuddles 🍿";
};