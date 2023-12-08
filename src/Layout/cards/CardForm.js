import React from "react";
import { useHistory } from "react-router-dom";

// edit and card props used for the edit card feature; not used for add card feature; add uses placeholder text, edit gives editable current data for card
function CardForm({
  formData,
  handleChange,
  handleSubmit,
  deck,
  edit = false,
  card = {},
}) {
  const history = useHistory();

  return (
    <div className="row">
      <div className="card" style={{ width: "90%" }}>
        <div className="card-body">
          <h2 className="card-title">
            {edit ? `Edit Card` : `${deck.name}: Add Card`}
          </h2>
          <form onSubmit={handleSubmit}>
            <label for="front" className="form-label">
              Front
            </label>
            <textarea
              type="textarea"
              className="form-control mb-2"
              id="front"
              name="front"
              placeholder={edit ? null : "Front side of card"}
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
              placeholder={edit ? null : "Back side of card"}
              onChange={handleChange}
              value={formData.back}
            ></textarea>
            <button
              type="button"
              className="btn btn-secondary mr-3"
              onClick={() => history.push(`/decks/${deck.id}`)}
            >
              {edit ? "Cancel" : "Done"}
            </button>
            <button type="submit" className="btn btn-primary">
              {edit ? "Submit" : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CardForm;
