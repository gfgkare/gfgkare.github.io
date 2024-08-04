import { Link, useLocation } from "react-router-dom";


export default function CLink({ to, className, children, ...rest } ) {

    const location = useLocation();

    return (
        <Link to={to} state={{from: location.pathname}} className={className} {...rest} >
            {children}
        </Link>
    );
}