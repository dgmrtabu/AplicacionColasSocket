// Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');



const searchParamas = new URLSearchParams(window.location.search);

if (!searchParamas.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParamas.get('escritorio');
lblEscritorio.innerText = escritorio;

const socket = io();


socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = true;
});

socket.on('ultimo-ticket', (ultimo) => {
    // console.log('Desconectado del servidor');
    //lblNuevoTicket.innerText = 'Ticket ' + ultimo;
});



btnCrear.addEventListener('click', () => {

    // socket.emit('siguiente-ticket', null, (ticket) => {
    //     lblNuevoTicket.innerText = ticket;
    // });

});