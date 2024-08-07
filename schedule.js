import schedule from 'node-schedule';
import { counter } from './models/Counter/Counter.js';
import { itemModel } from './models/FoodItems/FoodItem.js';

let scheduleStoreOpen, scheduleStoreClose;

const storeOpen = async () => {
    try {
        const result = await itemModel.updateMany({}, { $set: { isAvailable: true } });
    }
    catch (err) {
        console.log(err);
    }
};

const storeClose = async () => {
    try {
        const orderNumber = await counter.reset();
        const result = await itemModel.updateMany({}, { $set: { isAvailable: false } });
    }
    catch (err) {
        console.log(err);
    }
};

// Schedule functions based on retrieved timing
const scheduler = async (cronOpen, cronClose) => {
    if(scheduleStoreClose || scheduleStoreOpen){
        scheduleStoreClose.cancel();
    }
    if(scheduleStoreOpen){
        scheduleStoreOpen.cancel();
    }

    // Schedule store open job
    scheduleStoreOpen = schedule.scheduleJob(cronOpen, storeOpen);

    // Schedule closing jobs
    scheduleStoreClose = schedule.scheduleJob(cronClose, storeClose);
}

export default scheduler;