const fs = require('fs');

class TicketControl {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate();

        let jsonData = require('../data/data.json');

        if (jsonData.today === this.today) {
            this.last = jsonData.last;
        } else {
            this.resetCount();
        }
    }

    nextTicket() {
        this.last++;
        this.writeJsonFile();

        return `Ticket ${this.last}`;
    }

    resetCount() {
        this.last = 0;
        this.writeJsonFile();
    }

    writeJsonFile() {
        let jsonDataString = JSON.stringify({
            last: this.last,
            today: this.today
        });
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}

module.exports = {
    TicketControl
};
