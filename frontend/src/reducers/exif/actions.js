import {createAction} from 'redux-actions'

export const types = {
    EXIF_REQUEST: 'EXIF_REQUEST',
    EXIF_RECEIVE: 'EXIF_RECEIVE',
    EXIF_FAILURE: 'EXIF_FAILURE',
}

// TODO: set URL
const wsUrl = 'ws://your-host-here/exif/'

const requestExif = createAction(types.EXIF_REQUEST, (hash, key) => ({hash, key}))
const receiveExif = createAction(types.EXIF_RECEIVE, (hash, json) => ({hash, json}))
const failExif = createAction(types.EXIF_FAILURE, (hash, error) => ({hash, error}))

export function fetchExif(hash, key=null) {
    return dispatch => {
        dispatch(requestExif(hash, key))

        const ws = new WebSocket(wsUrl)
        ws.onopen = () => ws.send(JSON.stringify({hash, key}))
        ws.onclose = event => {
            // 1000 code signals normal closure
            if (event.code !== 1000) {
                dispatch(failExif(hash, new Error(event.code)))
            }
        }
        ws.onmessage = event => {
            const result = JSON.parse(event.data)
            console.log('WS: message:', result)
            switch (result.status) {
                case 'ok':
                    dispatch(receiveExif(hash, result.data))
                    ws.close()
                    break
                case 'error':
                    dispatch(failExif(hash, result.error))
                    ws.close()
                    break
                default:
                    ws.close()
                    break
            }
        }
        ws.onerror = error => dispatch(failExif(hash, error.text))
    }
}
