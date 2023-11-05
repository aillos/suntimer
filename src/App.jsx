// App.js
import './App.css';
import PropTypes from "prop-types";

function App({ imageSrc }) {
    return (
        <>
            <div className="window">
                {imageSrc && <img src={imageSrc} alt="Window" />}
            </div>
        </>
    );
}

App.propTypes = {
    imageSrc: PropTypes.string // This defines the imageSrc prop as a string
};

export default App;
