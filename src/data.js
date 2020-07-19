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
};
