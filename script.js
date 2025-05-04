// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ============== SECTION 1: EVENT HANDLING ==============
    
    // Button click event
    const clickBtn = document.getElementById('click-btn');
    const clickResult = document.getElementById('click-result');
    let clickCount = 0;
    
    clickBtn.addEventListener('click', function() {
        clickCount++;
        // Update the result text based on the number of clicks
        if (clickCount === 1) {
            clickResult.textContent = "You clicked once. Keep going!";
        } else if (clickCount < 5) {
            clickResult.textContent = `You clicked ${clickCount} times. Keep going!`;
        } else if (clickCount === 5) {
            clickResult.textContent = "High five! You clicked 5 times!";
            // Add a shake animation for fun
            clickResult.classList.add('shake');
            // Remove the animation class after it completes
            setTimeout(() => {
                clickResult.classList.remove('shake');
            }, 500);
        } else {
            clickResult.textContent = `Wow! You've clicked ${clickCount} times. You really like clicking!`;
        }
    });
    
    // Hover event
    const hoverBox = document.getElementById('hover-box');
    const originalHoverText = hoverBox.innerHTML;
    
    hoverBox.addEventListener('mouseenter', function() {
        // Change background color and text when mouse enters
        this.style.backgroundColor = '#a777e3';
        this.style.color = 'white';
        this.innerHTML = "<p>That tickles! 😄</p>";
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        // Revert to original state when mouse leaves
        this.style.backgroundColor = '#e9ecef';
        this.style.color = '#333';
        this.innerHTML = originalHoverText;
    });
    
    // Keypress detection
    const keyInput = document.getElementById('key-input');
    const keyOutput = document.getElementById('key-output');
    
    keyInput.addEventListener('keydown', function(event) {
        // Display the key that was pressed
        keyOutput.textContent = `You pressed: ${event.key} (Code: ${event.code})`;
        
        // Add a fade-in animation
        keyOutput.classList.remove('fade-in');
        void keyOutput.offsetWidth; // Force reflow to restart animation
        keyOutput.classList.add('fade-in');
    });
    
    // Secret action (double-click)
    const secretBox = document.getElementById('secret-box');
    const secretResult = document.getElementById('secret-result');
    
    secretBox.addEventListener('dblclick', function() {
        // Display secret message and add rainbow effect
        secretBox.textContent = "🎉 You found the secret! 🎉";
        secretBox.classList.add('rainbow');
        
        // Show congratulatory message
        secretResult.textContent = "Congratulations! You discovered the double-click secret.";
        secretResult.classList.add('fade-in');
        
        // Reset after 3 seconds
        setTimeout(() => {
            secretBox.textContent = "Double-click for a surprise!";
            secretBox.classList.remove('rainbow');
            secretResult.textContent = "";
        }, 3000);
    });
    
    // ============== SECTION 2: INTERACTIVE ELEMENTS ==============
    
    // Color-changing button
    const colorBtn = document.getElementById('color-btn');
    const colors = ['#6e8efb', '#ff7f50', '#50c878', '#ff69b4', '#ffa500'];
    let colorIndex = 0;
    
    colorBtn.addEventListener('click', function() {
        // Cycle through the colors array
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        
        // Change the button text to show the current color
        const colorNames = ['Blue', 'Coral', 'Emerald', 'Pink', 'Orange'];
        this.textContent = `Color: ${colorNames[colorIndex]}`;
    });
    
    // Image gallery / slideshow
    const images = [
        "https://picsum.photos/id/237/400/250", // Dog
        "https://picsum.photos/id/244/400/250", // Pelicans
        "https://picsum.photos/id/26/400/250",  // Bikes
        "https://picsum.photos/id/40/400/250",  // Desert
        "https://picsum.photos/id/64/400/250"   // Beach
    ];
    
    const currentImage = document.getElementById('current-image');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const imageCounter = document.getElementById('image-counter');
    let currentIndex = 0;
    
    // Function to update the displayed image
    function updateImage() {
        currentImage.src = images[currentIndex];
        imageCounter.textContent = `Image ${currentIndex + 1} of ${images.length}`;
    }
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    });
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    });
    
    // Auto slideshow every 3 seconds (can be paused by clicking the buttons)
    let slideshowInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    }, 3000);
    
    // Pause slideshow when interacting with the gallery
    [prevBtn, nextBtn].forEach(btn => {
        btn.addEventListener('click', () => {
            clearInterval(slideshowInterval);
            // Resume after 10 seconds of inactivity
            slideshowInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                updateImage();
            }, 3000);
        });
    });
    
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Get the associated content
            const content = this.nextElementSibling;
            
            // Check if this header is already active
            const isActive = this.classList.contains('active');
            
            // First, close all accordion items
            accordionHeaders.forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.classList.remove('active');
            });
            
            // If the clicked header wasn't active, open it
            if (!isActive) {
                this.classList.add('active');
                content.classList.add('active');
            }
        });
    });
    
    // ============== SECTION 3: FORM VALIDATION ==============
    
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    const formResult = document.getElementById('form-result');
    
    // Error message elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    
    // Real-time name validation
    nameInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            nameError.textContent = 'Name is required';
        } else {
            nameError.textContent = '';
        }
    });
    
    // Real-time email validation
    emailInput.addEventListener('input', function() {
        const email = this.value.trim();
        
        // Check if empty
        if (email === '') {
            emailError.textContent = 'Email is required';
            return;
        }
        
        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
        } else {
            emailError.textContent = '';
        }
    });
    
    // Password strength meter
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        let feedback = '';
        
        // Check if password is empty
        if (password === '') {
            strengthBar.style.width = '0%';
            strengthBar.style.backgroundColor = '#e9ecef';
            strengthText.textContent = 'Password strength';
            passwordError.textContent = 'Password is required';
            return;
        }
        
        // Check password length
        if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
        } else {
            passwordError.textContent = '';
            // Add points for length
            strength += 1;
        }
        
        // Add points for character variety
        if (/[A-Z]/.test(password)) strength += 1; // Uppercase
        if (/[a-z]/.test(password)) strength += 1; // Lowercase
        if (/[0-9]/.test(password)) strength += 1; // Numbers
        if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Special characters
        
        // Update strength meter
        switch (strength) {
            case 0:
            case 1:
                strengthBar.style.width = '20%';
                strengthBar.style.backgroundColor = '#e74c3c'; // Red
                feedback = 'Very weak';
                break;
            case 2:
                strengthBar.style.width = '40%';
                strengthBar.style.backgroundColor = '#e67e22'; // Orange
                feedback = 'Weak';
                break;
            case 3:
                strengthBar.style.width = '60%';
                strengthBar.style.backgroundColor = '#f1c40f'; // Yellow
                feedback = 'Medium';
                break;
            case 4:
                strengthBar.style.width = '80%';
                strengthBar.style.backgroundColor = '#2ecc71'; // Green
                feedback = 'Strong';
                break;
            case 5:
                strengthBar.style.width = '100%';
                strengthBar.style.backgroundColor = '#27ae60'; // Dark green
                feedback = 'Very strong';
                break;
        }
        
        strengthText.textContent = feedback;
    });
    
    // Confirm password validation
    confirmPasswordInput.addEventListener('input', function() {
        if (this.value !== passwordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
        } else {
            confirmPasswordError.textContent = '';
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent actual form submission
        
        // Validate all fields
        let isValid = true;
        
        // Name validation
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            isValid = false;
        }
        
        // Email validation
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Password validation
        if (passwordInput.value === '') {
            passwordError.textContent = 'Password is required';
            isValid = false;
        } else if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            isValid = false;
        }
        
        // Confirm password
        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
            isValid = false;
        }
        
        // Display form result
        if (isValid) {
            formResult.textContent = 'Form submitted successfully! 🎉';
            formResult.className = 'success fade-in';
            
            // Reset form after successful submission
            form.reset();
            strengthBar.style.width = '0%';
            strengthText.textContent = 'Password strength';
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                formResult.textContent = '';
                formResult.className = '';
            }, 3000);
        } else {
            formResult.textContent = 'Please fix the errors in the form';
            formResult.className = 'error fade-in';
            
            // Shake the form on error
            form.classList.add('shake');
            setTimeout(() => {
                form.classList.remove('shake');
            }, 500);
        }
    });
});