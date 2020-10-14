
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'
import { addOrder, resetCart } from '../reducers/activeUserReducer'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@material-ui/core'



const CartRestaurant = ({ place, setTotalPrice, setCodeEntered }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.activeUser.user)
  const addresses = user.addresses
  const [modalOrderOpen, setModalOrderOpen] = useState(false)
  const [deliverTo, setDeliverTo] = useState(addresses ? addresses[0] : null)

  const handleModalOrderOpen = () => {
    setModalOrderOpen(true)
  }

  const handleModalOrderClose = () => {
    setModalOrderOpen(false)
  }

  const handleDeliverToChange = (e) => {
    setDeliverTo(e.target.value)
  }

  const handleBackToPlaceClick = (place_id) => {
    history.push(`/dashboard/restaurant/${place_id}`)
  }
  const clearCart = () => {
    dispatch(resetCart(user._id))
    setCodeEntered('')
    setTotalPrice(0)
  }
  const submitOrder = () => {
    dispatch(addOrder(user._id))
    handleModalOrderClose()
  }

  return (
    <div style={{ height: '100%' }}>
      <h5 className='sticky-head'>Finished?</h5>
      {place !== undefined ?
        <Card style={{ height: 178, textAlign: 'center' }}>
          <CardContent style={{ margin: 'auto' }}>
            {!user.activeCartBilling ?
              <div>
                <Button onClick={() => handleBackToPlaceClick(place._id)} style={{ textTransform: 'none', backgroundColor: 'lightgray', height: 60 }} fullWidth>{`Order more items from ${place.name}`}</Button>
                <hr />
                <Button onClick={handleModalOrderOpen} style={{ textTransform: 'none', backgroundColor: '#ff430a', color: 'white', height: 60 }} fullWidth>{`I'm hungry! Place my order please.`}</Button>
              </div>
              :
              <div>
                <Button onClick={() => clearCart()} style={{ textTransform: 'none', backgroundColor: '#575551', color: 'white', height: 60 }} fullWidth>Reset Cart</Button>
                <hr />
                <Button onClick={handleModalOrderOpen} style={{ textTransform: 'none', backgroundColor: '#ff430a', color: 'white', height: 60 }} fullWidth>{`I'm hungry! Place my order please.`}</Button>
              </div>}
          </CardContent>
        </Card>
        : <h3>Loading...</h3>}
      <Dialog open={modalOrderOpen} onClose={handleModalOrderClose} aria-labelledby="form-dialog-title">
        {/* <DialogTitle id="form-dialog-title">Deliver to:</DialogTitle> */}
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel style={{ color: '#575551' }} component="legend">Deliver to:</FormLabel>
            <RadioGroup aria-label="style" name="Style" value={deliverTo} onChange={handleDeliverToChange}>
              {addresses.map(p =>
                <FormControlLabel key={p.locationName} value={p.locationName} control={<Radio required={true} style={{ color: '#575551' }} />} label={p.locationName} />
              )
              }
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalOrderClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitOrder} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default CartRestaurant