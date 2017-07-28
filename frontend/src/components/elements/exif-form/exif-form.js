import React from 'react'
import {connect} from 'react-redux'
import {Input, Button} from 'semantic-ui-react'

import {fetchExif} from '../../../reducers/exif/actions'


class ExifForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hash: props.hash || null,
            key: props.key || null,
        }
    }

    render() {
        return (
            <div>
                <Input
                    icon='hashtag' iconPosition='left' placeholder='Image hash'
                    label={{ icon: 'asterisk' }} labelPosition='right corner'
                    className={'exif-input'} fluid
                    onChange={(_, data) => {
                        this.setState({hash: data.value || null})
                    }}
                />
                <Input
                    icon='key' iconPosition='left' placeholder='Key (optional)'
                    className={'exif-input'} fluid
                    onChange={(_, data) => {
                        this.setState({key: data.value ? data.value : null})
                    }}
                />
                <Button
                    disabled={!this.state.hash}
                    onClick={() => this.props.load(this.state.hash, this.state.key)}
                    content={'Load'}
                />
            </div>
        )
    }
}

export const ExifFormContainer = connect(
    null,
    dispatch => ({
        load: (hash, key=null) => dispatch(fetchExif(hash, key)),
    })
)(ExifForm)