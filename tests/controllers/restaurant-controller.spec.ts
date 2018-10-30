import { RestaurantController } from '../../src/controllers/restaurant-controller';
import { Restaurant } from '../../src/model/restaurant-model';
import { objectTest, objectTestUpdated } from '../objectTest';

describe('Controller Restaurant', () => {
    let controller: RestaurantController;
    let objectMock: Object;

    beforeEach(() => {
        controller = new RestaurantController();
        objectMock = objectTest;
        Restaurant.create = jest.fn();
        Restaurant.findOne = jest.fn();
        Restaurant.find = jest.fn();
        Restaurant.updateOne = jest.fn();
        Restaurant.findByIdAndDelete = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('creates and returns a restaurant entity', async () => {
        (<jest.Mock>Restaurant.create).mockResolvedValue(objectMock);

        const result = await controller.create(objectMock);

        expect(result).toEqual(objectMock);
    });

    it('tries to create and returns an error', async () => {
        (<jest.Mock>Restaurant.create).mockResolvedValue(new Error('Error'));

        const result: any = await controller.create(objectMock);

        expect(result.message).toEqual('Error');
    });

    it('returns a restaurant entity after an id search', async () => {
        (<jest.Mock>Restaurant.findOne).mockResolvedValue(objectMock);

        const result = await controller.read('1234');

        expect(result).toEqual(objectMock);
    });

    it('returns all restaurant entities', async () => {
        (<jest.Mock>Restaurant.find).mockResolvedValue([objectMock, objectMock]);

        const result = await controller.readAll();

        expect(result).toEqual([objectMock, objectMock]);
    });

    it('updates and returns a restaurant entity', async () => {
        (<jest.Mock>Restaurant.updateOne).mockResolvedValue(objectTestUpdated);

        const result = await controller.update('1234', objectMock);

        expect(result).toEqual(objectTestUpdated);
    });

    it('deletes and returns a restaurant entity after an id search', async () => {
        (<jest.Mock>Restaurant.findByIdAndDelete).mockResolvedValue(objectMock);

        const result = await controller.delete('1234');

        expect(result).toEqual(objectMock);
    });
});