import { Alert, Box, Button, Card, CardContent, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import useFormInput from "../../hooks/use-FormInput";
import { useState } from "react";
import { FeaturedPlayList, Visibility } from "@mui/icons-material";
import { useEffect } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AbcIcon from '@mui/icons-material/Abc';
import { current } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { alertHandlerActions } from "../../Stores/slices/alert-handler-slice";
import constants from "../../util/constants";



const Signup = () => {
    const alertData = useSelector(state=>state.alertHandlerSlice);
    const dispatch = useDispatch();
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        dispatch(alertHandlerActions.closeAlert());
    };
    const history = useHistory();

    const passwordValidator = (str)=>{
        console.log('str = ',str)
        if(str.match(/\s/g)){
            return {
                valid: false,
                helperData: 'Can\'t have space'
            }
        }
        if(!str.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
            return {
                valid: false,
                helperData: 'Minimum eight characters, at least one letter, one number and one special character'
            }
        }
        else{
            return {
                valid: true,
                helperData: ''
            }
        }
    }
    const [showPassword,setShowPassword] = useState(false);
    const showPasswordHandler = ()=>{
        setShowPassword((prevState)=>{
            let old = prevState;
            return !old;
        })
    }
    const emailValidator = (str)=>{
        if(str.trim()==''){
            return {
                valid: false,
                helperData: 'Email is required'
            }
        }
        if(!str.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            return {
                valid: false,
                helperData: 'Invalid Email'
            }
        }
        else{
            return {
                valid: true,
                helperData: ''
            }
        }
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
    const confirmPasswordValidator = (str)=>{
        if(str.trim()===''){
            return {
                valid: false,
                helperData: 'Field is Required'
            }
        }
        if(str!==password.inputValue){
            return {
                valid: false,
                helperData: 'Didn\'t matched with password'
            }
        }
        else{
            return {
                valid: true,
                helperData: ''
            }
        }
    }
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const showConfirmPasswordHandler = ()=>{
        setShowConfirmPassword((prevSate)=>{
            let old  = prevSate;
            return !old;
        })
    }
    const password = useFormInput(passwordValidator,'');
    const email = useFormInput(emailValidator,'');
    const fullName = useFormInput(requiredValidator,'');
    const confirmPassword = useFormInput(confirmPasswordValidator,'');
    let listColor = grey[400];
    const [isFormValid,setIsFormValid] = useState(false)
    useEffect(()=>{
        console.log(password.isValid,email.isValid);
        setIsFormValid(password.isValid && email.isValid && fullName.isValid && confirmPassword.isValid);
    },[password.isValid,email.isValid,confirmPassword.isValid,fullName.isValid])

    const signupHandler = async(e)=>{
        e.preventDefault();
        // let newObj = {
        //     fullName:fullName.inputValue,
        //     email:email.inputValue,
        //     password:password.inputValue,
        // }
        // let requestConfig = {
        //     method: 'Post',
        //     body: JSON.stringify(newObj),
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8'
        //     }
        // }
        // let emailData = [];
        // let gotEmailData = false;
        //  let emailResponse = await fetch('http://localhost:3000/users?email='+email.inputValue)
        //  if(emailResponse.ok){
        //     emailData = await emailResponse.json();
        //     gotEmailData  =true
        //  }
        //  else{
        //     //alert('server error');
        //     // setCurrentMessage('Server Error');
        //     // setCurrentSeverity('error');
        //     // setAlertOpen(true);
        //     // alertHandler('error','Server Error...!!')
        //     dispatch(alertHandlerActions.fireAlert({message:'Server Error...!!',severety:'error'}))
        //  }
        //  if(gotEmailData){
        //     if(emailData.length==0){
        //         fetch('http://localhost:3000/users',requestConfig).then(res=>{
        //         if(!res.ok){
        //             // alertHandler('error','Server Error...!!')
        //             dispatch(alertHandlerActions.fireAlert({message:'Server Error...!!',severety:'error'}))

        //         }
        //         else
        //             return res.json()
        //         }).then(res=>{
        //             console.log('result = ', res);
        //             //alert('signed up')
        //             // alertHandler('success','Signed Up...!!')
        //             dispatch(alertHandlerActions.fireAlert({message:'Signed Up...!!',severety:'success'}))
        //             history.replace('/login');

        //         })
        //     }
        //     else{
        //         // alertHandler('error','That email is taken..!!')
        //         dispatch(alertHandlerActions.fireAlert({message:'That email is taken..!!',severety:'error'}))

        // }   
        const graphQlQuery = {
            query: `
                mutation {
                    signUpUser(userSignUpData:{
                        fullName: "${fullName.inputValue.toString()}",
                        email: "${email.inputValue.toString()}",
                        password: "${password.inputValue.toString()}"
                    }){
                        statusCode,
                        user {
                            fullName,
                            email,
                            _id
                        }
                        
                    }
                }
            `
        }    
        fetch(constants.serverUrl,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(graphQlQuery)
        }).then((res)=>{
            console.log('res',res);
            return res.json()
        }).then((result)=>{
            console.log('sign up result',result)
            if(result.data.signUpUser && result.data.signUpUser.statusCode>=200){
                dispatch(alertHandlerActions.fireAlert({message:'Signed Up...!!',severety:'success'}))
                history.replace('/login');
            }
            else{
                dispatch(alertHandlerActions.fireAlert({message: result.errors[0].message,severety:'error'}))
            }
        })


    
}
    
      
    return ( 
        <Grid container sx={{justifyContent: 'center',p:0,minHeight:'100vh',alignItems:'center'}}>
           
            <Grid  item xs={11} md={7} sx={{backgroundColor: listColor,height:'fit-content',mb:4}}>
                <Grid container sx={{justifyContent: 'center',pt:3}}>
                    <AccountCircleIcon color="secondary" sx={{fontSize:'5em'}}></AccountCircleIcon>
                    
                </Grid>
                <Grid container sx={{justifyContent: 'center'}}>
                    <Typography color='secondary' sx={{fontSize:'1.8em',lineHeight: '1em'}}>Sign Up</Typography>
                </Grid>
                <Grid container sx={{justifyContent: 'center' , mt:2}}>
                    <Grid item xs={9} md={7} sx={{display:'flex',justifyContent:'center'}}>
                        <FormControl fullWidth size='small' sx={{ m: 1 }} color='secondary' variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-fullName">Full Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-fullName"
                                type='text'
                                value={fullName.inputValue}
                                onChange={(e)=>{fullName.inputValueChanged(e)}}
                                onBlur={(e)=>{fullName.inputValueBlur(e)}}
                                error={fullName.hasError}
                                helperText={fullName.helperText}
                                startAdornment={
                                <InputAdornment position="start">
                                    {/* <IconButton
                                    aria-label="toggle password visibility"
                                    //onClick={()=>{showPasswordHandler()}}
                                    //onMouseDown={handleMouseDownPassword}
                                    edge="start"
                                    > */}
                                    <AbcIcon color='secondary' />
                                    {/* /</IconButton> */}
                                </InputAdornment>
                                }
                                label="Full Name"
                            />
                            <FormHelperText sx={{fontSize:'0.6em'}} error={fullName.hasError}>{fullName.helperText}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={9} md={7} sx={{display:'flex',justifyContent:'center'}}>
                        <FormControl fullWidth size='small' sx={{ m: 1 }} color='secondary' variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email"
                                type='text'
                                value={email.inputValue}
                                onChange={(e)=>{email.inputValueChanged(e)}}
                                onBlur={(e)=>{email.inputValueBlur(e)}}
                                error={email.hasError}
                                helperText={email.helperText}
                                startAdornment={
                                <InputAdornment position="start">
                                    {/* <IconButton
                                    aria-label="toggle password visibility"
                                    //onClick={()=>{showPasswordHandler()}}
                                    //onMouseDown={handleMouseDownPassword}
                                    edge="start"
                                    > */}
                                    <EmailIcon color='secondary' />
                                    {/* /</IconButton> */}
                                </InputAdornment>
                                }
                                label="Email"
                            />
                            <FormHelperText sx={{fontSize:'0.6em'}} error={email.hasError}>{email.helperText}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={9} md={7} sx={{display:'flex',justifyContent:'center'}}>
                    <FormControl fullWidth size='small' sx={{ m: 1 }} color='secondary' variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password.inputValue}
                            onChange={(e)=>{password.inputValueChanged(e)}}
                            onBlur={(e)=>{password.inputValueBlur(e)}}
                            error={password.hasError}
                            helperText={password.helperText}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={()=>{showPasswordHandler()}}
                                //onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                <Visibility color='secondary' />
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        />
                        <FormHelperText sx={{fontSize:'0.6em'}} error={password.hasError}>{password.helperText}</FormHelperText>
                    </FormControl>
                    </Grid>
                   
                    <Grid item xs={9} md={7} sx={{display:'flex',justifyContent:'center'}}>
                        <FormControl fullWidth size='small' sx={{ m: 1 }} color='secondary' variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword.inputValue}
                                onChange={(e)=>{confirmPassword.inputValueChanged(e)}}
                                onBlur={(e)=>{confirmPassword.inputValueBlur(e)}}
                                error={confirmPassword.hasError}
                                helperText={confirmPassword.helperText}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={()=>{showConfirmPasswordHandler()}}
                                    //onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    <Visibility color='secondary' />
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Confirm Password"
                            />
                            <FormHelperText sx={{fontSize:'0.6em'}} error={confirmPassword.hasError}>{confirmPassword.helperText}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={9} md={7} sx={{display: 'flex',justifyContent: 'center', my:2}}>
                        <Button disabled={!isFormValid} color='secondary' variant="contained" onClick={(e)=>{signupHandler(e)}} sx={{width:'15ch'}}>Sign Up</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
     );
}
 
export default Signup;