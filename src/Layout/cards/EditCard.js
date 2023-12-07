import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, updateCard } from "../../utils/api";

function EditCard({ deck }) {
  const history = useHistory();
  const { cardId } = useParams();
  const [card, setCard] = useState({});
  const initialFormData = { front: card.front, back: card.back };
  const [formData, setFormData] = useState({ ...initialFormData });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function loadCard() {
      setCard({});
      const cardFromAPI = await readCard(cardId, signal);
      setCard(cardFromAPI);
      setFormData({ front: cardFromAPI.front, back: cardFromAPI.back });
    }

    loadCard();

    return () => abortController.abort();
  }, [cardId]);

  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const updatedCard = {
      id: card.id,
      deckId: deck.id,
      ...formData,
    };
    const response = await updateCard(updatedCard);
    if (Object.keys(response).length) {
      setFormData({});
      history.push(`/decks/${deck.id}`);
    }
  }

  return (
    <>
      <div className="row mb-4">
        <ol className="breadcrumb border" style={{ width: "90%" }}>
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Edit Card {card.id}</li>
        </ol>
      </div>

      <div className="row">
        <div className="card" style={{ width: "90%" }}>
          <div className="card-body">
            <h2 className="card-title">Edit Card</h2>
            <form onSubmit={handleSubmit}>
              <label for="front" className="form-label">
                Front
              </label>
              <textarea
                type="textarea"
                className="form-control mb-2"
                id="front"
                name="front"
                onChange={handleChange}
                value={formData.front}
              ></textarea>
              <label for="back" className="form-label">
                Back
              </label>
              <textarea
                type="textarea"
                className="form-control mb-4"
                id="back"
                name="back"
                onChange={handleChange}
                value={formData.back}
              ></textarea>
              <button
                type="button"
                className="btn btn-secondary mr-3"
                onClick={() => history.push(`/decks/${deck.id}`)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditCard;
