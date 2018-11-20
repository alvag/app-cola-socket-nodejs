const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {

        let nextTicket = ticketControl.nextTicket();

        callback(nextTicket);
    });

    client.emit('currentTicket', {
        currentTicket: ticketControl.currentTicket()
    });
});
