import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import { Button, Grid } from '@mui/material';
import './Confirmation.css';
import { useNavigate } from 'react-router-dom';
import Agent from './Agent';
import Vehicle from './Vehicle';
import ContextBuilder from '../utilities/ContextBuilder';
import Api from '../api/Api';

const Confirmation = ({ details }) => {
  const [isCab, setIsCab] = useState(false);
  const navigate = useNavigate();

  const onTrackVehicle = async () => {
    const sampleContext = ContextBuilder.getContext('track', details.context.bpp_uri);
    const data = {
      context: {
        ...sampleContext,
        bpp_id: details.context.bpp_id,
      },
      message: {
        order: {
          id: details.message.order.id,
        },
      },
    };
    const response = await Api.post('/track', data);
    if (response.message_id) {
      navigate('/track', { state: { ...response } });
    }
  };

  useEffect(() => {
    if (details.context.bpp_id
      === 'sample_mobility_bpp_cabs') {
      setIsCab(true);
    }
  }, []);

  const cabCheck = () => (
    <div>
      <Vehicle vehicle={details.message.order.fulfillment.vehicle} />
      <Agent agent={details.message.order.fulfillment.agent} />
    </div>
  );

  return (
    <Grid fullWidth sx={{ width: 1, px: 5 }}>
      <div className="invoice-confirmation">
        <CheckCircleSharpIcon
          className="invoice-successIcon"
          sx={{ fontSize: '5em' }}
        />
      </div>
      <Typography
        variant="body1"
        display="block"
        gutterBottom
        textAlign="center"
        fontSize="2em"
      >
        Your booking is confirmed.
      </Typography>
      <Typography variant="body1" display="block" gutterBottom>
        Transaction ID:
        {' '}
        {details.context.transaction_id}
      </Typography>
      {' '}
      <Typography variant="body1" display="block" gutterBottom>
        Fare:
        {' '}
        {details.message.order.items[0].price.currency}
        {' '}
        {details.message.order.items[0].price.value}
      </Typography>
      {isCab && cabCheck()}
      {isCab && (
      <Button
        fullWidth
        variant="contained"
        sx={{ my: 2 }}
        onClick={onTrackVehicle}
      >
        Track
      </Button>
      )}
      <Button
        fullWidth
        variant="contained"
        sx={{ my: 2 }}
      >
        Status
      </Button>

    </Grid>
  );
};

export default Confirmation;
