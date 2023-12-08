import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

function DeckDisplay({ deck, decks, setDecks }) {
  const history = useHistory();
  const id = deck.id;

  // If confirmed, requests delete from API. Upon positive resposne, makes matching change in loaded deck
  async function handleDeleteDeck() {
    const response = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );
    if (response) {
      const response = await deleteDeck(id);
      if (!Object.keys(response).length) {
        setDecks(decks.filter((deck) => deck.id !== id));
      }
    }
  }

  return (
    <div className="card my-2" style={{ width: "90%" }}>
      <div className="card-header text-body-secondary">
        {deck.cards.length} cards
      </div>
      <div className="card-body">
        <h5 className="card-title">{deck.name}</h5>
        <p className="card-text">{deck.description}</p>
        <div className="row">
          <div className="col">
            <button
              type="button"
              className="btn btn-secondary mr-5"
              onClick={() => history.push(`/decks/${id}`)}
            >
              <i
                className="bi bi-eye"
                style={{ marginRight: "10px", fontSize: "1.2rem" }}
              ></i>
              View
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => history.push(`/decks/${id}/study`)}
            >
              <i
                className="bi bi bi-book"
                style={{ marginRight: "10px", fontSize: "1.2rem" }}
              ></i>
              Study
            </button>
          </div>
          <div className="col-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteDeck}
            >
              <i className="bi bi-trash3" style={{ fontSize: "1.2rem" }}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeckDisplay;
