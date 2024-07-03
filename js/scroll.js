document.addEventListener("DOMContentLoaded", function() {
    const slider = document.querySelector('.blog-slider-inner');
    const sliderItems = slider.children;
    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
  
    function scrollByIndex(index) {
      if (index < 0 || index >= sliderItems.length) return;
      currentIndex = index;
      const itemWidth = sliderItems[0].offsetWidth;
      const scrollAmount = currentIndex * itemWidth;
      slider.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  
    function scrollNext() {
      currentIndex = (currentIndex + 1) % sliderItems.length;
      scrollByIndex(currentIndex);
    }
  
    function scrollPrev() {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : sliderItems.length - 1;
      scrollByIndex(currentIndex);
    }
  
    function handleTouchStart(index, event) {
      currentIndex = index;
      startPos = event.clientX;
      isDragging = true;
  
      slider.style.cursor = 'grabbing';
    }
  
    function handleTouchMove(event) {
      if (!isDragging) return;
  
      const currentPosition = event.clientX;
      const diff = currentPosition - startPos;
  
      slider.style.transform = `translateX(${prevTranslate + diff}px)`;
    }
  
    function handleTouchEnd() {
      isDragging = false;
      const itemWidth = sliderItems[0].offsetWidth;
      const moveAmount = currentTranslate % itemWidth;
      prevTranslate = currentTranslate + moveAmount;
  
      slider.style.cursor = 'grab';
    }
  
    // Automatic scroll every 5 seconds
    setInterval(scrollNext, 5000);
  
    slider.addEventListener('scroll', () => {
      const scrollLeft = slider.scrollLeft;
      const itemWidth = sliderItems[0].offsetWidth;
      currentIndex = Math.round(scrollLeft / itemWidth);
    });
  
    sliderItems.forEach((item, index) => {
      item.addEventListener('mousedown', (event) => handleTouchStart(index, event));
      item.addEventListener('touchstart', (event) => handleTouchStart(index, event));
    });
  
    slider.addEventListener('mousemove', handleTouchMove);
    slider.addEventListener('touchmove', handleTouchMove);
  
    window.addEventListener('mouseup', handleTouchEnd);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('mouseleave', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);
  });
  