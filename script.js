$(document).ready(function () {
    // Header Slideshow Initialization
    function initializeHeaderSlideshow() {
        $('.header-slideshow').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: true,
            dots: true,
            speed: 800,
            fade: true,
            cssEase: 'linear'
        });

        // Restart autoplay on dot click
        $('.header-slideshow').on('afterChange', function() {
            $(this).slick('slickPlay');
        });
    }

    // Initialize the header slideshow
    initializeHeaderSlideshow();

    // Flex Slider Initialization
    function initializeSlick(selector) {
        $(selector).slick({
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 2,
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: true,
            dots: true,
            speed: 800,
            swipe: true,
            touchMove: true
        });
        
        // Restart autoplay on dot click
        $(selector).on('afterChange', function() {
            $(this).slick('slickPlay');
        });
    }

    // Initialize slick for the first visible section
    initializeSlick('#section1-content .flex-slider-container');

    // Countdown Timer
    function startCountdown() {
        const endDate = new Date('2024-09-30T00:00:00');
        const now = new Date();
        const timeLeft = endDate - now;

        if (timeLeft <= 0) {
            $('#countdown').text('Deal expired');
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        $('#countdown').text(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        setTimeout(startCountdown, 1000);
    }

    startCountdown();

    // Section Auto-Slide
    let currentSectionIndex = 0;
    const sectionOrder = ['section1', 'section2', 'section3'];

    function autoSlideSections() {
        $(`#${sectionOrder[currentSectionIndex]}-content`).slideUp();

        currentSectionIndex = (currentSectionIndex + 1) % sectionOrder.length;

        const nextSection = $(`#${sectionOrder[currentSectionIndex]}-content`);
        nextSection.hide().slideDown();

        $('.section .flex-slider-container').slick('unslick');
        initializeSlick(nextSection.find('.flex-slider-container'));
    }

    const sectionAutoSlideInterval = setInterval(autoSlideSections, 5000);

    // Toggle Sections on Button Click
    $('.clicka').click(function () {
        clearInterval(sectionAutoSlideInterval); // Clear auto-slide interval
        const targetSection = $(this).data('target');

        $('.section').slideUp();

        const targetSectionContent = $(`#${targetSection}-content`);
        targetSectionContent.hide().slideDown();

        $('.section .flex-slider-container').slick('unslick');
        initializeSlick(targetSectionContent.find('.flex-slider-container'));
    });

    // Switch Tabs Functionality
    function switchTab(tabId) {
        $('.tab-button-1').removeClass('active');
        $(`[data-tab="${tabId}"]`).addClass('active');

        $('.tab-content').removeClass('active');
        $(`#${tabId}`).addClass('active');
    }

    $('.tab-button-1').click(function () {
        const tabId = $(this).data('tab');
        switchTab(tabId);
    });

    // Auto-Switch Tabs
    let currentTabId = 'tab1';
    const tabOrder = ['tab1', 'tab2', 'tab3'];

    setInterval(function () {
        const currentIndex = tabOrder.indexOf(currentTabId);
        const nextIndex = (currentIndex + 1) % tabOrder.length;
        currentTabId = tabOrder[nextIndex];
        switchTab(currentTabId);
    }, 5000);

    // Swipe Functionality for Tabs (using Hammer.js)
    const tabsContainer = document.querySelector('.tabs');
    const hammertime = new Hammer(tabsContainer);

    hammertime.on('swipeleft', function () {
        const currentTab = $('.tab-button-1.active').data('tab');
        let nextTab = '';

        if (currentTab === 'tab1') nextTab = 'tab2';
        else if (currentTab === 'tab2') nextTab = 'tab3';
        else nextTab = 'tab1';

        switchTab(nextTab);
    });

    hammertime.on('swiperight', function () {
        const currentTab = $('.tab-button-1.active').data('tab');
        let prevTab = '';

        if (currentTab === 'tab1') prevTab = 'tab3';
        else if (currentTab === 'tab2') prevTab = 'tab1';
        else prevTab = 'tab2';

        switchTab(prevTab);
    });

    // Initialize the slick slider for the reviews section
    $('.reviews-slider').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        arrows: true,
        infinite: true,
        speed: 300,
        fade: true,
        cssEase: 'linear'
    });

    // Ensure that the autoplay works with touch events
    $('.reviews-slider').on('touchstart', function () {
        $(this).slick('slickPause'); // Pause on touch
    }).on('touchend', function () {
        $(this).slick('slickPlay');  // Resume on touch end
    });

    // Subscribe Form
    const subscribeForm = document.querySelector('.subscribe-form');
    subscribeForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const emailInput = document.querySelector('.subscribe-input').value.trim();

        // Simple validation
        if (emailInput) {
            alert(`Thank you for subscribing with email: ${emailInput}`);
            document.querySelector('.subscribe-input').value = ''; // Clear the input
        } else {
            alert('Please enter a valid email address.'); // Prompt for valid email
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.flex-slider-container');
    const products = document.querySelectorAll('.flex-slider-container .product-item');
    let currentIndex = 0;
    const autoSwitchInterval = 3000; // 3 seconds
    const scrollAmount = products[0].offsetWidth; // Width of one product item

    // Function to auto-scroll the slider
    function autoScrollSlider() {
        if (currentIndex < products.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }

        // Scroll to the next product item
        sliderContainer.scrollTo({
            left: scrollAmount * currentIndex,
            behavior: 'smooth'
        });
    }

    // Start the auto-scroll
    let autoScroll = setInterval(autoScrollSlider, autoSwitchInterval);

    // Pause auto-scroll on hover
    sliderContainer.addEventListener('mouseenter', function() {
        clearInterval(autoScroll);
    });

    // Resume auto-scroll when not hovering
    sliderContainer.addEventListener('mouseleave', function() {
        autoScroll = setInterval(autoScrollSlider, autoSwitchInterval);
    });
});


$(document).ready(function () {
    let autoplayInterval;
    const switchDelay = 5000; // 5 seconds delay for autoplay

    // Function to switch tabs
    function switchTab(tabId) {
        $('.cali-tab-content').removeClass('active'); // Hide all tabs
        $('#' + tabId).addClass('active'); // Show the selected tab
        $('.cali-tabs button').removeClass('active'); // Remove active class from all buttons
        $('.cali-tabs button[data-tab="' + tabId + '"]').addClass('active'); // Add active class to the selected button
    }

    // Tab button click event
    $('.cali-tabs button').click(function () {
        var tabId = $(this).data('tab');
        switchTab(tabId);
        restartAutoplay(); // Restart autoplay on button click
    });

    // Touch events for swiping
    let touchStartX = 0;
    let touchEndX = 0;

    $('.cali-tabs-section').on('touchstart', function (event) {
        touchStartX = event.changedTouches[0].screenX; // Get initial touch position
        pauseAutoplay(); // Pause autoplay on touch start
    });

    $('.cali-tabs-section').on('touchend', function (event) {
        touchEndX = event.changedTouches[0].screenX; // Get end touch position
        handleSwipe();
        restartAutoplay(); // Restart autoplay on touch end
    });

    // Function to handle swipe
    function handleSwipe() {
        if (touchEndX < touchStartX) {
            // Swiped left
            const activeTabIndex = $('.cali-tabs button.active').index();
            const nextTabIndex = activeTabIndex + 1 < $('.cali-tabs button').length ? activeTabIndex + 1 : activeTabIndex;
            switchTab($('.cali-tabs button').eq(nextTabIndex).data('tab'));
        } else if (touchEndX > touchStartX) {
            // Swiped right
            const activeTabIndex = $('.cali-tabs button.active').index();
            const prevTabIndex = activeTabIndex - 1 >= 0 ? activeTabIndex - 1 : activeTabIndex;
            switchTab($('.cali-tabs button').eq(prevTabIndex).data('tab'));
        }
    }

    // Autoplay function
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            const activeTabIndex = $('.cali-tabs button.active').index();
            const nextTabIndex = (activeTabIndex + 1) % $('.cali-tabs button').length; // Loop back to the first tab
            switchTab($('.cali-tabs button').eq(nextTabIndex).data('tab'));
        }, switchDelay);
    }

    // Pause autoplay
    function pauseAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Restart autoplay
    function restartAutoplay() {
        pauseAutoplay(); // Pause current autoplay
        startAutoplay(); // Restart it
    }

    // Start autoplay on page load
    startAutoplay();
});

document.addEventListener('DOMContentLoaded', function () {
    const chatbox = document.querySelector('.sticky-chatbox');

    // Function to update the opacity based on scroll position
    function updateChatboxOpacity() {
        if (window.scrollY > 50) { // Change '50' to your preferred scroll distance
            chatbox.classList.add('scrolled');
        } else {
            chatbox.classList.remove('scrolled');
        }
    }

    // Check initial scroll position
    updateChatboxOpacity();

    // Attach scroll event listener
    window.addEventListener('scroll', updateChatboxOpacity);
});
