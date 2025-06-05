export const addGuide = () => {
    document.getElementById('addGuideBtn').addEventListener('click', function() {
        // Container where new elements will be added
        const container = document.querySelector('.more-guides');
    
        // Create a new detail div
        const newDetail = document.createElement('div');
        newDetail.classList.add('overview-box__detail');
    
        // Create the select element
        const select = document.createElement('select');
        select.classList.add('form__input');
        ['Lead guide', 'Tour guide', 'Intern'].forEach(function(role) {
            const option = document.createElement('option');
            option.value = role.toLowerCase().replace(' ', '-');
            option.textContent = role;
            select.appendChild(option);
        });
        newDetail.appendChild(select);
    
        // Create the input element
        const input = document.createElement('input');
        input.placeholder = 'Enter name';
        input.classList.add('form__input');
        newDetail.appendChild(input);
    
        // Create the delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '-';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.classList.add('btn');
        deleteBtn.classList.add('btn--red');
        deleteBtn.onclick = function() {
            newDetail.remove();
        };
        newDetail.appendChild(deleteBtn);
    
        // Append the new detail div to the container
        container.appendChild(newDetail);
    });
}