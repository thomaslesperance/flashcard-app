import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../../utils/api";

function CardDisplay({ card, deck, setDeck }) {
  const history = useHistory();
  const { url } = useRouteMatch();

  // If confirmed, calls API for delete, checks response format. On positive response, filters cards property of state and updates state
  async function handleDeleteCard() {
    const response = window.confirm(
      "Delete this card?\n\nYou will not be able to recover it."
    );

    if (response) {
      const responseFromAPI = await deleteCard(card.id);
      if (!Object.keys(responseFromAPI).length) {
        const cards = deck.cards.filter((cd) => cd.id !== card.id);
        const newDeck = { ...deck, cards };
        setDeck(newDeck);
      }
    }
  }

  return (
    <li className="list-group-item">
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
          onClick={() => history.push(`${url}/cards/${card.id}/edit`)}
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
