/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";
import "./GameAddDialog.scss";
import * as GameService from "../../services/GameService";
import { ObjectID } from "bson";

const GameAddDialog = ({ open, onClose, onSuccess }) => {
  const [gameName, setGameName] = useState();
  const [description, setDescription] = useState();
  const [companyName, setCompanyName] = useState();
  const [price, setPrice] = useState();

  const onSubmit = () => {
    GameService.createGame({
      id: new ObjectID(),
      name: gameName,
      description: description,
      company: companyName,
      price: new Number(price),
    }).then(() => {
      onSuccess("Success");
    });
  };

  const handleGameName = (e) => {
    setGameName(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleCompanyName = (e) => {
    setCompanyName(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="user-action-dialog"
    >
      <DialogContent>
        <form className="action-self-form">
          <div className="d-flex flex-wrap">
            <div className="mw-100 mx-2 mt-2">
              <TextField
                id="name"
                label="Game name"
                placeholder="Game name"
                onChange={handleGameName}
                required
              />
            </div>
            <div className="mw-100 mx-2">
              <TextField
                id="description"
                label="Description"
                placeholder="Description"
                onChange={handleDescription}
                required
              />
            </div>
            <div className="mw-100 mx-2">
              <TextField
                id="company"
                label="Company name"
                placeholder="Company name"
                onChange={handleCompanyName}
                required
              />
              <TextField
                id="price"
                label="Price"
                placeholder="Price"
                onChange={handlePrice}
                required
              />
            </div>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          className="text-initial"
          size="small"
          onClick={onClose}
          style={{ color: "#00cc66" }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          className="text-initial"
          size="small"
          style={{ color: "#00cc66" }}
          onClick={onSubmit}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameAddDialog;
