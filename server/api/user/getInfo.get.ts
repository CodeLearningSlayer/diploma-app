import { IUser } from "~/api/specs/user";

export default defineEventHandler(() => {
  const user: IUser = {
    id: "1",
    name: "Maxim Rubtsov",
    profession: "Frontend developer",
    profile_completness: 90,
    slug: "maximrubtsov",
    contacts: {
      email: "ru2015@ya.ru",
      phone: "+79961907665",
    },
  };

  return user;
});
