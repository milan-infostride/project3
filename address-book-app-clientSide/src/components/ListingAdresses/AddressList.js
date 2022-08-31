import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import AddressCard from "./AddressCard";


const AddressList = (props) => {
    let theme = useTheme();
    let isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    let listbg = grey[500];
    return ( 
        <Grid container sx={{justifyContent: 'center',mt:5, mb:10}}>
            <Grid container spacing={2} item xs={12} md={9} sx={{backgroundColor : grey[600], p:!isDesktop?3:5}}>
                {props.addresses.map((address)=>{
                    return (
                        <Grid item='item' xs={12} md={6} key={address.id}>
                            <AddressCard address={address} editAddressHandler = {props.editAddressHandler} deleteHandler={props.deleteHandler} />
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>
     );
}
 
export default AddressList;