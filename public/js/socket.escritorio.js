let socket = io();

let searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = '/';
    throw new Error('El escritorio es necesario');
}

let desktop = searchParams.get('escritorio');

$('#desktop').text(`Escritorio ${desktop}`);

$('#attendNextTicket').on('click', () => {
    socket.emit('attendTicket', { desktop }, (response) => {
        if (response.number) {
            $('#attendTicket').text(`Atendiendo a Ticket ${response.number}`);
        } else {
            $('#attendTicket').text(response);
        }
    });
});
