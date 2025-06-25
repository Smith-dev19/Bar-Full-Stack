import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"
import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";
import { createAccesToken } from "../libs/jwt.js";

//constante que inicia el cliente de prisma para hacer manejo a la base de datos 
const prisma = new PrismaClient();

//Funcion de registro
export const register = async (req, res) => {
  //Datos que se extraeran del req.body
  const { userName, name, lastName, email, password, phone, roleId, storeId,statusId } =
    req.body;

  try {
    const userFound = await prisma.user.findUnique({
      where: { email }
    });

    if (userFound) {
        return res.status(400).json(["Email is already in use"]);
    }
    //Con Bcrypt y su metodo hash podemos encryptar el password
    const passwordHash = await bcrypt.hash(password,10)
    //Creacion de user
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
        statusId
      },
    });
    //Generacion de Token para el user 
    // const token = await createAccesToken({
    //     id: newUser.id,
    //     userName: newUser.userName,
    //     name: newUser.name,
    //     lastName: newUser.lastName,
    //     email: newUser.email,
    //     phone: newUser.phone,
    //     roleId: newUser.roleId,
    //     storeId: newUser.storeId,
    //   })
    // res.cookie("token",token)
    res.json({
      id: newUser.id,
      userName: newUser.userName,
      name: newUser.name,
      lastName: newUser.lastName,
      email: newUser.email,
      phone: newUser.phone,
      roleId: newUser.roleId,
      storeId: newUser.storeId,
      statusId: newUser.statusId
    });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

//Funcion actualizar
export const updateUser = async (req,res) =>{

  const { id,userName, email, password, phone, roleId, storeId, statusId } = req.body

  try {
    //
    let passwordHash
    if(password){
      passwordHash = await bcrypt.hash(password,10)
    }
    const updatedUser = await prisma.user.update({
      where:{id},
      data:{
        userName, 
        email,  
        phone, 
        roleId, 
        storeId, 
        statusId,
        ...(password && { password: passwordHash })
      }
    }) 
    res.json({ message: "User updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

//Funcion de Login
export const login = async (req,res) =>{

  const {email, password} = req.body

  try {
    const userFound = await prisma.user.findUnique({
      where:{email}
    })

    if(!userFound) return res.status(400).json(["User no found"])

    const isMatch = await bcrypt.compare(password, userFound.password)

    if(!isMatch) return res.status(400).json(["Credentials incorrects"])

    //Generacion de Token para el user 
    const token = await createAccesToken({
        id: userFound.id,
        // userName: newUser.userName,
        // name: newUser.name,
        // lastName: newUser.lastName,
        // email: newUser.email,
        // phone: newUser.phone,
        // roleId: newUser.roleId,
        // storeId: newUser.storeId,
      })
    res.cookie("token",token)
    res.json({
      message: "Login successful",
      token,
      user: {
        id: userFound.id,
        userName: userFound.userName,
        email: userFound.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
