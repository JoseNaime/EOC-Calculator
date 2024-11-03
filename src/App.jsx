import '/src/index.css'
import ExchangeCalculator from "./components/exchangeCalculator/ExchangeCalculator.jsx";
import eocLogo from "/images/eoc-logo.png"
import {useState} from "react";
import TimeCalculator from "./components/timeCalculator/TimeCalculator.jsx";

function App() {
    const [selectedCalculator, setSelectedCalculator] = useState("exchange")

    const renderCalculator = () => {
        switch (selectedCalculator) {
            case 'exchange':
                return <ExchangeCalculator />;
            case 'time':
                return <TimeCalculator />;
            default:
                return <div>Select a calculator</div>; // Default fallback if none match
        }
    };

    return (
        <>
            <div className="wrapper">
                <nav id="navbar">
                    <img id="landpage-icon" src={eocLogo} alt="EOC Logo" />
                    <ul>
                        <li className={selectedCalculator === "exchange" ? "active" : ""}
                            onClick={() => setSelectedCalculator("exchange")}><p>Exchange</p></li>
                        <li className={selectedCalculator === "time" ? "active" : ""}
                            onClick={() => setSelectedCalculator("time")}><p>Time</p></li>
                    </ul>
                </nav>
                <div className="wrapper-content">
                    {renderCalculator()}
                </div>
            </div>
        </>
    )
}

export default App
