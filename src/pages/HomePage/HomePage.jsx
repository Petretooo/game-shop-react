import "./HomePage.scss";
import { Button } from "@material-ui/core";
import * as LoginService from "../../services/LoginService";
const HomePage = () => {
  const handleLogout = () => {
    LoginService.logout();
    window.location.reload(false);
  };

  return (
    <div>
      <form method="POST">
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
            {LoginService.getLoggedUser() ? (
              <Button
                class="navbar__menu--links"
                id="button"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <a href="/login" class="navbar__menu--links" id="button">
                  Sign In
                </a>
                <a href="/registration" class="navbar__menu--links" id="button">
                  Sign Up
                </a>
              </>
            )}
          </div>
        </nav>

        <div class="hero">
          <div class="hero__container">
            <div class="hero__container--left">
              <h1>Welcome to Gametopia</h1>
              <p>
                Sign up now to join this incredible site created by
                <p style={{ color: "#00cc66" }}>Peter Angelov</p>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HomePage;
