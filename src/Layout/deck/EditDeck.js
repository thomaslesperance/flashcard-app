import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { updateDeck } from "../../utils/api/index";

function EditDeck({ deck }) {
  const history = useHistory();
  const initialFormData = { name: deck.name, description: deck.description };
  const [formData, setFormData] = useState({ ...initialFormData });

  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const updatedDeck = { id: deck.id, ...formData };
    const response = await updateDeck(updatedDeck);
    if (Object.keys(response).length) {
      setFormData(initialFormData);
      history.push(`/`);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label for="name" className="form-label">
          Name
        </label>
        <input
          id="name"
          name="name"
          className="form-control"
          onChange={handleChange}
          value={formData.name}
        ></input>
      </div>
      <div className="mb-2">
        <label for="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          onChange={handleChange}
          value={formData.description}
        ></textarea>
      </div>
      <button
        type="button"
        className="btn btn-secondary mr-2"
        onClick={() => history.push(`/decks/${deck.id}`)}
      >
        Cancel
      </button>
      <button type="submit" className="btn btn-primary mr-2">
        Submit
      </button>
    </form>
  );
}

export default EditDeck;
