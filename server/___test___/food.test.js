const request = require("supertest");
const app = require("../app");
const { sequelize, User } = require("../models");
const { hashPassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

const user1 = {
    username: "admin",
    email: "admin@admin.com",
    password: hashPassword("admin"),
    phoneNumber: "0192031920",
    role: "Admin"
}

const dummy = {
    title: "ayam goreng mentah",
    price: 50000,
    difficulty: "Easy",
    image: "https://cdn.antaranews.com/cache/1200x800/2023/05/06/Daging_Ayam_Titipku.jpg",
    category: "halal"
}

const dummy1 = {
    title: "",
    price: 50000,
    difficulty: "Easy",
    image: "https://cdn.antaranews.com/cache/1200x800/2023/05/06/Daging_Ayam_Titipku.jpg",
    category: "halal"
}

const dummy2 = {
    title: "ayam goreng mentah",
    price: "",
    difficulty: "Easy",
    image: "https://cdn.antaranews.com/cache/1200x800/2023/05/06/Daging_Ayam_Titipku.jpg",
    category: "halal"
}

const dummy3 = {
    title: "ayam goreng mentah",
    price: 50000,
    difficulty: "",
    image: "https://cdn.antaranews.com/cache/1200x800/2023/05/06/Daging_Ayam_Titipku.jpg",
    category: "halal"
}

const dummy4 = {
    title: "ayam goreng mentah",
    price: 50000,
    difficulty: "Easy",
    image: "",
    category: "halal"
}

const dummy5 = {
    title: "ayam goreng mentah",
    price: 50000,
    difficulty: "Easy",
    image: "https://cdn.antaranews.com/cache/1200x800/2023/05/06/Daging_Ayam_Titipku.jpg",
    category: ""
}


let access_token;

beforeAll(async () => {
    try {
        await queryInterface.bulkInsert("Users", [
            {
                ...user1,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {})
        let user = await User.findOne({where: {email: user1.email}})
        access_token = signToken({ id: user.id })

        await queryInterface.bulkInsert("Food", require('../data/food.json').map(el => {
            delete el.id

            return el
        }))

    } catch (error) {
        console.log(error);
    }
})

afterAll(async () => {
    await queryInterface.bulkDelete("Food", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
    await queryInterface.bulkDelete("Users", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})

describe("Food", () => {
    describe("POST /foods", () => {
        describe("Success", () => {
            test("Berhasil membuat entitas food", async () => {
                let {body, status} = await request(app).post("/foods").set("Authorization", "Bearer " + access_token).send(dummy);
                expect(status).toBe(201)
                expect(body.food).toHaveProperty("id", expect.any(Number))
                expect(body.food).toHaveProperty("title", expect.any(String))
                expect(body.food).toHaveProperty("price", expect.any(Number))
                expect(body.food).toHaveProperty("difficulty", expect.any(String))
                expect(body.food).toHaveProperty("image", expect.any(String))
                expect(body.food).toHaveProperty("category", expect.any(String))
                expect(body).toHaveProperty("message", `Food ${dummy.title} Created`)
            })
        }),
        describe("Failed", () => {
            test("Gagal menjalankan fitur karena belum login", async () => {
                let {body, status} = await request(app).post("/foods").send(dummy);
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "Unauthenticated")
            }),
            test("Gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
                let {body, status} = await request(app).post("/foods").set("Authorization", "Bearer " + "asdasdasd").send(dummy);
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "Unauthenticated")
            }),
            test("Gagal ketika request body title tidak sesuai (validation required)", async () => {
                let {body, status} = await request(app).post("/foods").set("Authorization", "Bearer " + access_token).send(dummy1);
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Title is required")
            }),
            test("Gagal ketika request body price tidak sesuai (validation required)", async () => {
                let {body, status} = await request(app).post("/foods").set("Authorization", "Bearer " + access_token).send(dummy2);
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Price is required")
            }),
            test("Gagal ketika request body difficulty tidak sesuai (validation required)", async () => {
                let {body, status} = await request(app).post("/foods").set("Authorization", "Bearer " + access_token).send(dummy3);
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Difficulty is required")
            }),
            test("Gagal ketika request body image tidak sesuai (validation required)", async () => {
                let {body, status} = await request(app).post("/foods").set("Authorization", "Bearer " + access_token).send(dummy4);
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Image Url is required")
            }),
            test("Gagal ketika request body category tidak sesuai (validation required)", async () => {
                let {body, status} = await request(app).post("/foods").set("Authorization", "Bearer " + access_token).send(dummy5);
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Category is required")
            })
        })
    }),
    describe("GET /foods", () => {
        describe("Success", () => {
            test("Berhasil memuat semua entitas food", async () => {
                let {body, status} = await request(app).get("/foods").set("Authorization", "Bearer " + access_token);
                expect(status).toBe(200)
            })
        }),
        describe("Failed", () => {
            test("Gagal menjalankan fitur karena belum login", async () => {
                let {body, status} = await request(app).post("/foods").send(dummy);
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "Unauthenticated")
            }),
            test("Gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
                let {body, status} = await request(app).post("/foods").set("Authorization", "Bearer " + "asdasdasd").send(dummy);
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "Unauthenticated")
            }),
            test("Gagal ketika request body title tidak sesuai (validation required)", async () => {
                let {body, status} = await request(app).post("/foods").set("Authorization", "Bearer " + access_token).send(dummy1);
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Title is required")
            }),
            test("Gagal ketika request body price tidak sesuai (validation required)", async () => {
                let {body, status} = await request(app).post("/foods").set("Authorization", "Bearer " + access_token).send(dummy2);
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Price is required")
            }),
            test("Gagal ketika request body difficulty tidak sesuai (validation required)", async () => {
                let {body, status} = await request(app).post("/foods").set("Authorization", "Bearer " + access_token).send(dummy3);
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Difficulty is required")
            }),
            test("Gagal ketika request body image tidak sesuai (validation required)", async () => {
                let {body, status} = await request(app).post("/foods").set("Authorization", "Bearer " + access_token).send(dummy4);
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Image Url is required")
            }),
            test("Gagal ketika request body category tidak sesuai (validation required)", async () => {
                let {body, status} = await request(app).post("/foods").set("Authorization", "Bearer " + access_token).send(dummy5);
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Category is required")
            })
        })
    })
})