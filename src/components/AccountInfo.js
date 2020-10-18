
import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const AccountInfo = ({ user }) => {
  return (
    <div>
      <h5 className='sticky-head'>Information</h5>
      {user !== undefined ?
        <Card style={{ height: 160 }}>
          <CardContent>
            <Typography variant='body1' color='textPrimary'>{user.firstName}</Typography>
            <Typography variant='body2' color='textSecondary'>{user.email}</Typography>
            <Typography variant='body2' color='textSecondary'>Payment method: Cash on delivery</Typography>
            <Typography variant='body2' color='textSecondary'>Registered via {user.googleId ? 'Google' : 'local email/password creation'} on {new Date(user.createdAt).toString().slice(0, 25)}</Typography>
          </CardContent>
        </Card>
        : <h3>Loading...</h3>}

    </div>
  )
}

export default AccountInfo
