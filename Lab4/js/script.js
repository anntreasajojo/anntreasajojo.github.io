async function pageLoad() {
    let stateSelect = document.querySelector("#states");
    let url = `https://csumb.space/api/allStatesAPI.php`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        console.log("STATES OBJECT",data);

        for(let i = 0; i<data.length; i++){
            let option = document.createElement("option");
            option.textContent = data[i].state; 
            option.value = data[i].usps; 
            stateSelect.appendChild(option); 

        }

    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }

    stateSelect.addEventListener("change", function(){
        let selectedState = stateSelect.value;

        if(selectedState === ""){
            return; 
            
        }
        loadCounties(selectedState); 


    }); 

}
async function loadCounties(state) {
    let countiesSelect = document.querySelector("#counties");
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        console.log("COUNTIES OBJECT",data);

        for(let i = 0; i<data.length; i++){
            let option = document.createElement("option");
            option.textContent = data[i].county; 
            option.value = data[i].county; 
            countiesSelect.appendChild(option); 
        }

    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }


    
}

pageLoad();
let zipCodeInput = document.querySelector("#zipCodeInput");
let zipCodeMsg = document.querySelector("#zipCodeMsg");

zipCodeInput.addEventListener("input", async function () {

    zipCodeMsg.textContent = "";
    let zipCode = zipCodeInput.value;

    if (zipCode.length != 5) {
        return;
    }

    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        console.log("ZIPCODE OBJECT", data);

        console.log("lat: ", data.latitude, typeof data.latitude)

        if (data.latitude == undefined && data.longitude == undefined) {
            zipCodeMsg.textContent = "Zip code not found.";
            return;
        }

        document.querySelector("#cityDisplay").textContent = data.city;
        document.querySelector("#latitudeDisplay").textContent = data.latitude;
        document.querySelector("#longitudeDisplay").textContent = data.longitude;
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
});

let passwordInput = document.querySelector("#passwordInput");
let passwordGuess = document.querySelector("#passwordGuess");
let passwordCheck = document.querySelector("#passwordCheck");


passwordInput.addEventListener("click", async function () {
    let url = `https://csumb.space/api/suggestedPassword.php?length=8`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        console.log("PASSWORD OBJECT", data);
        passwordGuess.textContent = data.password;
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
})

let passwordAgainInput = document.querySelector("#passwordAgainInput");
let passwordMatchingMsg = document.querySelector("#passwordMatchingMsg");


let userNameInput = document.querySelector("#userNameInput");
let usernameAvailability = document.querySelector("#usernameAvailability");
let usernameCheck = document.querySelector("#usernameCheck");
userNameInput.addEventListener("input", async function () {
    username = userNameInput.value;

     if (username.length < 3){
        usernameAvailability.textContent = "";
        return;
     } 

    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        console.log("USERNAME OBJECT", data);

        if (data.available) {
            usernameAvailability.textContent = "Username available";
            usernameAvailability.style.color = "green"
        } else {
            usernameAvailability.textContent = "Username not available";
            usernameAvailability.style.color = "red";
        }


    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
})


let signUpBtn = document.querySelector("#signUp")
signUpBtn.addEventListener("click", function () {
    let username = userNameInput.value;
    let password = passwordInput.value;
    let passwordAgain = passwordAgainInput.value;

    let valid = true;

    usernameCheck.textContent = "";
    passwordCheck.textContent = "";
    passwordMatchingMsg.textContent = "";
    document.querySelector("#errorMsg").textContent = "";

    if (username.length < 3) {
        usernameCheck.textContent = "Username must be at least 3 characters";
        usernameCheck.style.color = "orange";
        valid = false;
    }

    if (password.length < 6) {
        passwordCheck.textContent = "Password must be at least 6 characters";
        passwordCheck.style.color = "orange";
        valid = false;
    }

    if (password !== passwordAgain) {
        passwordMatchingMsg.textContent = "Passwords must match";
        passwordMatchingMsg.style.color = "orange";
        valid = false;
    }

    if (!valid) {
        document.querySelector("#errorMsg").textContent = "Please fix the errors above.";
        document.querySelector("#errorMsg").style.color = "red";
    } else {
        document.querySelector("#errorMsg").textContent = "Form submitted successfully!";
        document.querySelector("#errorMsg").style.color = "green";
    }
    
})



