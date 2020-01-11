import React from "react";

export default props => {
  return (
    <div>
      <h1 className="display-4">About Contact Manager</h1>
      <p className="lead">Simple app to manage contacts</p>
      {props.match.params.id !== undefined && (
        <p className="text-primary">Your id is {props.match.params.id}</p>
      )}
      <p className="text-secondary">Version 1.0</p>
    </div>
  );
};
