import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//
import { listDecks } from "../../utils/api";
import DeckDisplay from "./DeckDisplay";

function DeckList() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  // Calls API once for complete list of decks
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function loadDecks() {
      try {
        const decksFromAPI = await listDecks(signal);
        setDecks(decksFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }

    loadDecks();

    return () => abortController.abort();
  }, []);

  const deckList = decks.map((deck) => (
    <DeckDisplay deck={deck} decks={decks} setDecks={setDecks} />
  ));

  return (
    <>
      <div className="row mb-2">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => history.push("/decks/new")}
        >
          <i
            className="bi bi-plus-square-dotted"
            style={{ marginRight: "10px", fontSize: "1.2rem" }}
          ></i>
          Create Deck
        </button>
      </div>
      <div className="row">{deckList}</div>
    </>
  );
}

export default DeckList;
