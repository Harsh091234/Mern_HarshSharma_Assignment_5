
import bcrypt from "bcryptjs";
import {type Types, Schema, model, Document} from "mongoose";

export interface IRefreshToken extends Document {
  user: Types.ObjectId;

  token: string;

  device: {
    deviceId?: string;
    userAgent?: string;
  };

  createdAt: Date;
  updatedAt: Date;
}

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    token: {
      type: String,
      required: true,
      unique: true,
    },

    device: {
      deviceId: String,
      userAgent: String,
    },
  },
  { timestamps: true }
);

refreshTokenSchema.pre(
  "save",
  async function (this: IRefreshToken) {
    if (!this.isModified("token")) return;

  
      this.token = await bcrypt.hash(this.token, 10);
    return;
  }
);

refreshTokenSchema.index(
  {
    createdAt: 1,
  },
  {
    expireAfterSeconds: 900,
  }
);

export const RefreshToken = model("RefreshToken", refreshTokenSchema);
