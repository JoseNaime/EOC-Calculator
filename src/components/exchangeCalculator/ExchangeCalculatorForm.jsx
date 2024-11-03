import '/src/index.css';
import { useState } from 'react';
import goldImage from "/images/gold.png";
import silverImage from "/images/silver.png";
import copperImage from "/images/copper.png";
import PropTypes from "prop-types";

const ExchangeCalculatorForm = ({ formType, amount, setAmount, targetAmounts, setTargetAmounts, convertedAmounts, setConvertedAmounts }) => {
    const ORE_TYPES = {
        GOLD: 0,
        SILVER: 1,
        COPPER: 2
    };

    const ores = [
        { name: "Gold", image: goldImage },
        { name: "Silver", image: silverImage },
        { name: "Copper", image: copperImage }
    ];

    const rates = [
        [1, 1.91, 2.64],
        [0.5236, 1, 1.21],
        [0.3788, 0.8264, 1]
    ];

    const [selectedOre, setSelectedOre] = useState(ORE_TYPES.GOLD);

    const handleOreChange = (e) => {
        const oreIndex = parseInt(e.target.value, 10);
        setSelectedOre(oreIndex);

        if (formType === 0) {
            calculateConversions(oreIndex, amount);
        } else {
            calculateTotalRequiredAmount(oreIndex, targetAmounts);
        }
    };

    const handleAmountChange = (e) => {
        const newAmount = parseFloat(e.target.value) || 0;
        setAmount(Math.floor(newAmount));
        calculateConversions(selectedOre, newAmount);
    };

    const calculateConversions = (oreIndex, amount) => {
        const conversions = rates[oreIndex].map((rate) => Math.floor(rate * amount));
        setConvertedAmounts(conversions);
    };

    const handleOreAmountChange = (e, targetOreIndex) => {
        const targetAmount = parseFloat(e.target.value) || 0;

        setTargetAmounts((prevTargetAmounts) => {
            const updatedAmounts = [...prevTargetAmounts];
            updatedAmounts[targetOreIndex] = targetAmount;
            calculateTotalRequiredAmount(selectedOre, updatedAmounts);
            return updatedAmounts;
        });
    };

    const calculateTotalRequiredAmount = (selectedOreIndex, targets) => {
        const totalRequiredAmount = targets.reduce((acc, targetAmount, i) => {
            if (i !== selectedOreIndex) {
                return acc + (targetAmount / rates[selectedOreIndex][i]);
            }
            return acc;
        }, 0);

        setAmount(Math.round(totalRequiredAmount));
    };


    return (
        <div>
            <div id="ore-picker">
                <label>Select Ore to Trade:</label>
                <div className="ore-options">
                    {ores.map((ore, index) => (
                        <label key={index} className="ore-option">
                            <div>
                                <img src={ore.image} alt={`${ore.name}`} className="resource-icon" />
                                {ore.name}
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
            {formType === 0 ? (
                <div id="amount-input">
                    <label htmlFor="amount-input">Amount:  </label>
                    <input
                        id="amount-input"
                        type="number"
                        value={ amount}
                        onChange={handleAmountChange}
                        min="0"
                        step="any"
                    />
                </div>
            ) : (
                <div id="amount-input">
                    <p>Total Required {ores[selectedOre].name}: {amount}</p>
                </div>
            )}
            <table>
            <thead>
                <tr>
                    {ores.map((ore, i) => (
                        <th key={i}>
                            <img src={ore.image} alt={`${ore.name}`} className="resource-icon" />
                            <p>{ore.name}</p>
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                <tr>
                    {formType === 0 ? (
                        convertedAmounts.map((convAmount, i) => (
                            <td key={i + "_conv"}>
                                {Math.floor(convAmount)}
                            </td>
                        ))
                    ) : (
                        ores.map((ore, i) => (
                            <td key={i + "_conv"}>
                                {selectedOre === i ? (
                                    <div>{amount}</div>
                                ) : (
                                    <input
                                        type="number"
                                        value={targetAmounts[i]}
                                        onChange={(e) => handleOreAmountChange(e, i)}
                                        min="0"
                                        step="any"
                                    />
                                )}
                            </td>
                        ))
                    )}
                </tr>
                <tr id="rates-row">
                    {rates[selectedOre].map((rate, i) => (
                        <td key={i + "_rates"}>
                            {rate}
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
        </div>
    );
};

ExchangeCalculatorForm.propTypes = {
    formType: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    setAmount: PropTypes.func.isRequired,
    targetAmounts: PropTypes.arrayOf(PropTypes.number).isRequired,
    setTargetAmounts: PropTypes.func.isRequired,
    convertedAmounts: PropTypes.arrayOf(PropTypes.number).isRequired,
    setConvertedAmounts: PropTypes.func.isRequired,
};

export default ExchangeCalculatorForm;