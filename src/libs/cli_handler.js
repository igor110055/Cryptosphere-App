const axios = require('axios');

const baseUrl = process.env.BASE_URL;

const cliHandler = (yargs) => {

    // List command
    yargs.command({
        command: 'list',
        describe: 'List notes',
        handler() {

            console.log('List invoked');

        }
    });

    // // Start command
    // yargs.command({
    //     command: 'start',
    //     describe: 'Start the scheduler',
    //     async handler() {
    //         try {
    //             const resp = await axios.get(`${baseUrl}/scheduler/start`);
    //             console.log(resp.data);
    //         }
    //         catch(err) {
    //             if (err.code === 'ECONNREFUSED') {
    //                 return console.log('Unable to connect to the service');
    //             }

    //             console.log(err);
    //         };
    //     }
    // });

    // // Activate command
    // yargs.command({
    //     command: 'activate',
    //     describe: 'Activate the scheduler',
    //     async handler() {
    //         try {
    //             const resp = await axios.get(`${baseUrl}/scheduler/activate`);
    //             console.log(resp.data);
    //         }
    //         catch(err) {
    //             if (err.code === 'ECONNREFUSED') {
    //                 return console.log('Unable to connect to the service');
    //             }

    //             console.log(err);
    //         }
    //     }
    // });

    // // Passivate command
    // yargs.command({
    //     command: 'passivate',
    //     describe: 'Passivate the scheduler',
    //     async handler() {
    //         try {
    //             const resp = await axios.get(`${baseUrl}/scheduler/passivate`);
    //             console.log(resp.data);
    //         }
    //         catch(err) {
    //             if (err.code === 'ECONNREFUSED') {
    //                 return console.log('Unable to connect to the service');
    //             }

    //             console.log(err);
    //         }
    //     }
    // });

    // // Stop command
    // yargs.command({
    //     command: 'stop',
    //     describe: 'Stop the scheduler',
    //     async handler() {
    //         try {
    //             const resp = await axios.get(`${baseUrl}/scheduler/stop`);
    //             console.log(resp.data);
    //         }
    //         catch(err) {
    //             if (err.code === 'ECONNREFUSED') {
    //                 return console.log('Unable to connect to the service');
    //             }

    //             console.log(err);
    //         }
    //     }
    // });
    
    // // State command
    // yargs.command({
    //     command: 'state',
    //     describe: 'State of the scheduler',
    //     // builder: {
    //     //     title: {                    // i.e. the option
    //     //         describe: 'Note title',
    //     //         demandOption: true,     // required    
    //     //         type: 'string'          // array, boolean (default), count, number, string
    //     //     },
    //     //     body: {
    //     //         describe: 'Note body',
    //     //         demandOption: true,
    //     //         type: 'string'
    //     //     }
    //     // },
    //     async handler() {
    //         try {
    //             const resp = await axios.get(`${baseUrl}/scheduler/state`);
    //             console.log(resp.data);
    //         }
    //         catch(err) {
    //             if (err.code === 'ECONNREFUSED') {
    //                 return console.log('Unable to connect to the service');
    //             }

    //             console.log(err);
    //         }
    //     }
    // });

};


module.exports = cliHandler;

