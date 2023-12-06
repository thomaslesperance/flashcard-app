import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createCard } from "../../utils/api";

function AddCard({ deck }) {
  const history = useHistory();
  const initialFormData = { front: "", back: "" };
  const [formData, setFormData] = useState(initialFormData);

  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await createCard(deck.id, formData);
    if (Object.keys(response).length) {
      setFormData(initialFormData);
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
          <li className="breadcrumb-item active">Add Card</li>
        </ol>
      </div>

      <div className="row">
        <div className="card" style={{ width: "90%" }}>
          <div className="card-body">
            <h2 className="card-title">{deck.name}: Add Card</h2>
            <form onSubmit={handleSubmit}>
              <label for="front" className="form-label">
                Front
              </label>
              <textarea
                type="textarea"
                className="form-control mb-2"
                id="front"
                name="front"
                placeholder="Front side of card"
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
                placeholder="Back side of card"
                onChange={handleChange}
                value={formData.back}
              ></textarea>
              <button
                type="button"
                className="btn btn-secondary mr-3"
                onClick={() => history.push(`/decks/${deck.id}`)}
              >
                Done
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCard;
