const tourName = document.getElementById('name').value;
const maxPpl= document.getElementById('maxPpl').value;
const price = document.getElementById('price').value;
const duration = document.getElementById('duration').value;
const location = document.getElementById('location').value;
const startDate = document.getElementById('start').value;
const difficulty = document.getElementById('Difficulty').value;
const summary = document.getElementById('summary').value;
const description = document.getElementById('desc').value;
const tourCover= document.getElementById('tourCover').file;
const tourPhoto = document.getElementById('tourPhoto').file;
// Create add tour function 
const addTour = async (tourName, maxPpl, price, duration, location, startDate, difficulty, summary, description, tourCover, tourPhoto) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/tours',
            data: {
                tourName,
                maxPpl,
                price,
                duration,
                location,
                startDate,
                difficulty,
                summary,
                description,
                tourCover,
                tourPhoto
            }
        });
        if (res.data.status === 'success') {
            alert('Tour added successfully');
            window.setTimeout(() => {
                location.assign('/admin/tours');
            }, 1500);
        }
    } catch (err) {
        alert(err.response.data.message);
    }
};

// Add event listener to the form
document.getElementById('addTourForm').addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', name);
    form.append('maxPpl', maxPpl);
    form.append('price', price);
    form.append('duration', duration);
    form.append('location', location);
    form.append('startDate', startDate);
    form.append('difficulty', difficulty);
    form.append('summary', summary);
    form.append('description', description);
    form.append('tourCover', tourCover);
    form.append('tourPhoto', tourPhoto);
    addTour(form);
    
});

