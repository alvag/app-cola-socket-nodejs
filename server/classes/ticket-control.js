const fs = require('fs');
const { Ticket } = require('./ticket');

class TicketControl {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];

        let jsonData = require('../data/data.json');

        if (jsonData.today === this.today) {
            this.last = jsonData.last;
            this.tickets = jsonData.tickets;
        } else {
            this.resetCount();
        }
    }

    nextTicket() {
        this.last++;

        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.writeJsonFile();

        return `Ticket ${this.last}`;
    }

    currentTicket() {
        return `Ticket ${this.last}`;
    }

    resetCount() {
        this.last = 0;
        this.tickets = [];
        this.writeJsonFile();
    }

    writeJsonFile() {
        let jsonDataString = JSON.stringify({
            last: this.last,
            today: this.today,
            tickets: this.tickets
        });
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}

module.exports = {
    TicketControl
};
