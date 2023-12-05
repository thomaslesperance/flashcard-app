import React, { useState, useEffect } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import { readDeck, deleteDeck } from "../../utils/api";
import CardDisplay from "./CardDisplay";

function Deck() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();
  const { path } = useRouteMatch();

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const deckFromAPI = await readDeck(deckId);
        setDeck(deckFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted...");
        } else {
          throw error;
        }
      }
    }

    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  async function handleDeleteDeck() {
    const response = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );
    if (response) {
      const deleteResponse = await deleteDeck(deck.id);
      if (!Object.keys(deleteResponse).length) {
        history.push("/");
      }
    }
  }

  if (deck.id) {
    return (
      <>
        <div className="row mb-4">
          <div className="card " style={{ width: "90%" }}>
            <div className="card-body">
              <h5 className="card-title">{deck.name}</h5>
              <p className="card-text">{deck.description}</p>
              <div className="row justify-content-start">
                <div className="col-2 mr-1">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => history.push(`${path}/edit`)}
                  >
                    <i
                      className="bi bi-pencil"
                      style={{ marginRight: "10px", fontSize: "1.1rem" }}
                    ></i>
                    Edit
                  </button>
                </div>
                <div className="col-2 mr-1">
                  <button
                    type="button"
                    className="btn btn-primary "
                    onClick={() => history.push(`${path}/study`)}
                  >
                    <i
                      className="bi bi bi-book"
                      style={{ marginRight: "10px", fontSize: "1.1rem" }}
                    ></i>
                    Study
                  </button>
                </div>
                <div className="col-2 mr-1">
                  <button
                    type="button"
                    className="btn btn-primary "
                    onClick={() => history.push(`${path}/cards/new`)}
                  >
                    <i
                      className="bi bi bi-file-plus"
                      style={{ marginRight: "10px", fontSize: "1.1rem" }}
                    ></i>
                    Add Cards
                  </button>
                </div>
                <div className="col-2 offset-3">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDeleteDeck}
                  >
                    <i
                      className="bi bi-trash3"
                      style={{ fontSize: "1.1rem" }}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="card" style={{ width: "90%" }}>
            <div className="card-header border-0">
              <h5>Cards</h5>
            </div>
            <ul class="list-group list-group-flush">
              {deck.cards.map((card) => (
                <CardDisplay card={card} deck={deck} setDeck={setDeck} />
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }

  return <p>Loading deck...</p>;
}

export default Deck;
