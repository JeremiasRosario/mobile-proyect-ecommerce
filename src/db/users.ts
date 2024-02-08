import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, require: true },
    email: { type: String, requiered: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionStorage: { type: String, select: false },
    }

});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUsersByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sesionToken: String) => UserModel.findOne({
    'authentication.sessionToken': sesionToken,
});
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUSerById = (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
