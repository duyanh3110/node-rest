import JWT from "jsonwebtoken";

const createTokenPair = async (
    payload: string | object | Buffer,
    publicKeyString: string,
    privateKey: string
) => {
    try {
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "2 days",
        });

        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "7 days",
        });

        JWT.verify(accessToken, publicKeyString, (err, decode) => {
            if (err) {
                console.error(`error verify ::: `, err);
            } else {
                console.log(`decode verify ::: `, decode);
            }
        });
        return { accessToken, refreshToken };
    } catch (error) {}
};

const AuthUtils = { createTokenPair };

export default AuthUtils;
