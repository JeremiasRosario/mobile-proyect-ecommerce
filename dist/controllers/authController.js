"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new userModel_1.default({ email, password });
        await user.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: error.message }); // Casting explícito
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel_1.default.findOne({ email });
        if (!user || user.password !== password) {
            res.status(401).json({ message: 'Credenciales inválidas' });
            return;
        }
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    }
    catch (error) {
        res.status(500).json({ message: error.message }); // Casting explícito
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=authController.js.map