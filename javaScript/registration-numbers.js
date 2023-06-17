const RegistrationApp = (regNumber) => {
    // global variable

    let registrationNumber = '';

    // error messages

    let inputErrorMessage = '';
    let showErrorMessage = '';

    // objects variables

    const townsRegistrationObject = regNumber || {
        'CA': [],
        'CL': [],
        'CJ': [],
    }

    // set functions

    const setRegistrationNumber = clientRegistrationNumber => {
        registrationNumber = '';
        let registration = clientRegistrationNumber.toUpperCase().trim();

        const validRegistrationNumber = () => {
            const regexPattern = /^C[AJL]( |)(\d{3,6}|\d{1,5}(-| )\d{1,5})$/;

            if (regexPattern.test(registration)) {
                registrationNumber = registration;
            } else if (registration !== '') {
                inputErrorMessage = 'Please enter a valid registration number. e.g CA 435-546, CL 657, CJ 75755';
            } else {
                inputErrorMessage = 'Please enter a registration number.';
            }
        }

        return {
            validRegistrationNumber
        }
    }

    const addRegistrationForTown = () => {
        // grab the towns registration in the townsRegistrationObject
        const registrationsArray = Object.keys(townsRegistrationObject);

        // get the first two characters in the registrationNumber string
        const firstCharsOfRegistrationNum = registrationNumber.slice(0, 2);

        if (registrationsArray.includes(firstCharsOfRegistrationNum)) {
            // create a variable to store the empty array from the townsRegistrationObject
            const townsArray = townsRegistrationObject[firstCharsOfRegistrationNum];

            if (!townsArray.includes(registrationNumber)) {
                townsArray.push(registrationNumber);
                return registrationNumber;
            } else {
                inputErrorMessage = `${registrationNumber} registration number already entered.`;
                return '';
            }
        }
        return '';
    }


    // get functions

    const filter = (dropdownValue) => {

        // I discovered that when I compared the townsRegistrationObject[dropdownValue] === [], 
        // when the townsRegistrationObject[dropdownValue] value is equal to [] it returns false when I use alert() function

        // so instead I used townsRegistrationObject[dropdownValue].length === 0, and it returned true

        if (townsRegistrationObject[dropdownValue].length === 0) {
            showErrorMessage = 'There are no registration numbers for the selected town.';
        }

        if (dropdownValue === null) {
            showErrorMessage = 'Please select a button first.';
        }

        // I also discovered that an if statement with that returns results has to be the last condition 

        if (townsRegistrationObject[dropdownValue].length > 0) {
            // returning the array of the registration numbers in the object
            return townsRegistrationObject[dropdownValue];
        }

        return '';
    }

    const getTownRegistration = () => {
        // returning the whole object for the registration numbers
        return townsRegistrationObject;
    }

    const getMessage = () => {
        return {
            'errorMessageForAddBtn' : inputErrorMessage,
            'errorMessageForShowBtn' : showErrorMessage,
        }
    }

    // returning the functions as an object

    return {
        setRegistrationNumber,
        addRegistrationForTown,
        filter,
        getTownRegistration,
        getMessage,
    }
}