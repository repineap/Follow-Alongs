document.addEventListener('DOMContentLoaded', (event) => {
    const fetchDataButton = document.getElementById("fetchDataButton");
    const searchInput = document.getElementById("searchInput");
    const dataTableHead = document.querySelector("#dataTable thead tr");
    const dataTableBody = document.querySelector("#dataTable tbody");

    fetchDataButton.addEventListener("click", function() {
        const query = searchInput.value;
        if (query) {
            fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
            .then(response => response.json())
            .then(data => {
                dataTableHead.insertAdjacentHTML('beforeend', `<th>Search query: "${query}"</th>`);
                dataTableBody.innerHTML = "";
                console.log(data.result);
                for (const quote of data.result) {
                    dataTableBody.insertAdjacentHTML('beforeend', `<tr><td>${quote.value}</td></tr>`);
                }
                
                $("#dataIndexModal").modal('hide');
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                dataTableBody.innerHTML = `<td colspan="2">Error fetching data. Please try again.</td>`;
            })
            .finally(() => {
                $("#dataIndexModal").modal("hide");
                $("body").removeClass('modal-open');
                $('.modal-backdrop').remove();
            })
        }
    })
})