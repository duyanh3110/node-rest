import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "Keys";
const COLLECTION_NAME = "Keys";

const keyTokenSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Shop",
        },
        privateKey: {
            type: String,
            required: true,
        },
        publicKey: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

export default model(DOCUMENT_NAME, keyTokenSchema);
