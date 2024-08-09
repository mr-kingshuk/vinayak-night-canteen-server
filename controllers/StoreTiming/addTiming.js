import { storeTimingModel } from "../../models/StoreTiming/StoreTiming.js";
import { itemModel } from "../../models/FoodItems/FoodItem.js";
import scheduler from "../../schedule.js";

const addTiming = async (req, res) => {
    //time is coming from client in 24-hour format
    const { openHour, openMin, closeHour, closeMin } = req.body.body;
    try {
        // Validate input values here if needed
        if (openHour < 0 || openHour > 23 || closeHour < 0 || closeHour > 23 || openMin < 0 || openMin > 59 || closeMin < 0 || closeMin > 59)
            return res.status(404).json({ error: 'Timing out of bounds' });

        // Assuming you have a single document for the store timings in the collection
        const timing = await storeTimingModel.find();
        const result = await storeTimingModel.findOneAndUpdate(
            { _id: timing[0]._id },
            {
                $set: {
                    openHour: openHour,
                    openMin: openMin,
                    closeHour: closeHour,
                    closeMin: closeMin,
                },
            },
            { new: true }
        );

        //change the scheduler time, that schedules daily.
        const cronOpen = `${result.openMin} ${result.openHour} * * *`;
        const cronClose = `${result.closeMin} ${result.closeHour} * * *`;
        scheduler(cronOpen, cronClose);

        //change items status based on new time and current time (IST)
        const available = checkStoreTimeWithCurrentTime(openHour, openMin, closeHour, closeMin);
        const itemsState = await itemModel.updateMany({}, { $set: { isAvailable: available } });

        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const checkStoreTimeWithCurrentTime = ( openHour, openMin, closeHour, closeMin ) => {
    // Get the current time
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMin = currentTime.getMinutes();

    let available = false;

    // Convert open and close times to minutes since start of day for easy comparison
    const openTimeInMinutes = openHour * 60 + openMin;
    const closeTimeInMinutes = closeHour * 60 + closeMin;
    const currentTimeInMinutes = currentHour * 60 + currentMin;

    // Determine if current time is between open and close times
    if (openTimeInMinutes < closeTimeInMinutes) {
        // Regular case: open time is before close time
        if (currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes <= closeTimeInMinutes) {
            available = true;
        }
    } else {
        // Edge case: open time is after close time (overnight scenario)
        if (currentTimeInMinutes >= openTimeInMinutes || currentTimeInMinutes <= closeTimeInMinutes) {
            available = true;
        }
    }
    return available;
};

export default addTiming;