import React, { useState, useEffect } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import { readDeck, deleteDeck } from "../../utils/api";

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
      const response = await deleteDeck(deck.id);
      if (!Object.keys(response).length) {
        history.push("/");
      }
    }
  }

  if (deck.id) {
    return (
      <>
        <div className="row mb-4">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{deck.name}</h5>
                <p className="card-text">{deck.description}</p>
                <button
                  type="button"
                  className="btn btn-secondary mr-2"
                  onClick={() => history.push(`${path}/edit`)}
                >
                  <i
                    className="bi bi-pencil"
                    style={{ marginRight: "10px", fontSize: "1.1rem" }}
                  ></i>
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-primary mr-2"
                  onClick={() => history.push(`${path}/study`)}
                >
                  <i
                    className="bi bi bi-book"
                    style={{ marginRight: "10px", fontSize: "1.1rem" }}
                  ></i>
                  Study
                </button>
                <button
                  type="button"
                  className="btn btn-primary mr-5"
                  onClick={() => history.push(`${path}/cards/new`)}
                >
                  <i
                    className="bi bi bi-file-plus"
                    style={{ marginRight: "10px", fontSize: "1.1rem" }}
                  ></i>
                  Add Cards
                </button>
                <button
                  type="button"
                  className="btn btn-danger ml-md-5"
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
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header border-0">
                <h5>Cards</h5>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">A deck card</li>
                <li class="list-group-item">A second deck card</li>
                <li class="list-group-item">A third deck card</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <p>Loading deck...</p>;
}

export default Deck;

// {
//   "decks": [
//     {
//       "id": 1,
//       "name": "...",
//       "description": "..."
//     }
//   ],
//   "cards": [
//     {
//       "id": 1,
//       "front": "...",
//       "back": "...",
//       "deckId": 1
//     }
//   ]
// }
