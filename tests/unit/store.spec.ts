import {expect, test} from '@playwright/test';

import {mockServiceProvider} from '../mock/mockServiceProvider';
import {StoreService} from '../../src/services/Store.service';



test.describe('Store Reducer', () => {
    test.beforeEach(() => {

    })
    test('addOne increments count', async () => {
        const servicesProvider = mockServiceProvider()
        const store = servicesProvider.getService(StoreService).store
        expect(store).toBeDefined()


    });
    //
    // test('setLanguage updates language', async () => {
    //
    // });
    //
    // test('clearStorage resets count', async () => {
    //     const initialState: AppStoreModel = {
    //         display: DisplayType.Rows,
    //         count: 5,
    //         language: AppLanguage.English,
    //     };
    //     const newState = appReducer(initialState, {
    //         type: AppActionType.clearStorage,
    //         payload: undefined
    //     });
    //     expect(newState.count).toBe(0);
    // });
});

