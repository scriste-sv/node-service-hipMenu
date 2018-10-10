import { ControllerRestaurant } from '../../src/controllers/controller-restaurant';
import { Restaurant } from '../../src/model/restaurant-model';
import { objectTest, objectTestUpdated } from '../objectTest';

describe('Controller Restaurant', () => {
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
});