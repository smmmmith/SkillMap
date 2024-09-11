export const allSkills = [
  {
    id: 1,
    name: "Cooking",
    progress: 0,
    subSkills: [
      { id: 11, name: "Meal Prep", completed: false },
      { id: 12, name: "Using Appliances", completed: false },
      { id: 13, name: "Basic Recipes", completed: false },
    ],
    practiceLog: [],
    mastered: false,
    goalId: 'cooking',
  },
  {
    id: 2,
    name: "Budgeting",
    progress: 0,
    subSkills: [
      { id: 21, name: "Expense Tracking", completed: false },
      { id: 22, name: "Creating a Budget", completed: false },
      { id: 23, name: "Saving Strategies", completed: false },
    ],
    practiceLog: [],
    mastered: false,
    goalId: 'budgeting',
  },
  {
    id: 3,
    name: "Social Skills",
    progress: 0,
    subSkills: [
      { id: 31, name: "Active Listening", completed: false },
      { id: 32, name: "Conversation Starters", completed: false },
      { id: 33, name: "Body Language", completed: false },
    ],
    practiceLog: [],
    mastered: false,
    goalId: 'socialSkills',
  },
  {
    id: 4,
    name: "Fitness",
    progress: 0,
    subSkills: [
      { id: 41, name: "Cardio Exercises", completed: false },
      { id: 42, name: "Strength Training", completed: false },
      { id: 43, name: "Flexibility", completed: false },
    ],
    practiceLog: [],
    mastered: false,
    goalId: 'fitness',
  },
  {
    id: 5,
    name: "Time Management",
    progress: 0,
    subSkills: [
      { id: 51, name: "Prioritization", completed: false },
      { id: 52, name: "Task Scheduling", completed: false },
      { id: 53, name: "Avoiding Procrastination", completed: false },
    ],
    practiceLog: [],
    mastered: false,
    goalId: 'timeManagement',
  },
  {
    id: 6,
    name: "Using Uber",
    progress: 0,
    subSkills: [
      { id: 61, name: "Introduction to Uber", completed: false },
      { id: 62, name: "Navigating the App", completed: false },
      { id: 63, name: "Scheduling a Trip", completed: false },
    ],
    level2SubSkills: [
      { id: 64, name: "Setting up Payment", completed: false },
      { id: 65, name: "Social Norms of Uber", completed: false },
      { id: 66, name: "Explaining Safety Features", completed: false },
      { id: 67, name: "Verify Correct Car", completed: false },
      { id: 68, name: "Leaving a Rating", completed: false },
    ],
    practiceLog: [],
    mastered: false,
    goalId: 'transportation',
  },
];

export const getInitialSkills = (selectedGoals) => {
  return allSkills.filter(skill => selectedGoals.includes(skill.goalId));
};

export const getAdditionalSkills = (selectedGoals) => {
  return allSkills.filter(skill => !selectedGoals.includes(skill.goalId));
};