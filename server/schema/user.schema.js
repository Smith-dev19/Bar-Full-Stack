import z from "zod";

export const registerSchema = z.object({
  userName: z.string({
    required_error: "Username is required",
  }),
  name: z.string({
    required_error: "Name is required",
  }),
  lastName : z.string({
    required_error: 'Last name is required'
}),
  email: z
    .string({
      required_error: "email is required",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6,"Password must be at least 6 characters"),
    phone: z
    .string({
      required_error: "Phone is required",
    }).max(10)
});
