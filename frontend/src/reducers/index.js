import {combineReducers} from 'redux'

import exifReducer from './exif/reducers'

export default combineReducers({
    exif: exifReducer,
})