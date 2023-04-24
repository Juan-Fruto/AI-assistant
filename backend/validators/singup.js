import { check, validationResult }  from 'express-validator';

const validations = [

    check('brandName')
        .exists().withMessage('Please insert the brand name')
        .isLength({min: 1, max: 50}).withMessage("The length has to be at least 1 and at most 50"),

    check('legalName')
        .exists().withMessage("The legal name has not been provided")
        .isLength({min: 5, max: 50}).withMessage("The length has to be at least 5 and at most 50")
        .isAscii().withMessage("The special characters are not allowed"),
];

export default validations;