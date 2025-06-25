import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createStore = async (req, res) => {
  const { name, addres, phone, numberTables } = req.body;

  try {
    //Buscamos una tienda por su direccion para que no se duplique una sede
    const storeFound = await prisma.stores.findUnique({
        where : {addres}
    })

    if(storeFound){
        return res.status(400).json(["This address is vinculated a once store"])
    }

    //Si no existe una direccion vinculada se creara la tienda
    const newStore = await prisma.stores.create({
      data: {
        name,
        addres,
        phone,
        numberTables,
      },
    });

    res.json({
      name: newStore.name,
      addres: newStore.addres,
      phone: newStore.phone,
      numberTables: newStore.numberTables,
    });
    console.log("La tienda fue creada correctamente");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStore = async (req, res) => {
  const { id,name, addres, phone, numberTables } = req.body;

  try {
    const storeUpdate = await prisma.stores.update({
      where: { id },
      data: {
        name,
        addres,
        phone,
        numberTables,
      },
    });

    res.json({
      name: storeUpdate.name,
      addres: storeUpdate.addres,
      phone: storeUpdate.phone,
      numberTables: storeUpdate.numberTables,
    });
  } catch (error) {
    res.status(500).json({message : error.message})

  }
};
