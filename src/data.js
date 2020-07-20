let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

export const taskData = {
  lanes: [
    {
      id: "ToDo",
      title: "ToDo",
      label: "2/2",
      style: {}, // Style of Lane
      cardStyle: { backgroundColor: "" },
      cards: savedTasks.filter((task) => task.laneId === "ToDo"),
      disallowAddingCard: true,
    },
    {
      id: "InProgress",
      title: "In Progress",
      label: "0/0",
      cards: savedTasks.filter((task) => task.laneId === "InProgress"),
      disallowAddingCard: true,
    },
    {
      id: "InReview",
      title: "In Review",
      label: "0/0",
      cards: savedTasks.filter((task) => task.laneId === "InReview"),
      disallowAddingCard: true,
    },
    {
      id: "Done",
      title: "Done",
      label: "0/0",
      cards: savedTasks.filter((task) => task.laneId === "Done"),
      disallowAddingCard: true,
    },
  ],
  users: [
    {
      id: "1",
      firstName: "Ganesh",
      lastName: "Waghmare",
      email: "waghmare.ganesh2@gmail.com",
    },
    {
      id: "2",
      firstName: "Jay",
      lastName: "Kulkarni",
      email: "jay.kulkarni@gmail.com",
    },
    {
      id: "3",
      firstName: "Jeet",
      lastName: "Patel",
      email: "jeet.patel@gmail.com",
    },
    {
      id: "4",
      firstName: "Amar",
      lastName: "Singh",
      email: "amar.singh@gmail.com",
    },
  ],
};
