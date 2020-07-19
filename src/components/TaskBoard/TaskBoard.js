import React, { useState } from "react";
import Modal from "react-modal";
import Board from "react-trello";
import "./taskboard.css";
import { data } from "../../data";

// Modal.setAppElement("#root");

let updatedData = {};

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
  function openModal() {
    setIsOpen(true);
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
          {/* <div
            className="delete-card"
            title="Delete"
            onClick={() => onCardDelete(props.id, props.laneId)}
          >
            x
          </div> */}
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

  const addCard = () => {
    let title = document.getElementById("title").value;
    let desc = document.getElementById("desc").value;
    let userName = document.getElementById("username").value;

    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (title && desc && userName) {
      let newTask = {
        id: new Date().getTime(),
        title: title,
        description: desc,
        user: userName,
        laneId: "ToDo",
      };

      savedTasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(savedTasks));
      updatedData.lanes[0].cards.push(newTask);

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

  const onCardDelete = (cardId, laneId) => {
    console.log("onCardDelete", { cardId, laneId });
    let currentTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let updatedTasks = currentTasks.filter((task) => task.id !== cardId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    // data.lanes.map((lane, laneIndex) => {
    //   lane.cards.map((card, cardIndex) => {
    //     if (card.id === cardId) {
    //       data.lanes[laneIndex].cards = data.lanes[laneIndex].cards.filter(
    //         (card) => card.id !== cardId
    //       );
    //     }
    //   });
    // });
    console.log("updatedTasks: ", { updatedTasks, currentTasks, data });
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
    <div className="App">
      <Board
        data={data}
        onCardClick={onCardClick}
        editable={true}
        components={components}
        handleDragEnd={handleDragEnd}
        onDataChange={onDataChange}
        onCardDelete={onCardDelete}
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