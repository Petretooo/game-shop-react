import { Redirect } from "react-router";
import * as LoginService from "../../../services/LoginService";

export default function AuthenticatedRoute(props) {
    const user = LoginService.getLoggedUser();

    // requires admin role
    if (props.admin && user.isAdmin) {
        return <props.component {...props} />;
    }

    // no admin required
    if (!props.admin && user) {
        // <UsersList users={users} />
        return <props.component {...props} />;
    }

    return <Redirect to='/login' />;
}