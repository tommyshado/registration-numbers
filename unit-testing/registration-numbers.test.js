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

    it("should be able to filter for town", () => {
        app.setRegNum("cj 534");
        app.setRegNum("ca 231");
        app.setRegNum("cj 773-647");
        app.setRegNum("cl 534");

        assert.deepEqual(["ca 231"], app.filter("CA"));
    });

    it("should not be able to filter for an unknown town", () => {
        app.setRegNum("cj 534");
        app.setRegNum("ca 231");
        app.setRegNum("cj 773-647");
        app.setRegNum("cl 534");

        assert.deepEqual(undefined, app.filter("CK"));
    });
});