import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../../utils/api";

function CardDisplay({ card, deck, setDeck }) {
  const history = useHistory();
  const { path } = useRouteMatch();

  async function handleDeleteCard() {
    const response = await deleteCard(card.id);
    if (!Object.keys(response).length) {
      const cards = deck.cards.filter((cd) => cd.id !== card.id);
      const newDeck = { ...deck, cards };
      setDeck(newDeck);
    }
  }

  return (
    <li class="list-group-item">
      <div className="row">
        <div className="col">{card.front}</div>
        <div className="col">
          <p>{card.back}</p>
        </div>
      </div>
      <div className="row justify-content-end mr-3">
        <button
          type="button"
          className="btn btn-secondary mr-4"
          onClick={() => history.push(`${path}/cards/${card.id}/edit`)}
        >
          <i
            className="bi bi-pencil"
            style={{ marginRight: "10px", fontSize: "1.1rem" }}
          ></i>
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDeleteCard}
        >
          <i className="bi bi-trash3" style={{ fontSize: "1.2rem" }}></i>
        </button>
      </div>
    </li>
  );
}

export default CardDisplay;
