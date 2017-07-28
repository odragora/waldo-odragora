import React from 'react'
import {Grid, Card} from 'semantic-ui-react'

import Page from '../base/page'
import {ExifFormContainer} from '../../elements/exif-form'
import {ExifTableContainer} from '../../elements/exif-table'

import './page.css'


export class ExifPage extends React.Component {
    render() {
        return (
            <Page>
                <Grid centered columns={2} verticalAlign={'middle'}>
                    <Grid.Column>
                        <Card centered fluid>
                            <Card.Content>
                                <Card.Header>EXIF viewer</Card.Header>
                                <Card.Description>
                                    <ExifFormContainer/>
                                </Card.Description>
                            </Card.Content>
                        </Card>

                        <Card centered fluid>
                            <Card.Content>
                                <Card.Header>Data</Card.Header>
                                <Card.Description>
                                    <ExifTableContainer/>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
            </Page>
        )
    }
}
