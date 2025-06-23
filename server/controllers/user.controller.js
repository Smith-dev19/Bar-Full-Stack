import { PrismaClient } from "@prisma/client";
import bcrypt, { hash } from "bcryptjs"
import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";
import { createAccesToken } from "../libs/jwt.js";
const prisma = new PrismaClient();
export const register = async (req, res) => {
  const { userName, name, lastName, email, password, phone, roleId, storeId } =
    req.body;

  try {
    const userFound = await prisma.user.findUnique({
      where: { email }
    });

    if (userFound) {
        return res.status(400).json(["Email is already in use"]);
    }

    const passwordHash = await bcrypt.hash(password,10)

    const newUser = await prisma.user.create({
      data: {
        userName,
        name,
        lastName,
        email,
        password : passwordHash,
        phone,
        roleId,
        storeId,
      },
    });
    const token = await createAccesToken({
        id: newUser.id,
        userName: newUser.userName,
        name: newUser.name,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
        roleId: newUser.roleId,
        storeId: newUser.storeId,
      })
    res.cookie("token",token)
    res.json({
      id: newUser.id,
      userName: newUser.userName,
      name: newUser.name,
      lastName: newUser.lastName,
      email: newUser.email,
      phone: newUser.phone,
      roleId: newUser.roleId,
      storeId: newUser.storeId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};
