document.addEventListener('DOMContentLoaded', function() {
    const ticketsPerPage = 3;
    let currentPage = 1;

    const reservations = [
        {
            id: 123456,
            username: 'user1',
            seatNumber: 'A1',
            arena: 'Crypto.com Arena',
            requestDate: 'May 20, 2024',
            dateTime: 'May 26, 2024 12:00 PM - 12:30 PM',
            isLate: false
        },
        {
            id: 123457,
            username: 'user2',
            seatNumber: 'B2',
            arena: 'Madison Square Garden',
            requestDate: 'May 21, 2024',
            dateTime: 'May 27, 2024 1:00 PM - 1:30 PM',
            isLate: false
        },
        {
            id: 123458,
            username: 'user3',
            seatNumber: 'C3',
            arena: 'Target Center',
            requestDate: 'May 22, 2024',
            dateTime: 'May 28, 2024 2:00 PM - 2:30 PM',
            isLate: true
        },
        {
            id: 123459,
            username: 'user4',
            seatNumber: 'D4',
            arena: 'Chase Center',
            requestDate: 'May 23, 2024',
            dateTime: 'May 29, 2024 3:00 PM - 3:30 PM',
            isLate: false
        },
        {
            id: 123460,
            username: 'user5',
            seatNumber: 'E5',
            arena: 'Wells Fargo Center',
            requestDate: 'May 24, 2024',
            dateTime: 'May 30, 2024 4:00 PM - 4:30 PM',
            isLate: false
        },
        {
            id: 123461,
            username: 'user6',
            seatNumber: 'F6',
            arena: 'Chase Center',
            requestDate: 'May 25, 2024',
            dateTime: 'May 31, 2024 5:00 PM - 5:30 PM',
            isLate: true
        },
        {
            id: 123462,
            username: 'user7',
            seatNumber: 'G7',
            arena: 'Madison Square Garden',
            requestDate: 'May 26, 2024',
            dateTime: 'June 1, 2024 6:00 PM - 6:30 PM',
            isLate: true
        },
        {
            id: 123463,
            username: 'user8',
            seatNumber: 'H8',
            arena: 'Madison Square Garden',
            requestDate: 'May 27, 2024',
            dateTime: 'June 2, 2024 7:00 PM - 7:30 PM',
            isLate: false
        }
    ];

    const ticketContainer = document.getElementById('remove-ticket-container');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageNumbersContainer = document.getElementById('page-numbers');
    const totalPages = Math.ceil(reservations.length / ticketsPerPage);

    function displayTickets() {
        ticketContainer.innerHTML = '';
        const start = (currentPage - 1) * ticketsPerPage;
        const end = start + ticketsPerPage;
        const pageTickets = reservations.slice(start, end);

        pageTickets.forEach(ticket => {
            const ticketRow = document.createElement('tr');

            let removeButtonHtml = '';
            if (ticket.isLate) {
                removeButtonHtml = `
                    <button class="remove-reservation-button-custom" onclick="showRemoveConfirmation(${ticket.id})">
                        Remove
                    </button>
                `;
            }

            const editButtonHtml = `
                <a class="edit-reservation-button-custom" href="modify_reservation_page.html?id=${ticket.id}">
                    Edit
                </a>
            `;

            ticketRow.innerHTML = `
                <td>${ticket.id}</td>
                <td>${ticket.username}</td>
                <td>${ticket.seatNumber}</td>
                <td>${ticket.arena}</td>
                <td>${ticket.requestDate}</td>
                <td>${ticket.dateTime}</td>
                <td>${ticket.isLate ? 'Late' : 'On Time'}</td>
                <td>${editButtonHtml}</td>
                <td>${removeButtonHtml}</td>
            `;
            ticketContainer.appendChild(ticketRow);
        });

        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;
    }

    function displayPageNumbers() {
        pageNumbersContainer.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageNumber = document.createElement('button');
            pageNumber.textContent = i;
            pageNumber.classList.add('page-number-custom');
            if (i === currentPage) {
                pageNumber.classList.add('active');
            }
            pageNumber.addEventListener('click', () => {
                currentPage = i;
                displayTickets();
                displayPageNumbers();
            });
            pageNumbersContainer.appendChild(pageNumber);
        }
    }

    window.showRemoveConfirmation = function(id) {
        const confirmation = confirm("Are you sure you want to remove this reservation?");
        if (confirmation) {
            removeReservation(id);
        }
    }

    function removeReservation(id) {
        const index = reservations.findIndex(ticket => ticket.id === id);
        if (index !== -1) {
            reservations.splice(index, 1);
            displayTickets();
            displayPageNumbers();
        }
    }

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayTickets();
            displayPageNumbers();
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayTickets();
            displayPageNumbers();
        }
    });

    displayTickets();
    displayPageNumbers();
});
