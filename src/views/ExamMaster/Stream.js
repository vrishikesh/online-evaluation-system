import React, { useState, useEffect } from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// core components
import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import Table from 'components/Table/Table.js'
import Card from 'components/Card/Card.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardBody from 'components/Card/CardBody.js'
import Button from '../../components/CustomButtons/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
// import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import CustomInput from '../../components/CustomInput/CustomInput'
import axios from '../../axios'

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
}

const useStyles = makeStyles(styles)

export default function() {
  const [open, setOpen] = useState(false)
  const [streams, setStreams] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await axios.get('/streams.json')
      if (response.status === 200 && response.data.length) {
        let newStreams = response.data.map(record => {
          if (record) {
            return [
              record.streamName,
              <Button data-stream-name={record.streamName}>Edit</Button>,
            ]
          } else return null
        })

        newStreams = newStreams.filter(_ => _ !== null)
        setStreams(newStreams)
      }
    })()
  }, [streams])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const classes = useStyles()
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <GridContainer>
              <GridItem xs={6} sm={6} md={6}>
                <h4 className={classes.cardTitleWhite}>Stream</h4>
                <p className={classes.cardCategoryWhite}>Stream List</p>
              </GridItem>
              <GridItem xs={6} sm={6} md={6}>
                <Button
                  color="white"
                  className={'pull-right'}
                  onClick={handleClickOpen}
                >
                  Add Stream
                </Button>
              </GridItem>
            </GridContainer>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={['Stream Name', 'Actions']}
              tableData={streams}
              /*tableData={[
                [
                  'Dakota Rice',
                  <Button data-stream-name="Dakota Rice">Edit</Button>,
                ],
                [
                  'Minerva Hooper',
                  <Button data-stream-name="Minerva Hooper">Edit</Button>,
                ],
                [
                  'Sage Rodriguez',
                  <Button data-stream-name="Sage Rodriguez">Edit</Button>,
                ],
                [
                  'Philip Chaney',
                  <Button data-stream-name="Philip Chaney">Edit</Button>,
                ],
                [
                  'Doris Greene',
                  <Button data-stream-name="Doris Greene">Edit</Button>,
                ],
                [
                  'Mason Porter',
                  <Button data-stream-name="Mason Porter">Edit</Button>,
                ],
              ]}*/
            />
          </CardBody>
        </Card>
      </GridItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={'sm'}
      >
        <DialogTitle id="form-dialog-title">Add Stream</DialogTitle>
        <DialogContent>
          {/*dialogContentText ? (
            <DialogContentText>{dialogContentText}</DialogContentText>
          ) : null*/}
          <CustomInput
            labelText="Enter Stream Name"
            id="stream-name"
            formControlProps={{
              fullWidth: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="danger">
            Cancel
          </Button>
          <Button onClick={handleClose} color="success">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </GridContainer>
  )
}
