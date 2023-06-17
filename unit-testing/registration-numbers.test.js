describe('The RegistrationApp factory function unit testing', () => {
    let app;

    beforeEach(() => {
        app = RegistrationApp();
    });

    describe('set valid registration numbers', () => {

        it('should be able to return a valid registration number', () => {

            app.setRegistrationNumber('ca 534-454').validRegistrationNumber();
            assert.equal('CA 534-454', app.addRegistrationForTown());
        });

        it('should be able to return another valid registration number', () => {

            app.setRegistrationNumber('cl 7484').validRegistrationNumber();
            assert.equal('CL 7484', app.addRegistrationForTown());
        });

        it('should be able to show an error message when the registration is not valid', () => {
            app.setRegistrationNumber('ca 53').validRegistrationNumber();
            assert.equal('Please enter a valid registration number. e.g CA 435-546, CL 657, CJ 75755', app.getMessage().errorMessageForAddBtn);
        });
    });

    describe('add a valid registration number to towns object', () => {

        it('should be able to add a registration number to a certain town array', () => {
            app.setRegistrationNumber('cl 7464').validRegistrationNumber();
            app.addRegistrationForTown();
    
            assert.deepEqual({ CA: [], CL: [ 'CL 7464' ], CJ: [] }, app.getTownRegistration());
        });

        it('should be able to add two registration number to a certain town array', () => {
            app.setRegistrationNumber('ca 763-664').validRegistrationNumber();
            app.addRegistrationForTown();

            app.setRegistrationNumber('ca 554').validRegistrationNumber();
            app.addRegistrationForTown()
    
            assert.deepEqual({ CA: ['CA 763-664', 'CA 554'], CL: [], CJ: [] }, app.getTownRegistration());
        });

        it('should not be able to add a duplicate of a registration number', () => {
            app.setRegistrationNumber('ca 534').validRegistrationNumber();
            app.addRegistrationForTown();

            app.setRegistrationNumber('ca 534').validRegistrationNumber();
            app.addRegistrationForTown();

            assert.equal('CA 534 registration number already entered.', app.getMessage().errorMessageForAddBtn);
        });
    });

    describe('filtering testing', () => {
        
    });
});