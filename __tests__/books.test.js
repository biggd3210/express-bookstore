const request = require("supertest");

const app = require("../app");
const db = require("../db");
const Book = require("../models/book");

describe("Book Routes Test", function () {

    beforeEach(async function () {
        await db.query("DELETE FROM books");

        let book1 = await Book.create({
            isbn: "110197138X",
            amazon_url: "https://www.amazon.com/Starless-Sea-Novel-Erin-Morgenstern/dp/110197138X/ref=pd_bxgy_img_d_sccl_1/147-4193099-5008931?pd_rd_w=2Xq1b&content-id=amzn1.sym.839d7715-b862-4989-8f65-c6f9502d15f9&pf_rd_p=839d7715-b862-4989-8f65-c6f9502d15f9&pf_rd_r=BK5GDF1XMEAW0F5KEDH8&pd_rd_wg=1TZoy&pd_rd_r=6a309ee5-5699-44c7-8bb1-26f8dbd5ee0c&pd_rd_i=110197138X&psc=1",
            author: "Emily Morgenstern",
            language: "english",
            pages: 592,
            publisher: "Anchor Books",
            title: "The Starless Sea",
            year: 2020
        });
    });

    describe("POST /books", function () {
        test("adds new book", async function () {
            let response = await request(app)
                .post("/books")
                .send({
                    isbn: "9780307744432",
                    amazon_url: "https://www.amazon.com/Night-Circus-Erin-Morgenstern/dp/0307744434/ref=sr_1_1?crid=3SFPIKJIHP9JS&keywords=night+circus&qid=1707338044&sprefix=night+circ%2Caps%2C289&sr=8-1",
                    author: "Emily Morgenstern",
                    language: "english",
                    pages: 516,
                    publisher: "Anchor Books",
                    title: "The Night Circus",
                    year: 2012
                });
            expect(response.statusCode).toEqual(201);
            expect(response.body).toEqual({
                book: {
                    isbn: "9780307744432",
                    amazon_url: "https://www.amazon.com/Night-Circus-Erin-Morgenstern/dp/0307744434/ref=sr_1_1?crid=3SFPIKJIHP9JS&keywords=night+circus&qid=1707338044&sprefix=night+circ%2Caps%2C289&sr=8-1",
                    author: "Emily Morgenstern",
                    language: "english",
                    pages: 516,
                    publisher: "Anchor Books",
                    title: "The Night Circus",
                    year: 2012
                }
            })
        });
    });

    describe("GET /books", function () {
        test("get's list of all books", async function () {
            let response = await request(app)
                .get('/books')
            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual({books: [{
                isbn: "110197138X",
                amazon_url: "https://www.amazon.com/Starless-Sea-Novel-Erin-Morgenstern/dp/110197138X/ref=pd_bxgy_img_d_sccl_1/147-4193099-5008931?pd_rd_w=2Xq1b&content-id=amzn1.sym.839d7715-b862-4989-8f65-c6f9502d15f9&pf_rd_p=839d7715-b862-4989-8f65-c6f9502d15f9&pf_rd_r=BK5GDF1XMEAW0F5KEDH8&pd_rd_wg=1TZoy&pd_rd_r=6a309ee5-5699-44c7-8bb1-26f8dbd5ee0c&pd_rd_i=110197138X&psc=1",
                author: "Emily Morgenstern",
                language: "english",
                pages: 592,
                publisher: "Anchor Books",
                title: "The Starless Sea",
                year: 2020
            }]})
        });
    });

    describe("GET /books/:isbn", function() {
        test("get's single book given isbn", async function () { 
            let response = await request(app)
                .get('/books/110197138X')
            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual({
                    book: {
                    isbn: "110197138X",
                    amazon_url: "https://www.amazon.com/Starless-Sea-Novel-Erin-Morgenstern/dp/110197138X/ref=pd_bxgy_img_d_sccl_1/147-4193099-5008931?pd_rd_w=2Xq1b&content-id=amzn1.sym.839d7715-b862-4989-8f65-c6f9502d15f9&pf_rd_p=839d7715-b862-4989-8f65-c6f9502d15f9&pf_rd_r=BK5GDF1XMEAW0F5KEDH8&pd_rd_wg=1TZoy&pd_rd_r=6a309ee5-5699-44c7-8bb1-26f8dbd5ee0c&pd_rd_i=110197138X&psc=1",
                    author: "Emily Morgenstern",
                    language: "english",
                    pages: 592,
                    publisher: "Anchor Books",
                    title: "The Starless Sea",
                    year: 2020
                }
            })
        });
    });

    describe("PUT /books/:isbn", function () {
        test("edit's a books info by ISBN", async function () {
            let response = await request(app)
                .put("/books/110197138X")
                .send({
                    isbn: "110197138X",
                    amazon_url: "https://www.amazon.com/Starless-Sea-Novel-Erin-Morgenstern/dp/110197138X/ref=pd_bxgy_img_d_sccl_1/147-4193099-5008931?pd_rd_w=2Xq1b&content-id=amzn1.sym.839d7715-b862-4989-8f65-c6f9502d15f9&pf_rd_p=839d7715-b862-4989-8f65-c6f9502d15f9&pf_rd_r=BK5GDF1XMEAW0F5KEDH8&pd_rd_wg=1TZoy&pd_rd_r=6a309ee5-5699-44c7-8bb1-26f8dbd5ee0c&pd_rd_i=110197138X&psc=1",
                    author: "Emily Morgenstern",
                    language: "english",
                    pages: 592,
                    publisher: "Anchor Books",
                    title: "The Starless Sea",
                    year: 2020
                })
        })
    })

});

afterAll(async function () {
    await db.end();
});