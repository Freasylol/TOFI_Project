import { Container, makeStyles, Grid } from "@material-ui/core";
// import FilterBar from '../components/FilterBar';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const useStyles = makeStyles((theme) => ({
  label: {
    paddingTop: 100,
    display: 'block'
  },
  
}))

const Shop = () => {
  const classes = useStyles();
  return (
    <Container>
    <Grid container className={classes.label}>
      <Grid item md={3}>
        <ListItemButton>sdfsfdfddf</ListItemButton>
        <ListItemButton>fdsafasdf</ListItemButton>
      </Grid>
      <Grid item md={9}></Grid>
    </Grid> 
  </Container>
  )
}

export default Shop;