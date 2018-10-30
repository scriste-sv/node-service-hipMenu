import { MenuController } from '../../src/controllers/menu-controller';
import { Restaurant } from '../../src/model/restaurant-model';
import { objectTest, objectTestUpdated } from '../objectTest';

describe('Controller Restaurant', () => {
    let controller: MenuController;
    let objectMock: Object;

    beforeEach(() => {
        controller = new MenuController();
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

    // Menus

    it('returns a menu entity', async () => {
        (<any>objectMock).menu[2]._id = '123';
        (<jest.Mock>Restaurant.find).mockResolvedValue([objectMock]);

        const result = await controller.readMenu(123);

        expect(result).toEqual({"_id": "123", "name": "TEST"});
    });

    it('returns all menu entity', async () => {
        delete (<any>objectMock).menu[2]._id;
        (<jest.Mock>Restaurant.find).mockResolvedValue([objectMock]);

        const result = await controller.readAllMenus();

        expect(result).toEqual([{"name": "Desert"}, {"name": "Main dish"}, {"name": "TEST"}]);
    });

    it('creates and returns a menu entity', async () => {
        (<jest.Mock>Restaurant.updateOne).mockResolvedValue({name: 'TEST'});

        const result = await controller.createMenu('123', {name: 'TEST'});

        expect(result).toEqual({name: 'TEST'});
    });

    it('updates a menu entity', async () => {
        (<jest.Mock>Restaurant.updateOne).mockResolvedValue((<any>objectTestUpdated).menu[2]);

        const result = await controller.updateMenu('1234', (<any>objectMock).menu[2]);

        expect(result).toEqual((<any>objectTestUpdated).menu[2]);
    });
    
    it('deletes and returns a restaurant entity after an id search', async () => {
        (<jest.Mock>Restaurant.updateOne).mockResolvedValue(null);

        await controller.deleteMenu(1234);

        expect((<jest.Mock>Restaurant.updateOne).mock.calls[0]).toMatchSnapshot();
    });

});