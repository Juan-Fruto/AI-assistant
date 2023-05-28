import { check, validationResult }  from 'express-validator';

const validations = [

    check('brandName')
        .exists().withMessage('Please insert the brand name')
        .isLength({min: 1, max: 50}).withMessage("The length has to be at least 1 and at most 50"),

    check('legalName')
        .exists().withMessage("The legal name has not been provided")
        .isLength({min: 5, max: 50}).withMessage("The length has to be at least 5 and at most 50")
        .isAscii().withMessage("The special characters are not allowed"),

    check('username')
        .exists().withMessage("The username has not been provided")
        .isLength({min: 5, max: 15}).withMessage("The length has to be at least 5 and at most 15")
        .isAscii().withMessage("The special characters are not allowed"),
    
    check('name')
        .exists().withMessage("The name has not been provided")
        .isLength({min: 5, max: 50}).withMessage("The length has to be at least 5 and at most 50")
        .isAscii().withMessage("The special characters are not allowed"),
    
    check('password')
        .exists().withMessage("The password has not been provided")
        .isLength({min: 5, max: 20}).withMessage("The length has to be at least 5 and at most 20")
        .isAscii().withMessage("The special characters are not allowed"),
    
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