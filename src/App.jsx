import '/src/index.css'
import ExchangeCalculator from "./components/exchangeCalculator/ExchangeCalculator.jsx";
import eocLogo from "/images/eoc-logo.png"

function App() {
    return (
        <>
            <div className="wrapper">
                <div className="wrapper-content">
                    <img id="landpage-icon" src={eocLogo} alt="EOC Logo" />
                    <ExchangeCalculator />
                </div>
            </div>
        </>
    )
}

export default App
