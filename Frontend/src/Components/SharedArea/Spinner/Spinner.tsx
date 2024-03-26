import LoadingSpinner from "../../../Assets/Images/LoadingSpinner.gif"

// Loading spinner

function Spinner(): JSX.Element {
    
    return (

        <div className="Spinner">

            <img src={LoadingSpinner} />

        </div>

    );
}

export default Spinner;
