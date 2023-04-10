import { check, validationResult }  from 'express-validator';

const validations = [

    check('username')
        .exists().withMessage("The username has not been provided")
        //.isEmpty().withMessage("Please insert your username")
        .isLength({min: 5, max: 20}).withMessage("The length has to be at least 5 and at most 20")
        .isAscii().withMessage("The special characters are not allowed"),

    check('password')
        .exists().withMessage("The username has not been provided")
        //.isEmpty().withMessage("Please insert your password")
        .isLength({min: 5, max: 20}).withMessage("The length has to be at least 5 and at most 20")
        .isAlphanumeric().withMessage("Letters and numbers are only allowed"),

    (req, res, next) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                const firstError = errors.array()[0];
                res.status(403).json({ message: firstError });
            } else {
                next();
            }
        } catch (error) {
            res.status(403).json({message: error});
            console.error('error', error);
        }
    }

];

export default validations;