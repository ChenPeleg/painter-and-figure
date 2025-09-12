import {expect, test} from '@playwright/test';

import {mockServiceProvider} from '../mock/mockServiceProvider';
import {StoreService} from '../../src/services/Store.service';
import {AppActionType} from '../../src/store/app-action-type';
import {AppLanguage} from '../../src/models/Language';

test.describe('Store Reducer', () => {
    test.beforeEach(() => {

    })
    test('addOne increments count', async () => {
        const servicesProvider = mockServiceProvider()
        const store = servicesProvider.getService(StoreService).store
        expect(store).toBeDefined()
        const initialState = store.getState()
         store.dispatch(
            { type: AppActionType.addOne, payload: undefined }
        )
        const newState = store.getState()
        expect(newState.count).toBe(initialState.count + 1);
    });
    test('setLanguage updates language', async () => {
        const servicesProvider = mockServiceProvider()
        const store = servicesProvider.getService(StoreService).store
        expect(store).toBeDefined()
        store.dispatch({ type: AppActionType.setLanguage, payload: AppLanguage.English})
        const newState = store.getState()
        expect(newState.language ).toBe(AppLanguage.English)
        store.dispatch({ type: AppActionType.setLanguage, payload: AppLanguage.Hebrew})
        const newState2 = store.getState()
        expect(newState2.language ).toBe(AppLanguage.Hebrew)

    });

});
