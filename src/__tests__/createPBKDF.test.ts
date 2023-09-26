import { createPBKDF } from "../serverSide";
test("createPBKDF : pass Andrea userData", async () => {
  const userData = {
    username: "JohnDoe",
    email: "john@doe.com",
    phone: "12345678",
  };

  const data = await createPBKDF(userData);

  expect(data).toStrictEqual({
    key_derivation:
      "bzUqFaCWHH6s25u8fSp4F62t9sR79a4hCX9IMCiUhtI=",
  });
});

test("createPBKDF : pass only email in userData", async () => {
  const userData = {
    email: "john@doe.com",
  };

  const data = await createPBKDF(userData);

  expect(data).toStrictEqual({
    key_derivation: "xdudVM49pynGxrtC2C8gt/6NP68PvFkpUx0hoGZ5tDY=",
  });
});
