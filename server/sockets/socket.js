const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {

        let nextTicket = ticketControl.nextTicket();

        callback(nextTicket);
    });

    client.emit('currentTicket', {
        currentTicket: ticketControl.currentTicket(),
        lastTickets: ticketControl.getLastTickets()
    });

    client.on('attendTicket', (data, callback) => {
        if (!data.desktop) {
            return callback({
                error: true,
                messaje: 'El escritorio es requerido'
            });
        }

        callback(ticketControl.attendTicket(data.desktop));
    });
});
