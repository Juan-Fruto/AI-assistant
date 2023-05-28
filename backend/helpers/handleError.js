export const httpError = (res, error) => {
    console.log(error);
    res.status(500).json({error});
}