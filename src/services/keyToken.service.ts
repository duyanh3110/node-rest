import keyTokenModel from "../models/keytoken.model";

const createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
}: {
    userId: string;
    publicKey: string;
    privateKey: string;
}): Promise<string | null> => {
    try {
        const token = await keyTokenModel.create({
            user: userId,
            publicKey,
            privateKey,
        });

        return token ? token.publicKey : null;
    } catch (error) {
        throw error;
    }
};

const KeyTokenService = { createKeyToken };

export default KeyTokenService;
