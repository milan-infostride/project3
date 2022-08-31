import { Avatar, Button, Card, CardActions, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, useMediaQuery, useTheme } from "@mui/material";
import { purple } from "@mui/material/colors";
import EditIcon from '@mui/icons-material/Edit';

import { forwardRef, useEffect, useReducer, useState } from "react";
import { useRef } from "react";
import { textAlign } from "@mui/system";
import { useImperativeHandle } from "react";

const EditAddressModal = forwardRef((props,ref) => {
    let textRef = useRef();
    const [textWidth,setTextWidth] = useState('');
    const setWidth = ()=>{
        setTimeout(()=>{
            // console.log('textRef = ',textRef)
            setTextWidth(textRef.current.clientWidth);

        },500)
    }
    useImperativeHandle(ref,()=>{
        return {
            setWidth
        }
    })    
    
    let theme = useTheme();
    let isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    
    const states = ['Punjab','Haryana','Himachal Pardesh','Mharashtra']

    const addFormInputsReducer = (prevState,action)=>{
        if(action.type=='init'){
            return props.initialState;
        }
        if(action.type=='fieldChanged'){
            let oldState = {...prevState};
            oldState[action.value.fieldName] = action.value.newValue;
            return oldState;
        }
    }
    const [addFormInputs,addFormInputsDispatch] = useReducer(addFormInputsReducer,props.initialState);
    const fieldChangeHandler = (e,name)=>{
        let action = {
            type: 'fieldChanged',
            value: {
                fieldName: name,
                newValue: e.target.value
            }
        }
        addFormInputsDispatch(action)
    }
    const editAddressHandler = ()=>{
        let newAddress = {...addFormInputs};
        props.editAddressHandler(newAddress);
        addFormInputsDispatch({type:'init'})
        props.closeEditModal();
    }
    const closeEditMoadal = ()=>{
        addFormInputsDispatch({type:'init'});
        props.closeEditModal();
    }
    return ( 
        <Modal
            // BackdropProps={style}
            // ref={ref}
            open={props.editModalState}
            onClose={closeEditMoadal}
            
        >
            <Card sx={{ width: isDesktop?'auto':330, maxWidth: isDesktop?345:454,position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)', }} raised>
                <CardHeader
                    avatar={
                    <Avatar sx={{ bgcolor: purple[500] }}>
                        <EditIcon ></EditIcon>
                    </Avatar>
                    }
                    
                    title="Edit Address"
                    
                />
                <CardContent>
                    <Grid container sx={{justifyContent:'center'}}>
                    <Grid item mb={2}><TextField id='name' label='Name' size='small' onChange={(e)=>{ fieldChangeHandler(e,'name')}} color='secondary' value={addFormInputs.name}  ></TextField></Grid>

                        <Grid item mb={2}><TextField multiline sx={{width: textWidth}} 
                        onChange={(e)=>{ fieldChangeHandler(e,'building_location')}} value={addFormInputs.building_location}   rows={3} id='bl' label='Building &#38; Location' variant="outlined"  color='secondary' size='small'></TextField></Grid>
                        <Grid item mb={2}><TextField id='city' label='City' size='small' onChange={(e)=>{ fieldChangeHandler(e,'city')}} color='secondary' value={addFormInputs.city}  ref={textRef}></TextField></Grid>
                        <Grid item mb={2}>
                            <FormControl color='secondary' size="small" variant="filled" sx={{ minWidth: 160 }}>
                                <InputLabel size="small" id="demo-simple-select-filled-label">State</InputLabel>
                                <Select
                                    sx={{ minWidth: 120 , width: textWidth}}
                                    size='small'
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={addFormInputs.state}
                                    onChange={(e)=>{ fieldChangeHandler(e,'state')}}
                                >
                                    {states.map((item,index)=>{return <MenuItem value={item} key={index}>{item}</MenuItem>})}
                                    {/* <MenuItem value={'dl'}>Date (Latest)</MenuItem>
                                    <MenuItem value={'do'}>Date (Oldest)</MenuItem>

                                    <MenuItem value={'a-z'}>Name (A-Z)</MenuItem>
                                    <MenuItem value={'z-a'}>Name (Z-A)</MenuItem> */}

                                </Select>
                            </FormControl>
                        </Grid>
                        
                    </Grid>
                </CardContent>
                <CardActions sx={{textAlign: 'center'}} disableSpacing>
                    <Button //sx={{width: textWidth}}
                         variant='contained' startIcon={<EditIcon />} size='small' color='secondary' onClick={()=>{editAddressHandler();}}>Edit</Button>
                </CardActions>
            </Card>
            
            
        </Modal>
     );
})
 
export default EditAddressModal;