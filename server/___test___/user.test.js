const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hashPassword  } = require("../helpers/bcryptjs");
const { queryInterface } = sequelize;

const user1 = {
  email: "admin@admin.com",
  password: "admin",
};

const user2 = {
  email: "",
  password: "user",
};

const user3 = {
    email: "user@user.com",
    password: "",
  };

const user4 = {
    email: "user1@user.com",
    password: "user1",
}

const user5 = {
    email: "user2@user.com",
    password: "user2"
}

const userRegister1 = {
    email: "user10@user10.com",
    password: "user10",
    username: "user10",
    phoneNumber: "0999888777",
    role: "User"
  };

  const userRegister2 = {
    email: "",
    password: "admin",
    username: "admin",
    phoneNumber: "0999888777"
  };

  const userRegister3 = {
    email: "user10",
    password: "admin",
    username: "admin",
    phoneNumber: "0999888777"
  };

  const userRegister4 = {
    email: "user10@user10.com",
    password: "",
    username: "admin",
    phoneNumber: "0999888777"
  };

  const userRegister5 = {
    email: "user10@user10.com",
    password: "admin",
    username: "",
    phoneNumber: "0999888777"
  };

  const userRegister6 = {
    email: "user10@user10.com",
    password: "admin",
    username: "admin",
    phoneNumber: ""
  };

describe("Users", () => {
  describe("POST /login", () => {
    describe("Success",() => {
      
      test("Berhasil login dan mengirimkan access_token", async () => {
        let { body, status } = await request(app).post("/login").send(user1);

        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
      });
    })
    describe("Failed", () => {
      test("Email tidak diberikan / tidak diinput", async () => {
        let {body, status} = await request(app).post("/login").send(user2)

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Email / Password is required")
    }),
    test("Password tidak diberikan / tidak diinput", async () => {
        let {body, status} = await request(app).post("/login").send(user3)

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Email / Password is required")
    }),
    test("Email diberikan invalid / tidak terdaftar", async () => {
        let {body, status} = await request(app).post("/login").send(user4)

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid Email / Password")
    }),
    test("Password diberikan salah / tidak match", async () => {
        let {body, status} = await request(app).post("/login").send(user5)

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid Email / Password")
    })
    });
  }),
  describe("POST /register", () => {
    describe("Success",() => {
      
      test("Berhasil register", async () => {
        let { body, status } = await request(app).post("/register").send(userRegister1);

        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("email", userRegister1.email);
      });
    })
    describe("Failed", () => {
      test("Email tidak diberikan / tidak diinput", async () => {
        let {body, status} = await request(app).post("/register").send(userRegister2)

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Email is required")
    }),
    test("Invalid Format Email", async () => {
        let {body, status} = await request(app).post("/register").send(userRegister3)

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Invalid Email Format")
    }),
    test("Password tidak diberikan / tidak diinput", async () => {
        let {body, status} = await request(app).post("/register").send(userRegister4)

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Password is required")
    }),
    test("Username tidak diberikan / tidak diinput", async () => {
        let {body, status} = await request(app).post("/register").send(userRegister5)

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Username is required")
    }),
    test("Phone Number tidak diberikan / tidak diinput", async () => {
        let {body, status} = await request(app).post("/register").send(userRegister6)

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Phone Number is required")
    })
    });
  });
});

beforeAll(async () => {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        email: user1.email,
        password: hashPassword(user1.password),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: user2.email,
        password: hashPassword(user2.password),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: user3.email,
        password: hashPassword(user3.password),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: user5.email,
        password: user5.password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
