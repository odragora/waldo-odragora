import {handleActions} from 'redux-actions'
import {createSelector} from 'reselect'

import {types} from './actions'


// EXIF by image hash
export default handleActions(
    {
        [types.EXIF_REQUEST]: (state, action) => ({
            ...state,
            hash: action.payload.hash,
            key: action.payload.key,
            items: {
                ...state.items,
                [action.payload.hash]: {
                    isFetching: true,
                    error: null,
                    data: null,
                },
            },
        }),
        [types.EXIF_RECEIVE]: (state, action) => ({
            ...state,
            items: {
                ...state.items,
                [action.payload.hash]: {
                    isFetching: false,
                    error: null,
                    data: action.payload.json,
                },
            },
        }),
        [types.EXIF_FAILURE]: (state, action) => ({
            ...state,
            items: {
                ...state.items,
                [action.payload.hash]: {
                    isFetching: false,
                    error: action.payload.error,
                    data: null,
                },
            },
        }),
    },
    {hash: null, key: null, items: {}}
)

export const getExif = state => state.exif.items[state.exif.hash]
