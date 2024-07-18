import shopModel from "../models/shop.model";
import bcrypt from "bcrypt";
import crypto from "crypto";
import KeyTokenService from "./keyToken.service";
import AuthUtils from "../auth/authUtils";
import AppUtils from "../utils";

const ShopRoles = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
};

const signUp = async ({
    name,
    email,
    password,
}: {
    name: string;
    email: string;
    password: string;
}) => {
    try {
        const currentShop = await shopModel.findOne({ email }).lean();

        if (currentShop) {
            return {
                code: "xxxx",
                message: "Shop already exists!",
            };
        }

        const passwordHashed = await bcrypt.hash(password, 10);
        const newShop = await shopModel.create({
            name,
            email,
            password: passwordHashed,
            roles: [ShopRoles.SHOP],
        });

        if (newShop) {
            // PRIVATE KEY: Sign token
            // PUBLIC KEY: Verify token
            const privateKey = crypto.randomBytes(64).toString("hex");
            const publicKey = crypto.randomBytes(64).toString("hex");

            const keyStore = await KeyTokenService.createKeyToken({
                userId: newShop._id.toString(),
                publicKey,
                privateKey,
            });

            if (!keyStore) {
                return {
                    code: "xxxx",
                    message: "keyStore error",
                };
            }

            // Create token pair
            const tokens = await AuthUtils.createTokenPair(
                { userId: newShop._id.toString(), email },
                publicKey,
                privateKey
            );
            console.log(`Created Token Success ::: `, tokens);

            return {
                code: 201,
                metadata: {
                    shop: AppUtils.getInfoData({
                        fields: ["_id", "name", "email"],
                        object: newShop,
                    }),
                    tokens,
                },
            };
        }
    } catch (error) {
        return {
            code: "xxx",
            message: (error as Error).message,
            status: "error",
        };
    }
};

const AccessServices = { signUp };

export default AccessServices;
