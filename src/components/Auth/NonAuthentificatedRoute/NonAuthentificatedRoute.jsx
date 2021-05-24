import { Redirect } from "react-router";
import * as LoginService from "../../../services/LoginService";


export default function NonAuthenticatedRoute(props) {
    const user = LoginService.getLoggedUser();

    if (!user) {
        return <props.component {...props} />;
    }

    return <Redirect to="/" />;
}