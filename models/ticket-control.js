const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.tickets4 = [];

        this.init();
    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            tickets4: this.tickets4
        }
    }

    init() {
        const { hoy, tickets, ultimo, tickets4 } = require('../db/data.json');
        if (hoy === this.hoy) {
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.tickets4 = tickets4;
        } else {
            // es otro dia
            this.guardarDB();
        }
    }

    guardarDB() {

        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));

    }

    siguiente() {
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.guardarDB();
        return 'Ticket ' + ticket.numero;
    }

    atenderTicket(escritorio) {

        // No tenemos tickests
        if (this.tickets.length === 0) {
            return null;
        }

        const ticket = this.tickets.shift();

        this.ultimos4.unshift(ticket);

        if (this.ultimos4 > 4) {
            this.ultimos4.splice(-1, 1);
        }

        this.guardarDB();

        return ticket;
    }

}

module.exports = TicketControl;