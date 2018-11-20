const fs = require('fs');
const { Ticket } = require('./ticket');

class TicketControl {

    constructor() {
        this.limitLast = 4;
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastTickets = [];

        let jsonData = require('../data/data.json');

        if (jsonData.today === this.today) {
            this.last = jsonData.last;
            this.tickets = jsonData.tickets;
            this.lastTickets = jsonData.lastTickets;
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

    attendTicket(desktop) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numberTicket = this.tickets[0].number;
        this.tickets.shift();

        let attendTicket = new Ticket(numberTicket, desktop);

        this.lastTickets.unshift(attendTicket);

        if (this.lastTickets > this.limitLast) {
            this.lastTickets.pop();
        }

        this.writeJsonFile();

        return attendTicket;
    }

    resetCount() {
        this.last = 0;
        this.tickets = [];
        this.lastTickets = [];
        this.writeJsonFile();
    }

    writeJsonFile() {
        let jsonDataString = JSON.stringify({
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastTickets: this.lastTickets
        });
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}

module.exports = {
    TicketControl
};
