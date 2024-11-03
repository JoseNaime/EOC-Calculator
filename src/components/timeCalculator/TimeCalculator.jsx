import '/src/index.css'
import {ores} from "../../constants/oreConstants.js";
import {useState} from "react";

const TimeCalculator = () => {
    const [userResources, setUserResources] = useState([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ])

    const [estimatedTime, setEstimatedTime] = useState([0,0,0]);

    const handleUserResourceChange = (e, i) => {
        const newUserResources = [...userResources];
        let valueToUpdate = parseInt(e.target.value);
        if (valueToUpdate > 0) {
            e.target.value = ""
        } else {
            valueToUpdate = 0
        }

        if (e.target.name === "ore") {
            newUserResources[i][0] = valueToUpdate;
        } else if (e.target.name === "change") {
            newUserResources[i][1] = valueToUpdate;
        } else if (e.target.name === "target"){
            newUserResources[i][2] = valueToUpdate
        }
        console.log(newUserResources)
        setUserResources(newUserResources);
        calculateEstimatedTimes(userResources);
    }

    const calculateEstimatedTimes = ( _userResources) => {
        const newEstimatedTimes = [...estimatedTime];
        _userResources.map((userResource, i) => {
            const difference = userResource[2] - userResource[0];
            const earnPerHour = userResource[1]

            if (earnPerHour <= 0) {
                newEstimatedTimes[i] = "Inf."
            } else {
                const totalMinutes = (difference / earnPerHour) * 60;
                const hours = Math.floor(totalMinutes / 60);
                const minutes = Math.floor(totalMinutes % 60);
                const seconds = Math.floor((totalMinutes % 1) * 60);

                // Format as hh:mm.ss
                newEstimatedTimes[i] = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}.${String(seconds).padStart(2, '0')}`;
            }
        })
        console.log(newEstimatedTimes)
        setEstimatedTime(newEstimatedTimes)
    }

    return (
        <>
            <h1>Ore Time Calculator</h1>
            <div id="info">
                <aside>Use this calculator to estimate the time needed to gather a target amount of ores. Enter your
                    <b> current
                        ore
                        count,
                        hourly
                        ore
                        collection
                        rate,
                        and
                        target
                        ore
                        amount</b> for
                       each type of ore. The calculator will provide an estimate of the time required to reach your goal
                       based on your input. Perfect for planning and optimizing your resource gathering!
                </aside>
            </div>
            <div>
                <table id="time-calculator">
                    <thead>
                    <tr>
                        <th className={"hidden"}></th>
                        <th>Current Amount</th>
                        <th>Change p/hour</th>
                        <th>Target</th>
                        <th>Time to Goal</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ores.map((ore, i) => (
                        <tr key={i}>
                            <td><img src={ore.image} alt={`${ore.name}`} className="resource-icon" />{ore.name}</td>
                            <td><input type="number"
                                       name="ore"
                                       min={0}
                                       value={userResources[i][0]}
                                       onChange={(e) => handleUserResourceChange(e, i)} /></td>
                            <td className={"change-input"}><input type="number"
                                                                  name="change"
                                                                  min={0}
                                                                  value={userResources[i][1]}
                                                                  onChange={(e) => handleUserResourceChange(e, i)} />
                            </td>
                            <td><input type="number"
                                       name="target"
                                       min={0}
                                       value={userResources[i][2]}
                                       onChange={(e) => handleUserResourceChange(e, i)} />
                            </td>
                            <td>
                                {estimatedTime[i]}
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>

        </>
    );
};

export default TimeCalculator;