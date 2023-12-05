import React from "react";

function CreateDeck() {
  const submitHandler = () => {};

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
              <label for="deckName" class="form-label">
                Name
              </label>
              <input type="text" class="form-control" id="deckName"></input>
              <label for="deckDescription" class="form-label">
                Description
              </label>
              <input
                type="textarea"
                class="form-control"
                id="deckDescription"
              ></input>
              <button
                type="button"
                class="btn btn-secondary"
                onClick={() => {}}
              >
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">
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
