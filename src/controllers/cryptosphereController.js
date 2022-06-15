
/*******************************/
/*** Cryptosphere Controller ***/
/*******************************/

const asyncHandler  = require('express-async-handler');
const createError   = require('http-errors');
const async         = require('async');
const axios         = require('axios');

/*
 * TradingView Demo 
 * Method: 'GET', url = '/cryptosphere/:symbol/:interval', Access: 'Public'
 */
const getTradingViewDemoData = asyncHandler(async (req, res) => {

    // tulind functions
    const { 
        sma_inc, 
        ema_inc, 
        rsi_inc, 
        macd_inc,
        markers_inc 
    } = require('../apps/tvdemo/indicators');

    try {
        const { symbol, interval } = req.params;
        const resp = await axios.get(`https://api.binance.com/api/v3/klines`, {
                params: {
                    symbol,
                    interval,
                    //limit=20
                }
            }
        ); 
        
        const data = resp.data; // JSON.parse(resp.data);
        let klinedata = data.map((d) => ({
            time: d[0] / 1000,
            open: d[1] * 1,
            high: d[2] * 1,
            low: d[3] * 1,
            close: d[4] * 1,
        }));

        // sma
        klinedata = await sma_inc(klinedata);
        // ema
        klinedata = await ema_inc(klinedata);
        // rsi
        klinedata = await rsi_inc(klinedata);
        // macd
        klinedata = await macd_inc(klinedata);
        // markers
        klinedata = markers_inc(klinedata);

        res.status(200).json(klinedata);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

// const { fork }      = require('child_process');
// const { registerChildEvents, getForkedState, sleep } = require('../libs/parent_events');
// let forked = false;

// /*
//  * Start the scheduler 
//  * Method: 'GET', url = '/scheduler/start', Access: 'Public'
//  */
// const startScheduler = asyncHandler(async (req, res) => {
//     if (!forked) {
//         forked = fork('./src/child.js', ['arg1', 'arg2', 'arg3'], { silent: true });
//         registerChildEvents(forked);
//         await sleep(2500);          // allow the child process to startup
//     }
//     forked.send({ command: 'start' });
//     const { forkedState, uptimeTicks } = await getForkedState(forked);
//     res.json({ command: 'start', forkedState, uptimeTicks });
// });

// /*
//  * Activate the scheduler 
//  * Method: 'GET', url = '/scheduler/activate', Access: 'Public'
//  */
// const activateScheduler = asyncHandler(async (req, res) => {
//     forked.send({ command: 'activate' });            
//     const { forkedState, uptimeTicks } = await getForkedState(forked);
//     res.json({ command: 'activate', forkedState, uptimeTicks });
// });

// /*
//  * Passivate the scheduler 
//  * Method: 'GET', url = '/scheduler/passivate', Access: 'Public'
//  */
// const passivateScheduler = asyncHandler(async (req, res) => {
//     forked.send({ command: 'passivate' });
//     const { forkedState, uptimeTicks } = await getForkedState(forked);
//     res.json({ command: 'passivate', forkedState, uptimeTicks });
// });

// /*
//  * Stop the scheduler 
//  * Method: 'GET', url = '/scheduler/stop', Access: 'Public'
//  */
// const stopScheduler = asyncHandler(async (req, res) => {
//     if (forked) {
//         forked.send({ command: 'stop' });
//         forked = false;
//     }
//     const { forkedState, uptimeTicks } = await getForkedState(forked);
//     res.json({ command: 'stop', forkedState, uptimeTicks });
// });

// /*
//  * Fetch the state of the scheduler 
//  * Method: 'GET', url = '/scheduler/stop', Access: 'Public'
//  */
// const getSchedulerState = asyncHandler(async (req, res) => {
//     const { forkedState, uptimeTicks } = await getForkedState(forked);
//     res.json({ command: 'state', forkedState, uptimeTicks });
// });


module.exports = { 
    getTradingViewDemoData,
    // startScheduler, 
    // activateScheduler, 
    // passivateScheduler, 
    // stopScheduler, 
    // getSchedulerState
};