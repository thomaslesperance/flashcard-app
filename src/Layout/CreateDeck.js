import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck() {
  const initialFormData = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState({ ...initialFormData });
  const history = useHistory();

  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  async function submitHandler(event) {
    event.preventDefault();
    const response = await createDeck(formData);
    if (Object.keys(response).length) {
      setFormData(initialFormData);
      const deckId = response.id;
      history.push(`/decks/${deckId}`);
    }
  }

  return (
    <>
      <div className="row mb-4">
        <ol class="breadcrumb border" style={{ width: "90%" }}>
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item active">Create Deck</li>
        </ol>
      </div>

      <div className="row">
        <div className="card" style={{ width: "90%" }}>
          <div className="card-body">
            <h2 className="card-title">Create Deck</h2>
            <form onSubmit={submitHandler}>
              <label for="deckName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control mb-2"
                id="deckName"
                name="name"
                placeholder="Name of deck"
                onChange={handleChange}
                value={formData.name}
              ></input>
              <label for="deckDescription" className="form-label">
                Description
              </label>
              <textarea
                type="textarea"
                className="form-control mb-4"
                id="deckDescription"
                name="description"
                placeholder="Description of deck contents"
                onChange={handleChange}
                value={formData.description}
              ></textarea>
              <button
                type="button"
                className="btn btn-secondary mr-3"
                onClick={() => history.push("/")}
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

export default CreateDeck;
