import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import { readDeck, readCard } from "../../utils/api/index";
import EditCard from "./EditCard";
import AddCard from "./AddCard";

function Cards() {
  const [deck, setDeck] = useState({});
  const { path } = useRouteMatch();
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function loadDeck() {
      setDeck({});
      const deckFromAPI = await readDeck(deckId, signal);
      setDeck(deckFromAPI);
    }

    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  return (
    <Switch>
      <Route path={`${path}/:cardId/edit`}>
        <EditCard deck={deck} />
      </Route>
      <Route path={`${path}/new`}>
        <AddCard deck={deck} />
      </Route>
    </Switch>
  );
}

export default Cards;
