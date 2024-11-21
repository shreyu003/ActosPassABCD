// Function to format the date in "dd MMMM, yyyy" format
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = new Intl.DateTimeFormat('en-IN', { day: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat('en-IN', { month: 'long' }).format(date);
    const year = new Intl.DateTimeFormat('en-IN', { year: 'numeric' }).format(date);
    return `${day} ${month}, ${year}`;
}

// Fetch cities from API and populate the city dropdown
fetch("https://actopassapidev.actoscript.com/api/City")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const cityDropdown = document.getElementById("cityDropdown");

        // Clear existing options and add "All Cities" option
        cityDropdown.innerHTML = '<option value="">All Cities</option>';

        // Populate dropdown with cities from the API
        if (data && data.length > 0) {
            data.forEach((city) => {
                const option = document.createElement("option");
                option.id = city.CityId;  // Use CityId as the value
        
                // Set CityName in lowercase for value
                option.value = city.CityName.toLowerCase();
        
                // Capitalize CityName for display text
                option.innerHTML = city.CityName.charAt(0).toUpperCase() + city.CityName.slice(1).toLowerCase();
        
                // Add option to dropdown
                cityDropdown.appendChild(option);
            });
        }
    })
    .catch(error => {
        console.error("Error fetching cities:", error);
    });

// Define sections to filter and the criteria
const sections = [
    { cards: [...document.querySelectorAll('.product_card')], errorMsg: '.error_msg[data-section="product"]', maxVisible: 8 },
    { cards: [...document.querySelectorAll('.venue_card')], errorMsg: '.error_msg[data-section="venue"]', maxVisible: 4 },
    { cards: [...document.querySelectorAll('.productColumn4')], errorMsg: '.error_msg[data-section="productColumn4"]', maxVisible: 4 },
    { cards: [...document.querySelectorAll('.bstslr_card')], errorMsg: '.error_msg[data-section="bestSeller"]', maxVisible: 4 },
];

// Function to filter products by city
const filterByCity = (city) => {
    sections.forEach(({ cards, errorMsg, maxVisible }) => {
        let visibleCount = 0;

        // Filter each card in the section
        cards.forEach(card => {
            const shouldShow = card.dataset.cityTag.split(',').includes(city) || !city;
            
            // Show or hide card based on filter conditions
            card.style.display = shouldShow && visibleCount < maxVisible ? 'block' : 'none';
            if (shouldShow) visibleCount++;
        });

        // Show or hide error message if no products are visible
        document.querySelector(errorMsg).style.display = visibleCount > 0 ? 'none' : 'block';
    });
};

// Add event listener for dropdown change to filter products
document.getElementById('cityDropdown').addEventListener('change', e => filterByCity(e.target.value));

// Initial call to display all products on page load
filterByCity('');
