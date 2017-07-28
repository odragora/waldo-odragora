import React from 'react'
import {connect} from 'react-redux'
import {Table, Dimmer, Loader, Segment} from 'semantic-ui-react'
import PropTypes from 'prop-types'

import {getExif} from '../../../reducers/exif/reducers'


class ExifTable extends React.Component {
    constructor(props) {
        super(props)

        this.dataToRows = this.dataToRows.bind(this)
    }

    dataToRows(item) {
        if (item && !item.isFetching && item.data) {
            const data = Object.entries(item.data)

            return data.map(item => (
                <Table.Row key={item[0]}>
                    <Table.Cell>{item[0]}</Table.Cell>
                    <Table.Cell>{item[1]}</Table.Cell>
                </Table.Row>
            ))
        }
    }

    render() {
        const errorMsg = (
            this.props.exif && this.props.exif.error ?
                <Segment inverted color='red'>An error occurred: {this.props.exif.error}</Segment>
                : null
        )

        return (
            <div>
                <Dimmer active={this.props.exif && this.props.exif.isFetching}>
                    <Loader/>
                </Dimmer>
                {errorMsg}

                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Key</Table.HeaderCell>
                            <Table.HeaderCell>Value</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.dataToRows(this.props.exif)}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

export const ExifTableContainer = connect(
    state => ({
        exif: getExif(state)
    }),
    null
)(ExifTable)
