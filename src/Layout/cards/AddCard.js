import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createCard } from "../../utils/api";
import CardForm from "./CardForm";

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

      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        deck={deck}
      />
    </>
  );
}

export default AddCard;
