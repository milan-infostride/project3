import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRef } from "react";
import { useState } from "react";
import EditAddressModal from "./EditAddressModal";
const AddressCard = (props) => {
    
    // let actionRef = useRef();
    // setTimeout(()=>{console.log(actionRef); setActionHeight(actionRef.current.clientHeight)},500)
    
    // const [actionHeight,setActionHeight] = useState();
    const [editModalState,seteditModalState] = useState(false);
    // const [textWidth,setTextWidth] = useState();

    const closeEditModal = ()=>{seteditModalState(false)};
    const openEditModal = ()=>{
        
        seteditModalState(true);
        modalRef.current.setWidth();
    };
    let modalRef = useRef();

    
    return ( 
        <Card sx={{ maxWidth: 345,}} raised>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: purple[500] }} aria-label="recipe">
                    {props.address.name.charAt(0).toUpperCase()}
                </Avatar>
                }
                
                title={props.address.name}
                subheader={props.address.date}
            />
            <CardContent>
                <Grid container >
                    <Grid container item mb={0.6}>
                        <Grid item sx={{display:'flex-item'}} xs={12} color='text.secondary'>Building &#38; Location</Grid>
                        <Typography variant='body2' >{props.address.building_location}</Typography>
                    </Grid>
                    <Divider></Divider>
                    <Grid container item mb={0.6}>
                        <Grid item sx={{display:'flex-item'}} xs={12} color='text.secondary'>City</Grid>
                        <Grid item sx={{display:'flex-item'}} xs={12} >{props.address.city}</Grid>
                    </Grid>
                    <Divider />
                    <Grid container item >
                        <Grid item sx={{display:'flex-item'}} xs={12} color='text.secondary'>State</Grid>
                        <Grid item sx={{display:'flex-item'}} xs={12} >{props.address.state}</Grid>
                    </Grid>
                   
                </Grid>
            </CardContent>
            <CardActions   disableSpacing>
                <Button variant='contained' startIcon={<DeleteIcon />} size='small' color='error' onClick={()=>{props.deleteHandler(props.address.id)}}>Delete</Button>
                <Button variant='contained' sx={{ml:2}} startIcon={<EditIcon />} size='small' color='secondary' onClick={()=>{openEditModal()}}>Edit</Button>
            </CardActions>
            <EditAddressModal ref={modalRef} editAddressHandler = {props.editAddressHandler} initialState={props.address} openEditModal={openEditModal} closeEditModal={closeEditModal} editModalState={editModalState} />
      </Card>
     );
}
 
export default AddressCard;