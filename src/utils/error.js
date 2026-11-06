import { useRouteError } from "react-router-dom";

const Error = () => {
    const error = useRouteError()
    console.log(error);
    return (
        <>
            <h1>Something Went Wrong. Page Not Found.</h1>
            <p>StatusCode : {error.status}, Message :{error.statusText}</p>
        </>
    );
};

export default Error;