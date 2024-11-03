import '/src/index.css'

import ExchangeCalculatorForm from "./ExchangeCalculatorForm.jsx";
import {useState} from "react";

const ExchangeCalculator = () => {
    const [formType, setFormType] = useState(0); // Default to "Resource to Coin Conversion" mode
    const [amount, setAmount] = useState(0); // Total amount or requirement
    const [targetAmounts, setTargetAmounts] = useState([0, 0, 0]); // Individual target amounts for each ore
    const [convertedAmounts, setConvertedAmounts] = useState([0, 0, 0]);

    const handleFormTypeChange = (e) => {
        // Change the form type
        const newFormType = parseInt(e.target.value, 10);
        setFormType(newFormType);

        // Reset amount and targetAmounts when form type changes
        setAmount(0);
        setTargetAmounts([0, 0, 0]);
        setConvertedAmounts([0, 0, 0]);
    };

    return (
        <>
            <h1>Exchange Calculator</h1>
            <div id="info">
                <aside>This is an unofficial calculator designed for players of Empire On Chain to estimate and
                       plan
                       their in-game trading strategies. This tool is not affiliated with, endorsed by, or in
                       any
                       way officially connected to Empire On Chain or its developers
                       at <a href="https://empireonchain.com/" target="_blank">empireonchain.com</a>. The
                       resource
                       exchange rates provided are approximate and intended for estimation purposes only. Actual
                       in-game values may vary. For official game information and accurate exchange rates,
                       please
                       refer to the official Empire On Chain website.
                </aside>
                <div id="select-cal-type">
                    <label htmlFor="form-type-select"><b>Choose Calculator Mode:</b></label>
                    <select id="form-type-select" value={formType} onChange={handleFormTypeChange}>
                        <option value={0}>Resource to Coin Conversion</option>
                        <option value={1}>Target Resource Calculation</option>
                    </select>
                </div>

                <ExchangeCalculatorForm
                    formType={formType}
                    amount={amount}
                    setAmount={setAmount}
                    targetAmounts={targetAmounts}
                    setTargetAmounts={setTargetAmounts}
                    convertedAmounts={convertedAmounts}
                    setConvertedAmounts={setConvertedAmounts}
                />
            </div>

        </>
    );
};

export default ExchangeCalculator;