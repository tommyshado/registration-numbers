
// elements references

// input__ elements
const input__ = document.querySelector("#reg__");

// Buttons
const show__ = document.querySelector("#showTown");
const resetLst__ = document.querySelector("#clearTowns");

// Lst
const lst__ = document.querySelector("#list__");

// Add buttons elements
const add__ = document.querySelector("#add__");

// message__s
const message__ = document.querySelector(".msg");

// local storage code

let regNumber__;

if (localStorage["dataTemplate"]) {
    regNumber__ = JSON.parse(localStorage["dataTemplate"]);

    // create a variable to store the registration numbers array from the local storage
    let regNumbersArray = Object.values(regNumber__);

    for (let i = 0; i < regNumbersArray.length; i++) {
        // grab the current registration number array
        const currentRegNumberArray__ = regNumbersArray[i];
        
        // loop over the length of the current registration number array
        for (let j = 0; j < currentRegNumberArray__.length; j++) {
            // grab the current registration number
            const currentRegNumber__ = currentRegNumberArray__[j];
            
            // create an empty list element
            const element__ = document.createElement('li');
            // set the text of the empty element to the current registration number
            element__.innerHTML = currentRegNumber__;
            element__.classList.add('registrationPlate');

            lst__.append(element__);
        }
    }
};

// App instance
const App = RegistrationApp(regNumber__);

let regNumbers = App.getRegNums();
let regNumbersClone = [];

// templating data
const templateSource = document.querySelector(".template").innerHTML;
let lstData = document.querySelector(".lstData");
const regTemplate = Handlebars.compile(templateSource);

// Events

add__.addEventListener("click", () => {
    if (input__.value === "") {
        message__.innerHTML = "Please enter a registration number."
        message__.classList.add("danger");
        message__.classList.add("box-model");
    
        setTimeout(() => {
            message__.innerHTML = "";
            message__.classList.remove("danger");
            message__.classList.remove("box-model");
        }, 3000);

        return;
    };

    const setReg = App.setRegNum(input__.value);
    if (setReg) {

        for (const currentRegNum in regNumbers) {
            const regNumArray = regNumbers[currentRegNum];

            for (const regNum in regNumArray) {
                regNumbersClone.push(regNumArray[regNum]);
            };
        };

        let regNumbersHtml = regTemplate({ regNums: regNumbersClone});
        lstData.innerHTML = regNumbersHtml;

        const lstOfRegNums = lstData.getElementsByTagName("li");
        
        for (let i = 0; i < lstOfRegNums.length; i++) {
            lstOfRegNums[i].classList.add("registrationPlate");
        };

        message__.innerHTML = "Added successfully."
        message__.classList.add("success");
        message__.classList.add("box-model");
    
        setTimeout(() => {
            message__.innerHTML = "";
            message__.classList.remove("success");
            message__.classList.remove("box-model");
        }, 3000);

    } else if (setReg === false) {

        message__.innerHTML = "Registration number already added."
        message__.classList.add("danger");
        message__.classList.add("box-model");
    
        setTimeout(() => {
            message__.innerHTML = "";
            message__.classList.remove("danger");
            message__.classList.remove("box-model");
        }, 3000);

        if (lst__.innerHTML === "") {
            lst__.remove("registrationPlate");
        };

    } else {

        message__.innerHTML = "Registration number is invalid. eg. CA 6637, cj 774-444, Cl 625";
        message__.classList.add("danger");
        message__.classList.add("box-model");
    
        setTimeout(() => {
            message__.innerHTML = "";
            message__.classList.remove("danger");
            message__.classList.remove("box-model");
        }, 3000);

        if (lst__.innerHTML === "") {
            lst__.remove("registrationPlate");
        };
    };

    // set the input__ area to an empty string
    input__.value = "";

    // update the local storage
    localStorage.setItem(
        "dataTemplate",
        JSON.stringify(App.getRegNums())
    );
});

show__.addEventListener("click", () => {

    const towns = document.querySelector('input[name="towns"]:checked');

    if (towns) {
        lst__.innerHTML = "";
        // create a variable to store the reg numbers list from the factory function
        const townsArray__ = App.filter(towns.value);

        if (townsArray__.length === 0) {
            message__.innerHTML = `No registration number for ${towns.value}.`
            message__.classList.add("danger");
            message__.classList.add("box-model");
        
            setTimeout(() => {
                message__.innerHTML = "";
                message__.classList.remove("danger");
                message__.classList.remove("box-model");
            }, 3000);
        };

        regNumbersClone = [];
        // iterate over the length of the list
        for (let i = 0; i < townsArray__.length; i++) {
            // create a list element for every reg number and log it
            regNumbersClone.push(townsArray__[i]);

            let regNumbersHtml__ = regTemplate({ regNums: regNumbersClone});
            lstData.innerHTML = regNumbersHtml__;
        };

        const lstOfRegNums__ = lstData.getElementsByTagName("li");
        
        for (let i = 0; i < lstOfRegNums__.length; i++) {
            lstOfRegNums__[i].classList.add("registrationPlate");
        };
    };

    message__.classList.add('danger');
    message__.classList.add('box-model');

    if (message__.innerHTML === "") {
        message__.classList.remove("danger");
        message__.classList.remove("box-model");
    };
    
});

resetLst__.addEventListener("click", () => {
    localStorage.setItem(
        "dataTemplate",
        JSON.stringify(App.clear())
    );
    location.reload();
});
