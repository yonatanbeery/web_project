const request = require("supertest");
const initApp = require("../app");
const mongoose = require("mongoose");
const User = require("../models/users.model");
const Property = require("../models/property.model");

const username = "test";
const password = "123";
let accessToken = "";
let refreshToken = "";
let creator = "";
let app;

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
  await User.deleteMany({username})
  await Property.deleteMany({creator: "-99999"})
});

afterAll(async () => {
  await User.deleteMany({username})
  await Property.deleteMany({creator: "-99999"})
  await mongoose.connection.close();
});


describe("Auth tests", () => {
  test("get posts without token ", async () => {
    const res = await request(app).get("/properties");
    expect(res.statusCode).not.toBe(200);
  });

  test("add new user ", async () => {
    const res = await request(app).post("/auth/signup").send({
      username, email:"world", password
    });
    console.log(res);
    expect(res.statusCode).toBe(200);
  });

  test("add user that exists ", async () => {
    const res = await request(app).post("/auth/signup").send({
      data:{
        username, email:"world", password
      }
    });
    expect(res.statusCode).toBe(500);
  });

  test("login", async () => {
    const response = await request(app).post("/auth/login").send({
      data:{
        username, password
      }
    });
    accessToken = response.body.accessToken;
    refreshToken = response.body.refreshToken;
    creator = response.body.userId
    expect(response.statusCode).toBe(200);
    expect(accessToken).not.toBe(null);
    expect(refreshToken).not.toBe(null);
  });

  test("refresh token ", async () => {
    const res = await request(app).post("/auth/refreshToken").set({authorization:refreshToken}).send();
    expect(res.statusCode).toBe(200);
    expect(res.body.accessToken).not.toBe(null);
    expect(res.body.refreshToken).not.toBe(null);
  });
});

const newPost = '{"photos":[],"location":"ABU GHOSH","dealType":"rent","price":120000,"bedrooms":1,"bathrooms":2,"homeType":"house","area":1212,"contactDetails":{"name":"asd","phoneNumber":"asd","EmailAddress":"asd"},"freeText":"","creator":"-99999"}'
let newPostId = ''
const filters = {
  location: "ABU GHOSH",
  dealType: "rent",
  price: {
    minPrice: 10,
    maxPrice: 10000000000
  },
  bathrooms: 2,
  bedrooms: 1,
  homeType: "house"
}

describe("Posts tests", () => {
  test("add new post ", async () => {
    const res = await request(app).post("/properties").set({authorization: accessToken}).send({
      post: newPost
    });
    expect(res.statusCode).toBe(201);
  });

  test("Test Get All Properties", async () => {
    const response = await request(app).get("/properties").set({authorization: accessToken});
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });
  
  test("Test Get All Properties - with full filters", async () => {
    const response = await request(app).get("/properties").query(filters).set({authorization: accessToken});
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  test("Test Get All Properties - empty response", async () => {
    const response = await request(app).get("/properties").query({...filters, price: {minPrice: 1, maxPrice: -1}}).set({authorization: accessToken});
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("Test Get All Users Properties", async () => {
    const response = await request(app).get("/properties").query({creator: "-99999"}).set({authorization: accessToken});
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    newPostId = response.body[0]._id;
  });

  test("Test Edit Property", async () => {
    const updatedProperty = newPost.replace("ABU GHOSH", "UDIM")
    const response = await request(app).put(`/properties/${newPostId}`).set({authorization: accessToken}).send({post: updatedProperty});
    expect(response.statusCode).toBe(201);
  });

  test("Test Post Comment", async () => {
    const res = await request(app).post("/properties/postComment").set({authorization: accessToken}).send({
      id: newPostId,
      comment: "Hello World!"
    });
    expect(res.statusCode).toBe(200);
  });

  test("Test Delete Property", async () => {
    const response = await request(app).delete(`/properties/${newPostId}`).set({authorization: accessToken});
    expect(response.statusCode).toBe(200);
  });
});

