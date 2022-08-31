import { Avatar, Button, Card, CardActions, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography, useMediaQuery , useTheme } from "@mui/material";
// import { bgcolor } from "@mui/system";
import { grey, purple } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useReducer, useRef, useState } from "react";
import './centerModal.css'


import AddressModal from "./AddressModal";
import { createRef } from "react";
import { KeyOutlined, StarRateSharp } from "@mui/icons-material";
import { isValidDateValue } from "@testing-library/user-event/dist/utils";
import { useEffect } from "react";
import commanFunctions from "../commanFunctions";
import useFormInput from "../../hooks/use-FormInput";
import { addressActions } from "../../Stores/slices/adderesses-slice";
import { useDispatch } from "react-redux";
// import { useTheme } from "@emotion/react";


// const SearchIconWrapper = styled('div')(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }));

//   const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: 'inherit',
//     '& .MuiInputBase-input': {
//       padding: theme.spacing(1, 1, 1, 0),
//       // vertical padding + font size from searchIcon
//       paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//       transition: theme.transitions.create('width'),
//       width: '100%',
//       [theme.breakpoints.up('sm')]: {
//         width: '12ch',
//         '&:focus': {
//           width: '20ch',
//         },
//       },
//       [theme.breakpoints.down('sm')]: {
//         width: '75%'
//     }
//     },
//   }));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
            width: '20ch',
          },
        
      },
      [theme.breakpoints.down('sm')]: {
        width: '75%'
    }
    },
  }));
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    height: '2.5em',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
      

    },
    [theme.breakpoints.down('sm')]: {
        width: '75%'
    }
  }));

const SecondaryMenuBar = (props) => {
    const addressDispatch = useDispatch();
    let theme = useTheme();
    let isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    
    
    const [sortFilter,setSortFilter] = useState('');
    

    let bgColor = grey[900];
    let listColor = grey[500];
    const [modalState,setModalState] = useState(false);
    const [modalHeight,setModalHeight] =useState();
    const [modalWidth,setModalWidth] = useState();
    const [selectState,setSelectState] = useState();
    const states = ['Punjab','Haryana','Himachal Pardesh','Mharashtra']
    const ref = useRef();
    const textRef = useRef();
    const [textWidth,setTextWidth] = useState();
    const openAddModal = ()=>{
        
        
        
        name.reset();
        building_location.reset();
        city.reset();
        state.reset();
        setModalState(true);
        setTimeout(()=>{console.log(ref.current.clientHeight,ref.current.clientWidth);
            setModalHeight(ref.current.clientHeight);
            setModalWidth(ref.current.clientWidth);
            setTextWidth(textRef.current.clientWidth);
            ref.current.classList.add('centerModal')
        },500)
    }
    const closeAddModal = ()=>{
        
        setModalState(false)
    }
    const style = {
        justifyContent: 'center',
        alignItems: 'center'
    }
    
    
    const requiredValidator = (data)=>{
        if(data.trim()===''){
            return {
                valid: false,
                helperData: 'Field is required'
            }
        }
        else{
            return{
                valid: true,
                helperData: ''
            }
        }
    }
    const name = useFormInput(requiredValidator,'');
    const building_location = useFormInput(requiredValidator,'');
    const city = useFormInput(requiredValidator,'');
    const state = useFormInput(requiredValidator,'');
    const [isFormValid,setIsFormValid] = useState(false);
    useEffect(()=>{
        setIsFormValid(!(name.isValid && building_location.isValid && city.isValid && state.isValid))

    },[name.isValid,building_location.isValid,city.isValid,state.isValid])
     
    const addClicked = (sortType)=>{
        let newAddress = {
            name: name.inputValue,
            building_location: building_location.inputValue,
            city: city.inputValue,
            state: state.inputValue
        
        };
        
        newAddress.date = new Date().getTime();
        props.addAdressHandler(newAddress,sortType);
        closeAddModal();
        
    }
    const onStateChange = (e)=>{

        addressDispatch(addressActions.sortAddresses({sortType:e.target.value}))
    }
    // let searchState = ''

    // const [searchState,setSearchState] = useState('');
    // useEffect(()=>{
    //     let searchTimeout = setTimeout(()=>{
    //         if(searchState.length>0){
    //             let keywords = searchState.split(' ');
    //             // let commanFunctions = JSON.parse(localStorage.getItem('commanFunctions'));
    //             keywords = commanFunctions.sanatizeWords(keywords);
    //             props.searchHandler(keywords);
    //         }
    //     },1000)
    //     return ()=>{clearTimeout(searchTimeout)}
    // },[searchState])
    const searchValidator = (text)=>{
        if(text.trim()===''){
            return {
                valid: false,
                helperData: 'can\'t be empty'
            }
        }
        else{
            return {
                valid: true,
                helperData: ''
            }
        }
    }
    
    const searchText = useFormInput(searchValidator,'')

    const search= (e)=>{
        // console.log(e.keyCode);
        // searchText.inputValueChanged(e)
        
        if(e.keyCode==13&&searchText.isValid){
            
            console.log(e.target.value);
            // let keyWords = commanFunctions.sanatizeWords(e.target.value.split(' '));
            // // console.log('keys'=keyWords);
            // let action = {
            //     type: 'search',
            //     value: {
            //         keyWords: keyWords
            //     }
            // }
            // props.addressDispatch(action)
            props.setSearchString(e.target.value)
            props.searchAddressesHandler(e.target.value);
            
        }
    }
    
    return ( 
        <Grid container sx={{backgroundColor: listColor}} spacing={2}>
            <Grid item xs={6} md={3} sx={{display:'flex-item',py:2,alignItems:'middle',justifyContent:'center'}}>
                <Button variant='contained' size='small' onClick={openAddModal} color="secondary" endIcon={<AddCircleIcon />}>Add</Button>
                <Button variant='contained' size='small' color='secondary' sx={{ml:2}} onClick={()=>{window.location.reload()}}>Reset</Button>
            </Grid>
            <Grid item xs={6} md={3} sx={{display:'flex-item',py:2,alignItems:'middle',justifyContent:'center'}}>
                <Search >
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder={searchText.hasError?searchText.helperText:"Search…"}
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchText.inputValue}
                    onChange={(e)=>{searchText.inputValueChanged(e);}}
                    onKeyDown = {(e)=>{ search(e)}}
                
                    />
            </Search>
            </Grid>
            <Grid item xs={6} md={3} sx={{display:'flex-item',py:2,alignItems:'middle',justifyContent:'center'}}>
                <FormControl color='secondary' size="small" variant="filled" sx={{ minWidth: 120 }}>
                    <InputLabel size="small" id="demo-simple-select-filled-label">Sort</InputLabel>
                    <Select
                        size='small'
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={sortFilter}
                        onChange={(e)=>{setSortFilter(e.target.value); onStateChange(e)}}
                    >
                    
                        <MenuItem value={'dl'}>Date (Latest)</MenuItem>
                        <MenuItem value={'do'}>Date (Oldest)</MenuItem>

                        <MenuItem value={'a-z'}>Name (A-Z)</MenuItem>
                        <MenuItem value={'z-a'}>Name (Z-A)</MenuItem>

                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6} md={3} sx={{display:'flex-item',py:2,alignItems:'middle',justifyContent:'center'}}>
              <Button color='secondary' size='small' variant="contained">Total = {props.addresses.length}</Button>
                    
                
            </Grid>
            <Modal
            BackdropProps={style}
            ref={ref}
            open={modalState}
            onClose={closeAddModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card sx={{ width: isDesktop?'auto':330, maxWidth: isDesktop?345:454,position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)', }} raised>
                <CardHeader
                    avatar={
                    <Avatar sx={{ bgcolor: purple[500] }}>
                        <AddIcon ></AddIcon>
                    </Avatar>
                    }
                    
                    title="Add Address"
                    
                />
                <CardContent>
                    <Grid container sx={{justifyContent:'center'}}>
                    <Grid item mb={2}><TextField id='name' label='Name' size='small' onBlur={(e)=>{name.inputValueBlur(e)}} onChange={(e)=>{name.inputValueChanged(e)}} color='secondary' value={name.inputValue} error={name.hasError} helperText={name.helperText} ref={textRef}></TextField></Grid>

                        <Grid item mb={2}><TextField multiline sx={{width: textWidth}} onBlur={(e)=>{building_location.inputValueBlur(e)}} onChange={(e)=>{ building_location.inputValueChanged(e)}} value={building_location.inputValue} error={building_location.hasError} helperText={building_location.helperText}  rows={3} id='bl' label='Building &#38; Location' variant="outlined"  color='secondary' size='small'></TextField></Grid>
                        <Grid item mb={2}><TextField id='city' label='City' size='small' onBlur={(e)=>{city.inputValueBlur(e)}} onChange={(e)=>{ city.inputValueChanged(e)}} color='secondary' value={city.inputValue} error={city.hasError} helperText={city.helperText} ref={textRef}></TextField></Grid>
                        <Grid item mb={2}>
                            <FormControl color='secondary' size="small" variant="filled" sx={{ minWidth: 120 , width: textWidth}}>
                                <InputLabel size="small" id="demo-simple-select-filled-label">State {state.helperText}</InputLabel>
                                <Select
                                    size='small'
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    onBlur={(e)=>{state.inputValueBlur(e)}}
                                    value={state.inputValue}
                                    onChange={(e)=>{ state.inputValueChanged(e)}}
                                    error={state.hasError}
                                    //helperText={state.helperText}
                                >
                                    {states.map((item,index)=>{return <MenuItem value={item} key={index}>{item}</MenuItem>})}
                                    {/* <MenuItem value={'dl'}>Date (Latest)</MenuItem>
                                    <MenuItem value={'do'}>Date (Oldest)</MenuItem>

                                    <MenuItem value={'a-z'}>Name (A-Z)</MenuItem>
                                    <MenuItem value={'z-a'}>Name (Z-A)</MenuItem> */}

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item mb={1}><Button sx={{width: textWidth}} variant='contained' startIcon={<AddCircleIcon />} size='small' color='secondary' onClick={()=>{addClicked(sortFilter)}}
                            disabled={isFormValid}
                        >Add</Button></Grid>
                    </Grid>
                </CardContent>
                {/* <CardActions disableSpacing>
                    
                </CardActions> */}
            </Card>
            
            
        </Modal>
        </Grid>
     );
}
 
export default SecondaryMenuBar;