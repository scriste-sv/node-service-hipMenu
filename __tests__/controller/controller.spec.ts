import { ControllerRestaurant } from '../../src/controller/controller';
import { Restaurant } from '../../src/model/model';
import { objectTest, objectTestUpdated } from '../objectTest';

describe('Controller', () => {
    let controller: ControllerRestaurant;
    let objectMock: Object;

    beforeEach(() => {
        controller = new ControllerRestaurant();
        objectMock = objectTest;
        Restaurant.create = jest.fn();
        Restaurant.findOne = jest.fn();
        Restaurant.find = jest.fn();
        Restaurant.updateOne = jest.fn();
        Restaurant.findByIdAndDelete = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
        // controller = undefined;
        // objectMock = undefined;
    });

    it('creates and returns a restaurant entity', async () => {
        (<jest.Mock>Restaurant.create).mockImplementation((_n ,callback) => {
            return callback(null, objectMock);
        });

        const result = await controller.create(objectMock);

        expect(result).toEqual(objectMock);
    });

    it('tries to create and returns an error', async () => {
        (<jest.Mock>Restaurant.create).mockImplementation((_n ,callback) => {
            return callback(null, new Error('Error'));
        });

        const result: any = await controller.create(objectMock);

        expect(result.message).toEqual('Error');
    });

    it('returns a restaurant entity after an id search', async () => {
        (<jest.Mock>Restaurant.findOne).mockImplementation((_n ,callback) => {
            return callback(null, objectMock);
        });

        const result = await controller.read('1234');

        expect(result).toEqual(objectMock);
    });

    it('returns all restaurant entities', async () => {
        (<jest.Mock>Restaurant.find).mockImplementation((callback) => {
            return callback(null, [objectMock, objectMock]);
        });

        const result = await controller.readAll();

        expect(result).toEqual([objectMock, objectMock]);
    });

    it('updates and returns a restaurant entity', async () => {
        (<jest.Mock>Restaurant.updateOne).mockImplementation((_n, _m, callback) => {
            return callback(null, objectTestUpdated);
        });

        const result = await controller.update('1234', objectMock);

        expect(result).toEqual(objectTestUpdated);
    });

    it('deletes and returns a restaurant entity after an id search', async () => {
        (<jest.Mock>Restaurant.findByIdAndDelete).mockImplementation((_n, _m, callback) => {
            return callback(null, objectMock);
        });

        const result = await controller.delete('1234');

        expect(result).toEqual(objectMock);
    });

    // Menus

    it('returns a menu entity', async () => {
        (<any>objectMock).menu[2]._id = '123';
        (<jest.Mock>Restaurant.find).mockImplementation((_n ,callback) => {
            return callback(null, [objectMock]);
        });

        const result = await controller.readMenu(123);

        expect(result).toEqual({"_id": "123", "name": "TEST"});
    });

    it('returns all menu entity', async () => {
        delete (<any>objectMock).menu[2]._id;
        (<jest.Mock>Restaurant.find).mockImplementation((callback) => {
            return callback(null, [objectMock]);
        });

        const result = await controller.readAllMenus();

        expect(result).toEqual([{"name": "Desert"}, {"name": "Main dish"}, {"name": "TEST"}]);
    });

    it('creates and returns a menu entity', async () => {
        (<jest.Mock>Restaurant.updateOne).mockImplementation((_n,_m, callback) => {
            return callback(null, {name: 'TEST'});
        });

        const result = await controller.createMenu('123', {name: 'TEST'});

        expect(result).toEqual({name: 'TEST'});
    });

    it('updates a menu entity', async () => {
        (<jest.Mock>Restaurant.updateOne).mockImplementation((_n, _m, callback) => {
            return callback(null, (<any>objectTestUpdated).menu[2]);
        });

        const result = await controller.update('1234', (<any>objectMock).menu[2]);

        expect(result).toEqual((<any>objectTestUpdated).menu[2]);
    });
    
    it.only('deletes and returns a restaurant entity after an id search', async () => {
        (<jest.Mock>Restaurant.updateOne).mockImplementation((_n, _m, callback) => {
            return callback(null, null);
        });

        await controller.deleteMenu(1234);

        expect((<jest.Mock>Restaurant.updateOne).mock.calls[0]).toMatchSnapshot();
    });

});