import { check, validationResult }  from 'express-validator';

const validations = [

    check('username')
        .exists().withMessage("The username has not been provided"),
        //.isEmpty().withMessage("Please insert your username")

    check('password')
        .exists().withMessage("The username has not been provided"),
        //.isEmpty().withMessage("Please insert your password")

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