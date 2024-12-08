document.querySelectorAll('.scrollable-box').forEach(container => {
    const scrollable = container.querySelector('.scrollable-container');
    const leftButton = container.querySelector('.scroll-left');
    const rightButton = container.querySelector('.scroll-right');

    // Add event listeners for scroll buttons
    leftButton.addEventListener('click', () => {
        scrollable.scrollBy({
            left: -200,
            behavior: 'smooth',
        });
    });

    rightButton.addEventListener('click', () => {
        scrollable.scrollBy({
            left: 200,
            behavior: 'smooth',
        });
    });

    // Enable drag scroll for the container
    enableDragScroll(scrollable);
});

function enableDragScroll(container) {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.classList.add('active');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('active');
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('active');
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // سرعت اسکرول
        container.scrollLeft = scrollLeft - walk;
    });
}