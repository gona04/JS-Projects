document.addEventListener('DOMContentLoaded', () => {
    const spinner = document.getElementById('spinner');
    const table = document.getElementById('data-table');
    const tableBody = document.getElementById('table-body');
    const pagination = document.getElementById('pagination');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('nxt-btn');
    const pageNumber = document.getElementById('page-number');

    let data = [];
    let currentPage = 1;
    const rowsPerPage = 10;

    // Fetch data from API 
    async function fetchData() {
        spinner.style.display = 'flex';
        table.style.display = 'none';
        pagination.style.display = 'none';
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await fetch('https://randomuser.me/api/?results=50');
            const json = await response.json();
            data = json.results;
            displayData(data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        } finally {
            spinner.style.display = 'none';
            table.style.display = 'table';
            pagination.style.display = 'block'; 
        }
    }

    // Update pagination buttons
    function updatePaginationButtons() {
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === Math.ceil(data.length / rowsPerPage);
    }

    // Display table data
    function displayData(res) {
        tableBody.innerHTML = '';
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedItems = res.slice(start,end);
        updatePaginationButtons();

        paginatedItems.forEach(r => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-label="Name">${r.name.first} ${r.name.last}</td>
                <td data-label="Email">${r.email}</td>
                <td data-label="Username">${r.login.username}</td>
                <td data-label="Country">${r.location.country}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Fetch and display data on page load
    fetchData();

    // Dark Mode Functionality --------------//
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check if dark mode is preferred or previously chosen
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';

    if (isDarkMode) {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = 'Light Mode';
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            themeToggle.innerText = 'Dark Mode';
            localStorage.setItem('dark-mode', 'false');
        } else {
            body.style.transition = 'background-color .3s, color .3s';
            body.classList.add('dark-mode');
            themeToggle.innerText = 'Light Mode';
            localStorage.setItem('dark-mode', 'true');
        }
    });
});

function onPrevClicked() {
    if(currentPage > 1) {
        currentPage--
        displayData(data);
    } 

}