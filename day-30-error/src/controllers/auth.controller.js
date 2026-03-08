export const registerController = async (req, res, next) => {
    // try {
    //     throw new Error("Encounter an error while registering new user");
    // } catch (err) {
    //     next(err);
    // }
    try{
        throw new Error('Password is too weak')
    }catch(err){
        err.status=400
        next(err)
    }
};
