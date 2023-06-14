const RegistrationApp = (regNumber) => {
    // global variable

    let registrationNumber = '';
    let errorMessage = '';

    // objects variables

    const notDuplicateRegistration = {};
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
                errorMessage = 'Please enter a valid registration number. e.g CA 435-546, CL 657, CJ 75755';
            } else {
                errorMessage = 'Please enter a registration number.';
            }
        }

        return {
            validRegistrationNumber
        }
    }

    const addRegistrationTownsObject = () => {
        // grab the towns registration in the townsRegistrationObject
        const registrationsArray = Object.keys(townsRegistrationObject);

        // get the first two characters in the registrationNumber string
        const firstCharsOfRegistrationNum = registrationNumber.slice(0, 2);

        if (registrationsArray.includes(firstCharsOfRegistrationNum)) {
            // create a variable to store the empty array from the townsRegistrationObject
            const townsArray = townsRegistrationObject[firstCharsOfRegistrationNum];

            if (!townsArray.includes(registrationNumber)) {
                townsArray.push(registrationNumber);
            }
        }
    }


    // get functions

    const getRegistrationNumber = () => {
        if (notDuplicateRegistration[registrationNumber] === undefined) {
            notDuplicateRegistration[registrationNumber] = 1;
            return registrationNumber;
        } else {
            errorMessage = `${registrationNumber} registration number already entered.`;
            return '';
        }
    }

    const filter = dropdownValue => {
        if (dropdownValue !== undefined) {
            if (townsRegistrationObject[dropdownValue] !== []) {
                // returning the array of the registration numbers in the object
                return townsRegistrationObject[dropdownValue];
            } else {
                errorMessage = 'There are no registration numbers for the selected town.';
            }

        } else {
            errorMessage = 'Please select a button first.';
        }
    }

    const getTownRegistration = () => {
        // returning the whole object for the registration numbers
        return townsRegistrationObject;
    }

    const getMessage = () => {
        return errorMessage;
    }

    // returning the functions as an object

    return {
        setRegistrationNumber,
        getRegistrationNumber,
        addRegistrationTownsObject,
        filter,
        getTownRegistration,
        getMessage,
    }
}