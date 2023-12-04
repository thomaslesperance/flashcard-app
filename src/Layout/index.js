import React from "react";
import { Switch, Route } from "react-router-dom";
//
import Header from "./Header";
import BreadCrumbNav from "./BreadCrumbNav";
import DeckList from "./deck-list/DeckList";
import Deck from "./deck/Deck";
import CreateDeck from "./deck/CreateDeck";
import NotFound from "./NotFound";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <BreadCrumbNav />
        </div>
        <Switch>
          <Route exact path="/">
            <DeckList />
          </Route>
          <Route path="/decks/:deckId">
            <Deck />
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
