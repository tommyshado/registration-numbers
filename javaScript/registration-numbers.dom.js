// elements references

const input = document.querySelector("#reg");
const show = document.querySelector("#show");
const lst = document.querySelector("#list");
const add = document.querySelector("#add");
const message = document.querySelector(".messageForError");

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

    // validating the registration number from the client
    app.setRegistrationNumber(input.value).validRegistrationNumber();

    // create an element for the current registration number
    
    addElement(app.addRegistrationForTown());
    
    if (lst.innerHTML === "") {
        lst.remove("registrationPlate");
    }

    // set the input area to an empty string
    input.value = "";

    message.innerHTML = app.getMessage().errorMessageForAddBtn;
    message.classList.add("danger");
    message.classList.add("box-model");

    if (message.innerHTML === "") {
        message.classList.remove("danger");
        message.classList.remove("box-model");
    }

    // update the local storage every a registration is added
    localStorage.setItem(
        "regNumbersData",
        JSON.stringify(app.getTownRegistration())
    );

});

show.addEventListener("click", () => {

    const places = document.querySelector('input[name="registrations"]:checked');

    if (places) {
        lst.innerHTML = "";
        // create a variable to store the reg numbers list from the factory function
        const townsArray = app.filter(places.value);

        // iterate over the length of the list
        for (let i = 0; i < townsArray.length; i++) {

            // create a list element for every reg number and log it
            addElement(townsArray[i]);
        }
    }
    
    message.innerHTML = app.getMessage().errorMessageForShowBtn;
    message.classList.add('danger');
    message.classList.add('box-model');

    if (message.innerHTML === "") {
        message.classList.remove("danger");
        message.classList.remove("box-model");
    }
    
});
