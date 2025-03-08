    const spinner = document.getElementById('spinner');
    const table = document.getElementById('data-table');
    const tableBody = document.getElementById('table-body');
    const pagination = document.getElementById('pagination');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('nxt-btn');
    const pageNumber = document.getElementById('page-number');

    let data = [];
    let sortedData = [];
    let currentPage = 1;
    const rowsPerPage = 10;
    let sortDirection = {};

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
            sortedData = [...data];
            displayData(sortedData);
        } catch (error) {
            console.error('Error fetching data: ', error);
        } finally {
            spinner.style.display = 'none';
            table.style.display = 'table';
            pagination.style.display = 'block'; 
            updatePaginationButtons();
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
        const paginatedItems = res.slice(start, end);
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

        pageNumber.textContent = currentPage;
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

    prevBtn.addEventListener('click', onPrevClicked);
    nextBtn.addEventListener('click', onNextClicked);

    function onPrevClicked() {
        if (currentPage > 1) {
            currentPage--;
            displayData(sortedData);
        }
    }

    function onNextClicked() {
        if (currentPage < Math.ceil(sortedData.length / rowsPerPage)) {
            currentPage++;
            displayData(sortedData);
        }
    }

  //Sort table by cloumn index
  function sortTable(columnInex) {
    clearSortIcons();
    sortedData = [...sortedData].sort((a,b) => {
        if(!sortDirection[columnInex]) {
            sortDirection[columnInex] = 'asc'
        }
        let valA, valB; 
        switch(columnInex) {
            case 0: 
                valA = `${a.name.first} ${a.name.last}`;
                valB = `${b.name.first} ${b.name.last}`;
                break;
            case 1: 
                valA = `${a.email}`;
                valB = `${b.email}`;
                break;
            case 2: 
                valA = `${a.login.username}`;
                valB = `${b.login.username}`;
                break;
            case 3: 
                valA = `${a.location.country}`;
                valB = `${b.location.country}`;
                break;
        }
        if(sortDirection[columnInex] === 'desc') {
            return valB.localeCompare(valA)
        } else {
            return valA.localeCompare(valB);
        }
    });
    updateSortIcon(columnInex, sortDirection[columnInex]);
    sortDirection[columnInex] = sortDirection[columnInex] === 'asc' ? 'desc' : 'asc';
    displayData(sortedData);
}

// Clear sort icons for all not sorted coulmns 
function clearSortIcons() {
    for(let i = 0; i < 4; i++) {
        const icon = document.getElementById(`icon-${i}`);
        icon.className = 'fas fa-sort'
    }
}

//Update sort icon based on sort direction 
function updateSortIcon(columnIndex, direction) {
    const icon = document.getElementById(`icon-${columnIndex}`);
    icon.className = direction === 'asc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
}