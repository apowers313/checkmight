function promisePlugin(mod) {
    const {TypeCheck, DoesCheck, CheckMightError} = mod;

    new TypeCheck("Promise", function(v) {
        return v instanceof Promise;
    });

    new DoesCheck("Promise", "Resolve", function(v) {
        return v
            .then((v) => {
                // this.pending?
                // this.value?
                return v;
            })
            .catch((err) => {
                throw new CheckMightError(this);
            });
    });

    new DoesCheck("Promise", "Reject", function(v) {
        return v
            .then(() => {
                return Promise.reject(new CheckMightError(this));
            }, (err) => {
                return Promise.resolve(err);
            });
    });
}

module.exports = promisePlugin;
