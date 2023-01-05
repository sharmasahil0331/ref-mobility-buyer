import React from 'react';
import './Catalog.css';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Item from './Item';

const bppProvider = (provider, details) => (
  <Grid container paddingX={4} key={provider.id}>
    <Grid container paddingY={2}>
      {provider.descriptor.images && provider.descriptor.images.length > 0 && (
      <Grid item xs={1} className="catalog-image">
        <img height={48} width={48} src={provider.descriptor.images[0]} alt="" />
      </Grid>
      )}
      <Grid item xs={11} display="flex" alignItems="center" paddingLeft={4}>
        <Typography variant="h6" gutterBottom>
          {provider.descriptor.name}
        </Typography>
      </Grid>
    </Grid>
    {provider.items.map((item) => (
      <Item key={item.id} item={item} details={details} />
    ))}
  </Grid>
);

const Catalog = ({
  catalog,
  showModal,
  bookingInformation,
  bookingResponse,
  loadingJourney,
  handleClose,
  onSelectJourney,
}) => {
  const bppProviders = catalog['bpp/providers'];
  const journeyDetails = {
    showModal,
    bookingInformation,
    bookingResponse,
    loadingJourney,
    handleClose,
    onSelectJourney,
  };
  return (
    <div>
      {bppProviders.map((provider) => bppProvider(provider, journeyDetails))}
    </div>
  );
};

export default Catalog;
