import {makeBrandedType} from '../models/makeBrandedType.ts';

export const AppActionType = makeBrandedType({
    addOne: 'addOne',
    clearStorage: 'clearStorage',
    setLanguage: 'SET_LANGUAGE',
}, 'actionType')  ;

export type AppActionType = typeof AppActionType[keyof typeof AppActionType];
