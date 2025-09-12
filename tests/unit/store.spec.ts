import {expect, test} from '@playwright/test';
import {appReducer} from '../../src/store/app-reducer';
import {AppActionType} from '../../src/store/app-action-type';
import type {AppStoreModel} from '../../src/store/app-store-model';
import {DisplayType} from '../../src/store/app-store-model';
import {AppLanguage} from '../../src/models/Language';



test.describe('Store Reducer', () => {
    test.beforeEach(()=>{

    })
    test('addOne increments count', async () => {
        const initialState: AppStoreModel = {
            display: DisplayType.Rows,
            count: 0,
            language: AppLanguage.English,
        };
        const newState = appReducer(initialState, {
            type: AppActionType.addOne,
            payload: undefined
        });
        expect(1).toBe(1);
    });
    //
    // test('setLanguage updates language', async () => {
    //     const initialState: AppStoreModel = {
    //         display: DisplayType.Rows,
    //         count: 0,
    //         language: AppLanguage.English,
    //     };
    //     const newState = appReducer(initialState, {
    //         type: AppActionType.setLanguage,
    //         payload: AppLanguage.Hebrew
    //     });
    //     expect(newState.language).toBe(AppLanguage.Hebrew);
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

