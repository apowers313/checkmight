function promisePlugin(mod) {
    const {TypeCheck, DoesCheck, CheckMightError} = mod;

    new TypeCheck("Promise", function(v) {
        return v instanceof Promise;
    });

    new DoesCheck("Promise", "Resolve", function(v) {
        return v
            .then((v) => {
                console.log("promise resolved");
                // this.pending?
                // this.value?
                return v;
            })
            .catch((err) => {
                console.log("promise threw");
                throw new CheckMightError(this);
            });
    });
}

module.exports = promisePlugin;
