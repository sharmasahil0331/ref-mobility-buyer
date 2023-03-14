import Grid from '@mui/material/Grid';
import React from 'react';
import Typography from '@mui/material/Typography';
import TrainIcon from '@mui/icons-material/Train';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import Price from './Price';
import Time from './Time';
import './Item.css';
import './Time.css';

const Item = ({
  item, category, isParent, onItemSelect, isSelected,
}) => {
  const onSelect = () => {
    if (isParent) return;
    onItemSelect(
      item,
      !isSelected,
    );
  };
  const containerStyle = isParent ? 'parent-item' : 'item-with-border';
  return (
    <Grid
      container
      className={containerStyle}
      display="flex"
      gap={10}
      style={{ padding: '0px' }}
      onClick={onSelect}
      key={item.id}
      backgroundColor={isSelected ? 'rgba(50, 123, 24, 0.1)' : 'white'}
    >
      { item.descriptor.images && item.descriptor.images.length > 0
        ? (
          <Grid
            item
            xs={2}
            alignItems="center"
            display="flex"
            paddingLeft={2}
            marginRight={1}
            height="60px"
            width="90px"
          >
            <img
              height={32}
              width={32}
              src={item.descriptor.images[0]}
              alt="taxi-icon"
            />
          </Grid>
        ) : (
          <TrainIcon className="train-icon" />
        )}
      {
        item.time
        && (
          <Grid
            item
            xs={2.5}
            alignItems="center"
            display="flex"
            paddingLeft="4%"
            paddingBottom="5px"
            marginTop="6px"
            color="#000"
            height="60px"
            width="65px"
          >
            <div>
              <Typography variant="body1" style={{ color: 'grey', fontSize: 'small' }}>
                <AccessTimeOutlinedIcon style={{ fontSize: 'small', marginRight: '3px', color: 'grey' }} />
                Ride
              </Typography>
              <Typography variant="body1" style={{ fontSize: 'medium', paddingLeft: '3px' }}>
                <Time time={item.time} />
              </Typography>
            </div>
          </Grid>
        )
      }

      <Grid
        item
        xs={3.5}
        alignItems="center"
        justifyContent="center"
        display="flex"
        paddingLeft="4%"
        paddingRight="3%"
        paddingBottom="5px"
        color="#000"
        height="60px"
        width="90px"
      >
        {isParent
        && (
        <Typography
          variant="body1"
          style={{
            fontSize: 'small', fontWeight: '600', marginLeft: '10px', paddingTop: '20px', marginTop: '5px',
          }}
        >
          {item.descriptor.name}
        </Typography>
        )}
        {!isParent && category
        && (
        <Typography
          variant="body1"
          style={{
            fontSize: 'small', fontWeight: '600', marginLeft: '10px', paddingTop: '20px', marginTop: '5px',
          }}
        >
          {category}
        </Typography>
        )}
        {!isParent && !category
        && (
          <div style={{
            alignContent: 'center', marginLeft: '15px', paddingTop: '6px',
          }}
          >
            <Typography variant="body1" style={{ color: 'grey', fontSize: 'small' }}>
              <DirectionsCarOutlinedIcon style={{
                fontSize: 'small', marginRight: '2px', color: 'grey',
              }}
              />
              Vehicle
            </Typography>
            <Typography variant="body1" style={{ fontSize: 'small', fontWeight: '500', paddingLeft: '1px' }}>
              {item.descriptor.name}
            </Typography>
          </div>
        )}
      </Grid>
      <Grid
        item
        xs={1.5}
        alignItems="center"
        display="flex"
        paddingTop="8px"
        paddingBottom="5px"
        paddingLeft="8%"
        height="70px"
      >
        <div>
          <Typography style={{ color: 'grey', fontSize: 'small' }}>
            <CurrencyRupeeOutlinedIcon style={{ fontSize: 'small', color: 'grey' }} />
            Fare
          </Typography>
          <Typography variant="body1" style={{ fontSize: 'small', paddingLeft: '5%' }}>
            <Price price={item.price} variant="medium" />
          </Typography>
        </div>

      </Grid>
    </Grid>
  );
};
export default Item;
