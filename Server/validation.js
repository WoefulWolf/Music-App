class IsValid {
    String(val) {
        return (typeof val === 'string');
    }

    Email(val) {
        if (!this.String(val)) return false;

        return val.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    }
}

const isValid = new IsValid();
module.exports = isValid;