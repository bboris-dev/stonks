
export const className = (base, opts) => {
    const classes = [base];
    for (let cl in opts) {
        if (!opts.hasOwnProperty(cl)) {
            continue;
        }

        if (opts[cl]) {
            classes.push(cl);
        }
    }
    return classes.join(' ');
};