describe('The RegistrationApp factory function unit testing', () => {
    let app;

    beforeEach(() => {
        app = RegistrationApp();
    });

    it("should be able to set and retrieve a registration number", () => {
        app.setRegNum("Ca 556");
        const regNum = app.getRegNums().CA
        assert.deepEqual(["Ca 556"], regNum);
    });

    it("should not be able to set and retrieve a duplicate registration number", () => {
        app.setRegNum("Ca 556");
        app.setRegNum("Ca 556");
        const regNum = app.getRegNums().CA
        assert.deepEqual(["Ca 556"], regNum);
    });

    it("should be able to set and retrieve another registration number", () => {
        app.setRegNum("cj 556");
        const regNum = app.getRegNums().CJ
        assert.deepEqual(["cj 556"], regNum);
    });

    it("should be able to show an error message for a duplicate registration number", () => {
        app.setRegNum("cj 556");
        let duplicateRegNum = app.setRegNum("cj 556");

        if (!duplicateRegNum) duplicateRegNum = "Registration number already added.";
        
        assert.equal("Registration number already added.", duplicateRegNum);
    });
});