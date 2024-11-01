import './Calculator.css';
import {useState} from 'react';
import goldImage from '/images/gold.png';
import silverImage from '/images/silver.png';
import copperImage from '/images/cooper.png';

const Calculator = () => {
    const ORE = {
        GOLD: 0,
        SILVER: 1,
        COPPER: 2
    };

    const oreNames = ['Gold', 'Silver', 'Copper'];
    const oreImages = [goldImage, silverImage, copperImage];

    const rates = [
        [1, 1.91, 2.64],
        [0.435, 1, 1.21],
        [0.33, 0.59, 1]
    ];

    const [selectedOre, setSelectedOre] = useState(ORE.GOLD);
    const [amount, setAmount] = useState(0);
    const [convertedAmounts, setConvertedAmounts] = useState([0, 0, 0]);

    const handleOreChange = (e) => {
        const oreIndex = parseInt(e.target.value, 10);
        setSelectedOre(oreIndex);
        calculateConversions(oreIndex, amount);
    };

    const handleAmountChange = (e) => {
        const newAmount = parseFloat(e.target.value) || 0;
        setAmount(newAmount);
        calculateConversions(selectedOre, newAmount);
    };

    const calculateConversions = (oreIndex, amount) => {
        const conversions = rates[oreIndex].map((rate) => rate * amount);
        setConvertedAmounts(conversions);
    };

    return (
        <>
            <div id="ore-picker">
                <label>Select Ore to Trade:</label>
                <div className="ore-options">
                    {oreNames.map((oreName, index) => (
                        <label key={index} className="ore-option">
                            <div>
                                <img src={oreImages[index]} alt={`${oreName}`} className="resource-icon" />
                                {oreName}
                            </div>
                            <input
                                type="radio"
                                name="ore"
                                value={index}
                                checked={selectedOre === index}
                                onChange={handleOreChange}
                            />
                        </label>
                    ))}
                </div>
            </div>
            <div id="amount-input">
                <label htmlFor="amount-input">Amount:</label>
                <input
                    id="amount-input"
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    min="0"
                    step="any"
                />
            </div>
            <table>
                <thead>
                <tr>
                    <th>
                        <img src={oreImages[0]} alt={`${oreNames[0]}`} className="resource-icon" />
                        <p>{oreNames[0]}</p></th>
                    <th>
                        <img src={oreImages[1]} alt={`${oreNames[1]}`} className="resource-icon" />
                        <p>{oreNames[1]}</p></th>
                    <th>
                        <img src={oreImages[2]} alt={`${oreNames[2]}`} className="resource-icon" />
                        <p>{oreNames[2]}</p></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    {convertedAmounts.map((convAmount, index) => (
                        <td key={index + "_conv"}>
                            {Math.floor(convAmount)}
                        </td>
                    ))}
                </tr>
                <tr id="rates-row">
                    {convertedAmounts.map((convAmount, index) => (
                        <td key={index + "_rates"}>
                            {rates[selectedOre][index]}
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
        </>
    )
        ;
};

export default Calculator;