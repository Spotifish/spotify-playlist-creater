// modified from my csgo-analyzer repo

const nodeFetch = require('node-fetch');

const TIME_BETWEEN_REQUESTS = 1;

const TIME_FOR_WAIT_INTERVAL = 1;

class DelayedFetch{
    constructor() {
        this.wait = false;
        this.requestTimeWait = TIME_BETWEEN_REQUESTS;
    }

    async queue(url,options) {
        return new Promise(async (resolve,reject) => {
            if (!this.wait) {
                resolve(this.fetch(url,options));
            } else {
                console.log('warte bis queue frei');
                const waitInterval = await setInterval(async () => {
                    if(!this.wait) {
                        clearInterval(waitInterval);
                        resolve(await this.fetch(url,options))
                        //return ;
                    }
                }, TIME_FOR_WAIT_INTERVAL * 1000)
            }
        });
    }

    async fetch(url,options) {
        this.wait = true;
        setTimeout(() => {
            this.wait = false;
        }, this.requestTimeWait * 1000);
        const ret = await nodeFetch(url,options);
        if (ret.status === 429) {
            this.requestTimeWait *= 1.2;
            console.log(`increased waiting time to ${Math.round(this.requestTimeWait)} seconds`);
            await this.queue(url,options);
        } else {
            return ret;
        }
    }
}

module.exports = DelayedFetch;
