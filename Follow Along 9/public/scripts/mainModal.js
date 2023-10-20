document.addEventListener('DOMContentLoaded', (event) => {
    const fetchDataButton = document.getElementById("fetchDataButton");
    const dataIndexInput = document.getElementById("dataIndexInput");
    const dataDisplay = document.getElementById("dataDisplay");
    console.log("loaded");

    fetchDataButton.addEventListener("click", function() {
        console.log("clicked")
        const dataIndex = dataIndexInput.value;
        if (dataIndex) {
            fetch(`https://jsonplaceholder.typicode.com/todos/${dataIndex}`)
            .then(response => response.json())
            .then(data => {
                dataDisplay.innerHTML = `
                <p><strong>Title:</strong> ${data.title}</p>
                <p><strong>ID:</strong> ${data.id}</p>
                <p><strong>Completed:</strong> ${data.completed}</p>
                `;
                $("#dataIndexModal").modal('hide');
            })
            .catch(error => {
                console.log("error occured", error)
                console.error(error);
                dataDisplay.innerHTML = "Error fetching data. Please try again.";
            })
            .finally(() => {
                $("#dataIndexModal").modal("hide");
                $("body").removeClass('modal-open');
                $(".modal-backdrop").remove();
            })
        }
    })
})

