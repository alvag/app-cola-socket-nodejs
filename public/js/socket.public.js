let socket = io();

let lblTickets = [
    $('#lblTicket1'),
    $('#lblTicket2'),
    $('#lblTicket3'),
    $('#lblTicket4')];

let lblEscritorios = [
    $('#lblEscritorio1'),
    $('#lblEscritorio2'),
    $('#lblEscritorio3'),
    $('#lblEscritorio4')
];

socket.on('currentTicket', (response) => {
    updateView(response.lastTickets);
});

const updateView = (lastTickets) => {
    lastTickets.forEach((ticket, i) => {
        lblTickets[i].text(`Ticket ${ticket.number}`);
        lblEscritorios[i].text(`Escritorio ${ticket.desktop}`);
    });
};
