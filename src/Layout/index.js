import React from "react";
import { Switch, Route } from "react-router-dom";
//
import Header from "./Header";
import DeckList from "./deck-list/DeckList";
import Deck from "./deck/Deck";
import Cards from "./cards/Cards";
import CreateDeck from "./deck/CreateDeck";
import NotFound from "./NotFound";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DeckList />
          </Route>
          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/decks/:deckId/cards">
            <Cards />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
