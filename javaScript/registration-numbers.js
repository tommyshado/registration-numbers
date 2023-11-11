const RegistrationApp = (regNumber) => {

    const setRegNumHelper = (regNum) => {
        const upperCaseRegNum = regNum.toUpperCase();
        const regexPattern = /^C[AJL]( |)(\d{3,6}|\d{1,5}(-| )\d{1,5})$/;
        return regexPattern.test(upperCaseRegNum);
    };

    let regNums = regNumber || { "CA": [], "CJ": [], "CL": [] };

    const setRegNum = (regNum) => {
        if (setRegNumHelper(regNum)) {
            for (const regNumber in regNums) {
                if (regNum.toUpperCase().startsWith(regNumber) && !regNums[regNumber].includes(regNum)) {
                    regNums[regNumber].push(regNum);
                    // Case where reg number passes
                    return true;
                };
            };
            // Case where registration number is a duplicate
            return false;
        };
    };

    const filter = (reg) => {
        return regNums[reg];
    };

    const clear = () => {
        regNums = { "CA": [], "CJ": [], "CL": [] };
    };

    const getRegNums = () => {
        return regNums;
    };

    return {
        setRegNum,
        filter,
        clear,
        getRegNums
    };
};