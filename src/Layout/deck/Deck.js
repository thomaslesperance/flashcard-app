import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { readDeck, deleteDeck } from "../../utils/api";
import CardDisplay from "./CardDisplay";
import StudyCards from "./StudyCards";

//

function Deck() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();
  const { path, url } = useRouteMatch();

  //
  //

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

  //
  //

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

  //
  //
  //

  if (deck.id) {
    return (
      <>
        <Switch>
          <Route exact path={path}>
            <div className="row mb-4">
              <ol class="breadcrumb border" style={{ width: "90%" }}>
                <li class="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li class="breadcrumb-item active">{deck.name}</li>
              </ol>
            </div>

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
                        onClick={() => history.push(`${url}/edit`)}
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
                        onClick={() => history.push(`${url}/study`)}
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
                        onClick={() => history.push(`${url}/cards/new`)}
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
          </Route>

          <Route path={`${path}/study`}>
            <div className="row mb-4">
              <ol class="breadcrumb border" style={{ width: "90%" }}>
                <li class="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li class="breadcrumb-item">
                  <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                </li>
                <li class="breadcrumb-item active">Study</li>
              </ol>
            </div>
            <div className="row mb-2">
              <h2>Study: {deck.name}</h2>
              <StudyCards cards={deck.cards} />
            </div>
          </Route>
        </Switch>
      </>
    );
  }

  return <p>Loading deck...</p>;
}

export default Deck;
