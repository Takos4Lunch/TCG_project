const sequelize = require("../libs/sequelize")
const sinon = require('sinon');
const rewire = require('rewire');
let userService = require('../services/user.service')
const service = new userService();
const boom = require('@hapi/boom');
const { User } = require("../db/models/user.model");

describe('UserService tests', () => {
    let userSample;
    let userModelSample;

    beforeEach(() => {
        userSample = {
            username: 'Jhon',
            password: 'bighash',
            email: 'jhon@example.com',
            materials: '30'
        }

        userModelSample = User.build({
            id: 1,
            role: "user",
            username: "John",
            password: "bighash",
            email: "jhon@example.com",
            materials: 0
        });

        findAllStub = sinon.stub(sequelize.models.User, 'findAll').resolves(userSample)
        /**
         * Rather than creating one array for this, we should instead create a proper model instance for the stub
         */
        findOneStub = sinon.stub(sequelize.models.User, 'findOne').resolves(userModelSample)
    })

    afterEach(()=>{
        userService = rewire('../services/user.service');
        sinon.restore();
    })

    test('should return userSample', async () => {
        const result = await service.find();
        expect(result).toBe(userSample);
    })

    test('should return error (no email provided)', async () => {
        const result = await service.findByEmail();
        expect(result).toStrictEqual(boom.badRequest('No Email Provided'));
    })

    test('should return a single user', async () => {
        const result = await service.findByEmail('user@example.com');
        expect(result).toBe(userModelSample);
    })

    test('should return error (no id provided)', async () => {
        const result = await service.findOne();
        expect(result).toStrictEqual(boom.badRequest('No Id Provided'));
    })

    test('should return a single user', async () => {
        const result = await service.findOne(1);
        expect(result).toBe(userModelSample);
    })

    test('should fail (no id or changes provided)', async () => {
        const result = await service.update()
        expect(result).toStrictEqual(boom.badRequest('error handled properly'));
    })

    test('should return changes made', async () => {
        const result = await service.update(1,[]);
        expect(result).toBe(1);//Since it should return the previously given ID
    })
})