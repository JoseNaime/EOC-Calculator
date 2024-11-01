import './App.css'
import Calculator from "./components/calculator/Calculator.jsx";
import eocLogo from "/banner-logo.png"

function App() {
    return (
        <>
            <div className="wrapper">
                <div>
                <img id="landpage-icon" src={eocLogo} />
                <h1>Exchange Calculator</h1>
                </div>
                <div>
                    <aside>This is an unofficial calculator designed for players of Empire On Chain to estimate and plan their in-game trading strategies. This tool is not affiliated with, endorsed by, or in any way officially connected to Empire On Chain or its developers at <a href="https://empireonchain.com/" target="_blank">empireonchain.com</a>. The resource exchange rates provided are approximate and intended for estimation purposes only. Actual in-game values may vary. For official game information and accurate exchange rates, please refer to the official Empire On Chain website.</aside>
                </div>
                <Calculator />
            </div>
        </>
    )
}

export default App
