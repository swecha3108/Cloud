import { generateAccessToken } from "../src/utils/token.js";

const users = {
    email: "person1@gmail.com",
    password: "person1PASSWORD",
    token: {
      token: "Basic "+ generateAccessToken("person1@gmail.com", "person1PASSWORD")
    },
    product: {
      name: "product1",
      description: "product1 desc",
      sku: "unique1",
      manufacturer: "user1",
      quantity: 5
    }
  }

export default users;