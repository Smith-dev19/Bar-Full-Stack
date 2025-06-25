import z from "zod";

export  const createStoreSchema = z.object({
    name: z.string({
        required_error : "store name is required"
    }),
    addres: z.string({
        required_error : "address is required"
    }),
    phone: z.string({
        required_error : "Phone is required"
    }).max(10,"Phone max number is 10").min(10,"Phone mmin number is 10"),
    numberTables: z.number({
        required_error : "Number tables is required"
    })
})