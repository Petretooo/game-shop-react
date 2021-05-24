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
  Checkbox,
} from "@material-ui/core";
import "./GameUpdateDialog.scss";
import * as GameService from "../../services/GameService";

const GameUpdateDialog = ({ open, onClose, onSuccess, game }) => {
  const [gameName, setGameName] = useState(game.name);
  const [description, setDescription] = useState(game.description);
  const [companyName, setCompanyName] = useState(game.comapany);
  const [price, setPrice] = useState(game.price);

  const onSubmit = () => {
    GameService.update(game.id, {
      name: gameName === undefined ? game.name : gameName,
      description: description === undefined ? game.description : description,
      company: companyName === undefined ? game.company : companyName,
      price: price === undefined ? game.price : new Number(price),
    }).then(() => {
      onSuccess("Success");
    });
  };

  const checkData = () => {
    if (gameName === undefined) {
      setGameName(game.name);
    }
    if (description === undefined) {
      setDescription(game.description);
    }
    if (companyName === undefined) {
      setCompanyName(game.comapany);
    }
    if (price === undefined) {
      setPrice(game.price);
    }
  };

  const handleGameName = (e) => {
    setGameName(e.target.value);
    checkData();
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
    checkData();
  };
  const handleCompanyName = (e) => {
    setCompanyName(e.target.value);
    checkData();
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
    checkData();
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
                onChange={handleGameName}
                defaultValue={game.name}
                required
              />
            </div>
            <div className="mw-100 mx-2">
              <TextField
                id="description"
                label="Description"
                onChange={handleDescription}
                defaultValue={game.description}
                required
              />
            </div>
            <div className="mw-100 mx-2">
              <TextField
                id="company"
                label="Company name"
                name="company"
                onChange={handleCompanyName}
                defaultValue={game.company}
                required
              />
              <TextField
                id="price"
                label="Price"
                name="price"
                onChange={handlePrice}
                defaultValue={game.price}
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
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameUpdateDialog;
