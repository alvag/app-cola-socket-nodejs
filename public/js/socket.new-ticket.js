let socket = io();

let lblNextTicket = $('#lblNextTicket');

socket.on('connect', () => {

});

socket.on('disconnect', () => {

});

$('#newTicket').on('click', () => {
    socket.emit('nextTicket', null, (nextTicket) => {
        lblNextTicket.text(nextTicket);
    });
});

socket.on('currentTicket', (response) => {
    lblNextTicket.text(response.currentTicket);
});
