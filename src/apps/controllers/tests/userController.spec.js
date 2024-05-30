

const UserController = require('../../controllers/UserController');
const Users = require('../../models/Users');

jest.mock('../../models/Users');

describe("Create User Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    test("Should create user successfully", async () => {
        const req = {
            body: {
                email: "mari@gmail.com",
                name: "fulano",
                user_name: "filaninho",
                password: "123",
            }
        }

        const res = {
            send: jest.fn()
        }

        await UserController.create(req,res);

        expect(Users.create).toHaveBeenCalledTimes(1);
        expect(Users.create).toHaveBeenCalledWith(req.body);
        expect(res.send).toHaveBeenCalledWith("User successfully created!");


    })

    test("Should return error when not create user successfully", async () => {
        const req = {
            body: {
                email: "mari@gmail.com",
                name: "fulano",
                user_name: "filaninho",
                password: "123",
            }
        }

        const res = {
            send: jest.fn()
        }

        Users.create.mockRejectedValue(new Error("Mocking exception"));

        await UserController.create(req,res);

        expect(Users.create).toHaveBeenCalledTimes(1);
        expect(Users.create).toHaveBeenCalledWith(req.body);
        expect(res.send).toHaveBeenCalledWith("Failed to create a user");


    })
})