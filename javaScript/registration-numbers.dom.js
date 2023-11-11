// elements references

// Input elements
const input = document.querySelector("#reg");

// Buttons
const show = document.querySelector("#show");
const resetLst = document.querySelector("#clearLst");

// Lst
const lst = document.querySelector("#list");

// Add buttons elements
const add = document.querySelector("#add");

// messages
const message = document.querySelector(".messages");

// local storage code

let regNumber;

if (localStorage["regNumbersData"]) {
    regNumber = JSON.parse(localStorage["regNumbersData"]);

    // create a variable to store the registration numbers array from the local storage
    let regNumbersArray = Object.values(regNumber);

    for (let i = 0; i < regNumbersArray.length; i++) {
        // grab the current registration number array
        const currentRegNumberArray = regNumbersArray[i];
        
        // loop over the length of the current registration number array
        for (let j = 0; j < currentRegNumberArray.length; j++) {
            // grab the current registration number
            const currentRegNumber = currentRegNumberArray[j];
            
            // create an empty list element
            const element = document.createElement('li');
            // set the text of the empty element to the current registration number
            element.innerHTML = currentRegNumber;
            element.classList.add('registrationPlate');

            lst.append(element);
        }
    }
}

// factory function instance

const app = RegistrationApp(regNumber);

// function

const addElement = (registration) => {
    if (registration !== "") {
        const element = document.createElement("li");
        const node = document.createTextNode(registration);

        element.append(node);

        element.classList.add("registrationPlate");

        lst.insertBefore(element, lst.children[0]);
    }
};

// events

add.addEventListener("click", () => {
    if (input.value === "") {
        message.innerHTML = "Please enter a registration number."
        message.classList.add("danger");
        message.classList.add("box-model");
    
        setTimeout(() => {
            message.innerHTML = "";
            message.classList.remove("danger");
            message.classList.remove("box-model");
        }, 3000);

        return;
    };

    const setRegNumber = app.setRegNum(input.value);
    if (setRegNumber) {
        // Create an element
        addElement(input.value);

        message.innerHTML = "Added successfully."
        message.classList.add("success");
        message.classList.add("box-model");
    
        setTimeout(() => {
            message.innerHTML = "";
            message.classList.remove("success");
            message.classList.remove("box-model");
        }, 3000);

    } else if (setRegNumber === false) {

        message.innerHTML = "Registration number already added."
        message.classList.add("danger");
        message.classList.add("box-model");
    
        setTimeout(() => {
            message.innerHTML = "";
            message.classList.remove("danger");
            message.classList.remove("box-model");
        }, 3000);

        if (lst.innerHTML === "") {
            lst.remove("registrationPlate");
        };

    } else {

        message.innerHTML = "Registration number is invalid. eg. CA 6637, cj 774-444, Cl 625";
        message.classList.add("danger");
        message.classList.add("box-model");
    
        setTimeout(() => {
            message.innerHTML = "";
            message.classList.remove("danger");
            message.classList.remove("box-model");
        }, 3000);

        if (lst.innerHTML === "") {
            lst.remove("registrationPlate");
        };
    };

    // set the input area to an empty string
    input.value = "";

    // update the local storage
    localStorage.setItem(
        "regNumbersData",
        JSON.stringify(app.getRegNums())
    );

});

show.addEventListener("click", () => {

    const places = document.querySelector('input[name="registrations"]:checked');

    if (places) {
        lst.innerHTML = "";
        // create a variable to store the reg numbers list from the factory function
        const townsArray = app.filter(places.value);

        if (townsArray.length === 0) {
            message.innerHTML = `No registration number for ${places.value}.`
            message.classList.add("danger");
            message.classList.add("box-model");
        
            setTimeout(() => {
                message.innerHTML = "";
                message.classList.remove("danger");
                message.classList.remove("box-model");
            }, 3000);
        };

        // iterate over the length of the list
        for (let i = 0; i < townsArray.length; i++) {

            // create a list element for every reg number and log it
            addElement(townsArray[i]);
        };
    };

    message.classList.add('danger');
    message.classList.add('box-model');

    if (message.innerHTML === "") {
        message.classList.remove("danger");
        message.classList.remove("box-model");
    };
    
});

resetLst.addEventListener("click", () => {
    if (confirm("Press Ok to clear registration number or Cancel to abort.")) {
        localStorage.setItem(
            "regNumbersData",
            JSON.stringify(app.clear())
        );
        location.reload();
    };
});
