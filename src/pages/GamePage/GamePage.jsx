import "./GamePage.scss";
import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import * as GameService from "../../services/GameService";
import * as UserService from "../../services/UserService";
import GameUpdateDialog from "../../components/GameUpdateDialog/GameUpdateDialog";
import GameAddDialog from "../../components/GameAddDialog/GameAddDialog";
import * as LoginService from "../../services/LoginService";
import * as BillingAccout from "../../services/BillingAccount";

const GamePage = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [game, setGame] = useState({});
  const [games, setGames] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState();
  const [open, setOpen] = useState(false);
  const [deposit, setDeposit] = useState(0);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    GameService.getAllGames().then((data) => {
      setGames(data);
    });
  }, [games]);

  useEffect(() => {
    async function fetchData() {
      const user = await LoginService.getLoggedUser();
      setCurrentUser(user);
      const billing = await BillingAccout.getBillingAccount(user.id);
      setDeposit(billing.deposit);
    }
    fetchData();
  }, [deposit]);

  const handleDelete = (value) => {
    GameService.deleteGame(value);
  };

  const handleOpenUpdateModal = (row) => {
    setGame(row);
    setOpenUpdate(true);
  };

  const handleSuccessUpdate = (msg) => {
    setOpenUpdate(false);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdate(false);
  };

  const handleOpenAddModal = () => {
    setOpenAdd(true);
  };

  const handleSuccessAdd = (msg) => {
    setOpenAdd(false);
  };

  const handleCloseAddModal = () => {
    setOpenAdd(false);
  };

  const handleClose = (e) => {
    setSelectedGame(null);
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (deposit >= selectedGame.price) {
      const user = await UserService.getUser(currentUser.id);
      user.games.push(selectedGame);
      UserService.updateUser(user);
      await BillingAccout.updateBillingAccount({
        id: user.id,
        deposit: deposit - selectedGame.price,
      });
      setSelectedGame(null);
      setDeposit(deposit - selectedGame.price);
    }
  };

  const handleBuy = async (game) => {
    setSelectedGame(game);
    setOpen(true);
  };

  return (
    <div>
      <nav class="navbar">
        <a href="/" class="navbar__logo">
          Game Shop :P
        </a>
        <div class="navbar__bars">
          <i class="fas fa-bars"></i>
        </div>
        <div class="navbar__menu">
          <a href="/" class="navbar__menu--links">
            Home
          </a>
          <a href="/games" class="navbar__menu--links">
            Games
          </a>
          <a href="/profile" class="navbar__menu--links">
            Profile
          </a>
          {LoginService.getLoggedUser() && (
            <Button
              size={"small"}
              class="navbar__menu--links"
              onClick={() => handleOpenAddModal()}
            >
              Add
            </Button>
          )}
        </div>
      </nav>
      {LoginService.getLoggedUser() && (
        <TableContainer component={Paper}>
          <Table className="successcard-table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Game Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {games.map((game) => (
                <TableRow key={game.id}>
                  <TableCell>{game.name}</TableCell>
                  <TableCell>{game.description}</TableCell>
                  <TableCell>{game.company}</TableCell>
                  <TableCell>{game.price}</TableCell>
                  <div>
                    <TableCell>
                      {
                        <Button
                          size={"small"}
                          variant="contained"
                          className="text-initial"
                          style={{ color: "#00cc66" }}
                          onClick={() => handleOpenUpdateModal(game)}
                        >
                          Edit
                        </Button>
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <Button
                          size={"small"}
                          variant="contained"
                          className="text-initial"
                          style={{ color: "#00cc66" }}
                          value={game.id}
                          onClick={() => handleDelete(game.id)}
                        >
                          Delete
                        </Button>
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <Button
                          size={"small"}
                          variant="contained"
                          className="text-initial"
                          style={{ color: "#00cc66" }}
                          onClick={() => handleBuy(game)}
                        >
                          Buy
                        </Button>
                      }
                    </TableCell>
                  </div>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div>
        {selectedGame && (
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogContent>
              <h5>Are you sure you want to buy this game?</h5>
            </DialogContent>
            <DialogActions className="dialog-button">
              <Button
                onClick={handleClose}
                variant="contained"
                style={{ color: "#00cc66" }}
              >
                No
              </Button>
              <Button
                onClick={handleSubmit}
                n
                variant="contained"
                style={{ color: "#00cc66" }}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
      <GameAddDialog
        onClose={handleCloseAddModal}
        onSuccess={handleSuccessAdd}
        open={openAdd}
      />
      <GameUpdateDialog
        onClose={handleCloseUpdateModal}
        onSuccess={handleSuccessUpdate}
        open={openUpdate}
        game={game}
      />
    </div>
  );
};

export default GamePage;
