import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Grid, Modal, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { purple } from "@mui/material/colors";
import { useRef } from "react";


const AddressModal = (props,ref) => {
    // let {modalState,openAddModal,closeAddModal} = props;
    
    return ( 
        <Modal
            sx={{
                position: 'absolute',
                top: '25%',
                left: '35%',
                // transform: 'translate(-50%, -50%)'
            }}
            ref={ref}
            open={props.modalState}
            onClose={props.onAddModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card sx={{ maxWidth: 345 }} raised>
                <CardHeader
                    avatar={
                    <Avatar sx={{ bgcolor: purple[500] }}>
                        <AddIcon ></AddIcon>
                    </Avatar>
                    }
                    
                    title="Add Address"
                    
                />
                <CardContent>
                    <Grid container>
                        <Grid item><TextField  id='bl' label='Building &#38; Location' variant="outlined"></TextField></Grid>
                        <Grid item><TextField id='city' label='City'></TextField></Grid>
                    </Grid>
                </CardContent>
                <CardActions disableSpacing>
                    <Button variant='contained' startIcon={<AddCircleIcon />} size='small' color='success'>Delete</Button>
                </CardActions>
            </Card>
            
            
        </Modal>
        );
}
 
export default AddressModal;