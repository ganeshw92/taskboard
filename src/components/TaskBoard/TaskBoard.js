import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Board from "react-trello";
import "./taskboard.css";
import { taskData } from "../../data";

Modal.setAppElement("#root");

let updatedData = {};
let selectedOptions = [];

const customStyles = {
  content: {
    top: "30%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function TaskBoard() {
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [data, setTaskData] = useState(taskData);
  useEffect(() => {
    // Update the document title using the browser API
    // data = data;
  }, [data]);
  function openModal() {
    setIsOpen(true);
    selectedOptions = [];
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#6a6a6a";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const CustomLaneHeader = (props) => {
    return (
      <div className="custom-lane">
        <div>
          <span className="title">{props.title}</span>
        </div>
        <div>
          {props.id === "InProgress" && <span className="recording">REC</span>}
          <span className="actions" tooltip="actions">
            ...
          </span>
        </div>
      </div>
    );
  };

  const CustomCard = (props) => {
    return (
      <article className={props.className} key={props.id}>
        <div className="card-header">
          <button
            className="delete-card"
            title="Delete"
            onClick={(event) => onCardDelete(event, props.id, props.laneId)}
          >
            x
          </button>
          <header
            className={
              props.laneId === "ToDo"
                ? "border-grey"
                : props.laneId === "InProgress"
                ? "border-orange"
                : props.laneId === "InReview"
                ? "border-red"
                : "border-green"
            }
            title="Title"
          >
            {props.title}
          </header>
        </div>
        <div className="card-footer">
          <div>
            <i className="fa fa-bell-o" title="due-date">
              {" "}
              <span>Oct, 23</span>
            </i>
            <i className="fa fa-comment-o" title="comments">
              {" "}
              <span>9</span>
            </i>
            <i className="fa fa-paperclip" title="attachments">
              {" "}
              <span>3</span>
            </i>
          </div>
          <div className="users">
            <img
              src="https://www.clipartmax.com/png/small/171-1717870_stockvader-predicted-cron-for-may-user-profile-icon-png.png"
              alt="user"
              title={props.user}
            />
          </div>
        </div>
      </article>
    );
  };

  const onUserSelect = (event) => {
    let options = document.getElementById("user").options;
    selectedOptions = [];
    for (let option of options) {
      if (option.selected) {
        selectedOptions.push(option.value);
      }
      // console.log("option", option.selected);
    }
    console.log("onUserSelect: ", selectedOptions);
  };

  const addCard = () => {
    let title = document.getElementById("title").value;
    let desc = document.getElementById("desc").value;
    let userName = document.getElementById("username").value;
    let user = document.getElementById("user").value;

    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let selectedUsers = [];
    selectedOptions.map((userId) => {
      taskData.users.map((user) => {
        if (userId === user.id) {
          selectedUsers.push(user);
        }
      });
    });
    console.log("save users: ", selectedUsers);
    if (title && desc && userName) {
      let newTask = {
        id: new Date().getTime(),
        title: title,
        description: desc,
        userName: userName,
        users: selectedUsers,
        laneId: "ToDo",
      };

      savedTasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(savedTasks));
      updatedData.lanes[0].cards.push(newTask);
      setTaskData(data);
      closeModal();
    }
  };
  const components = {
    LaneHeader: CustomLaneHeader,
    // NewCardForm: NewCard,
    Card: CustomCard,
  };

  const onDataChange = (newData) => {
    updatedData = newData;
  };

  const onCardDelete = (event, cardId, laneId) => {
    event.preventDefault();
    const currentTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = currentTasks.filter((task) => task.id !== cardId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    data.lanes.map((lane, laneIndex) => {
      lane.cards.map((card, cardIndex) => {
        if (card.id === cardId) {
          lane.cards = lane.cards.filter((card) => card.id !== cardId);
        }
      });
    });
    setTaskData({ ...data, status: "deleted" });
  };

  const handleDragEnd = (
    cardId,
    sourceLaneId,
    targetLaneId,
    targetCardPosition,
    cardDetails
  ) => {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.map((task) => {
      if (task.id === cardId) {
        task.laneId = targetLaneId;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
  };

  const onCardClick = (cardId, metadata, laneId) => {};
  return (
    <div>
      <div className="task-info">
        <div className="icons">
          <i class="fa fa-star-o icons star" aria-hidden="true"></i>
          <i class="fa fa-user icons bg-gray" aria-hidden="true">
            {" "}
            <span>6 people</span>
          </i>
          <i class="fa fa-clock-o icons bg-orange" aria-hidden="true">
            {" "}
            <span>2 days left</span>
          </i>
        </div>
        <div className="task-switcher">
          <span>Show my task only</span>
          <i class="fa fa-toggle-on icons star" aria-hidden="true"></i>
        </div>
      </div>
      <Board
        data={data}
        onCardClick={onCardClick}
        editable={true}
        components={components}
        handleDragEnd={handleDragEnd}
        onDataChange={onDataChange}
      />
      <button className="btn btn-round btn-add" id="btn1" onClick={openModal}>
        +
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2
          className="modal-title"
          style={{ color: "#000" }}
          ref={(_subtitle) => (subtitle = _subtitle)}
        >
          Create Task
        </h2>
        <div className="modal-body">
          <form>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter Title"
              className="field"
            />
            <input
              type="text"
              id="desc"
              placeholder="Enter Description"
              className="field"
            />
            <input
              type="text"
              id="username"
              placeholder="Enter User Name"
              className="field"
            />
            <select
              id="user"
              name="user"
              placeholder="Select User"
              className="field multiselect"
              onChange={onUserSelect}
              multiple
            >
              {taskData.users.map((user) => {
                return (
                  <option value={user.id}>
                    {user.firstName + " " + user.lastName}
                  </option>
                );
              })}
            </select>
          </form>
          <div className="text-right">
            <button
              className="btn"
              onClick={addCard}
              type="submit"
              value="Submit"
            >
              Save
            </button>
            <button className="btn btn-default" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TaskBoard;
