import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function StudyCards({ deck, cards }) {
  const [side, setSide] = useState("front");
  const [cardIndex, setCardIndex] = useState(0);
  const history = useHistory();

  function flipHandler() {
    if (side === "front") setSide("back");
    else if (side === "back") setSide("front");
  }

  function nextHandler() {
    if (cardIndex + 1 === cards.length) {
      const response = window.confirm(
        "Restart cards?\n\nClick 'cancel' to return to home page"
      );
      return response ? setCardIndex(0) : history.push("/");
    } else {
      setCardIndex(cardIndex + 1);
      setSide("front");
    }
  }

  if (cards.length < 3 || !cards.length) {
    return (
      <div className="card " style={{ width: "90%" }}>
        <div className="card-body">
          <p className="card-text">
            You need at least 3 cards to study. There are {cards.length} cards
            in this deck.
          </p>
          <button
            type="button"
            className="btn btn-primary "
            onClick={() => history.push(`/decks/${deck.id}/cards/new`)}
          >
            <i
              className="bi bi bi-file-plus"
              style={{ marginRight: "10px", fontSize: "1.1rem" }}
            ></i>
            Add Cards
          </button>
        </div>
      </div>
    );
  }

  let cardText = cards[cardIndex].front;
  let cardButtons = [
    <button
      type="button"
      className="btn btn-secondary mr-2"
      onClick={flipHandler}
    >
      Flip
    </button>,
  ];

  if (side === "back") {
    cardText = cards[cardIndex].back;
    cardButtons.push(
      <button
        type="button"
        className="btn btn-primary mr-5"
        onClick={nextHandler}
      >
        Next
      </button>
    );
  }

  return (
    <div className="card " style={{ width: "90%" }}>
      <div className="card-body">
        <h5 className="card-title">
          Card {cardIndex + 1} of {cards.length}
        </h5>
        <p className="card-text">{cardText}</p>
        {cardButtons}
      </div>
    </div>
  );
}

export default StudyCards;
