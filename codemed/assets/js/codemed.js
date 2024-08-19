const toggleSwitch = document.getElementById('toggleSwitch');
toggleSwitch.addEventListener('click', function() {
    this.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleSegments = document.getElementById('toggleText');
    const toggleSections = toggleSegments.querySelectorAll('.toggle_section');

    toggleSegments.addEventListener('click', function() {
        toggleSections.forEach(section => section.classList.toggle('active'));
    });
});


const buttons = document.querySelectorAll('.tab-button');
const contentWrapper = document.getElementById('contentWrapper');

buttons.forEach((button, index) => {
    button.addEventListener('click', function() {
        document.querySelector('.tab-button.active').classList.remove('active');
        this.classList.add('active');
        
        // contentWrapper.style.transform = `translateX(-${index * 100}%)`;
    });
});


