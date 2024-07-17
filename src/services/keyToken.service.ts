import keyTokenModel from "../models/keytoken.model";

const createKeyToken = async ({
    userId,
    publicKey,
}: {
    userId: string;
    publicKey: string;
}): Promise<string | null> => {
    try {
        const publicKeyString = publicKey.toString();
        const token = await keyTokenModel.create({
            user: userId,
            publicKey: publicKeyString,
        });

        return token ? token.publicKey : null;
    } catch (error) {
        throw error;
    }
};

const KeyTokenService = { createKeyToken };

export default KeyTokenService;
