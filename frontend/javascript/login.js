const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const passwordStrengthSpan = document.getElementById("password-strength");

function updatePasswordStrength() {
    const password = passwordInput.value;

    const strength = calculatePasswordStrength(password);

    if (strength >= 12) {
        passwordStrengthSpan.textContent = "Strong";
        passwordStrengthSpan.style.color = "green";
    } else if (strength >= 6) {
        passwordStrengthSpan.textContent = "Moderate";
        passwordStrengthSpan.style.color = "orange";
    } else {
        passwordStrengthSpan.textContent = "Weak";
        passwordStrengthSpan.style.color = "red";
    }
}

loginForm.addEventListener("submit", function(event) {
    event.preventDefault(); 

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const isAdmin = document.getElementById("isAdmin").checked;

    // Password complexity 
    const missingRequirements = [];

    if (!/[A-Z]/.test(password)) {
        missingRequirements.push("an uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
        missingRequirements.push("a lowercase letter");
    }
    if (!/\d/.test(password)) {
        missingRequirements.push("a number");
    }
    if (!/[!@#$%^&*]/.test(password)) {
        missingRequirements.push("a special character (!@#$%^&*)");
    }

    if (email && password && name && missingRequirements.length === 0) {
        const user = {
            email,
            password,
            name,
            isAdmin
        };

        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "../pages/home.html";
    } else {
        let errorMessage = "Please fill in all the required fields and ensure the password includes ";
        
        if (missingRequirements.length > 0) {
            errorMessage += missingRequirements.join(", ");
        } else {
            errorMessage += "at least one uppercase letter, one lowercase letter, one number, and one special character.";
        }

        alert(errorMessage);
    }
});


passwordInput.addEventListener("input", updatePasswordStrength);

function calculatePasswordStrength(password) {
    
    let strength = 0;

    
    const criteria = [
        { regex: /[A-Z]/, weight: 2 }, // Uppercase letters
        { regex: /[a-z]/, weight: 2 }, // Lowercase letters
        { regex: /\d/, weight: 2 },     // Numbers
        { regex: /[!@#$%^&*]/, weight: 3 }, // Special characters
        { regex: /.{8,}/, weight: 3 }, // Minimum length of 8 characters
    ];

    // Calculate 
    for (const criterion of criteria) {
        if (criterion.regex.test(password)) {
            strength += criterion.weight;
        }
    }

    return strength;
}
