import { Alert, Box, Button, Card, CardContent, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import useFormInput from "../../hooks/use-FormInput";
import { useState } from "react";
import { Visibility } from "@mui/icons-material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUserActions } from "../../Stores/slices/current-user-slice";
import { useHistory } from "react-router-dom";
import { alertHandlerActions } from "../../Stores/slices/alert-handler-slice";
import constants from "../../util/constants";
// /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ -- Minimum eight characters, at least one letter, one number and one special character
const Login = () => {
    useEffect(()=>{
        if(currentUser.id!=-1)
            history.replace('/main');
    },[])
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
    const password = useFormInput(passwordValidator,'');
    const email = useFormInput(emailValidator,'');
    let listColor = grey[400];
    const [isFormValid,setIsFormValid] = useState(false)
    useEffect(()=>{console.log(password.isValid,email.isValid);setIsFormValid(password.isValid && email.isValid);},[password.isValid,email.isValid])
    const currentUser = useSelector(state=> state.currentUser.currentUser)
   
    const currentUserDispatch = useDispatch();
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
       
        currentUserDispatch(alertHandlerActions.closeAlert());
    };
    const loginHandler = async()=>{
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
        //     currentUserDispatch(alertHandlerActions.fireAlert({message:'Server Error',severety:'error'}))
        //  }
        //  if(gotEmailData){
        //     if(emailData.length==0){
        //         // alertHandler('warning','No user with that email..!!')
        //         currentUserDispatch(alertHandlerActions.fireAlert({message:'No user with that email..!!',severety:'warning'}))

        //     }
        //     else{
        //         let user = emailData[0];
        //         if(user.password == password.inputValue){
        //             delete user.password
        //             localStorage.setItem('currentUser',JSON.stringify(user));
        //             currentUserDispatch(currentUserActions.setCurrentUser({currentUser: user}))
        //             currentUserDispatch(alertHandlerActions.fireAlert({message:'Logged In...!!',severety:'success'}))

        //             // alertHandler('success','Logged In...!!');
        //             history.replace('/main');
        //             window.location.reload();
                    
        //         }
        //         else{
        //             currentUserDispatch(alertHandlerActions.fireAlert({message:'Wrong Password...!!',severety:'error'}))

        //             // alertHandler('error','Wrong Password...!!')
        //         }
        //     }

        //  }
        // const loginInputData = {
        //     email: email.inputValue,
        //     password: password.inputValue
        // } 
        console.log('email', email.inputValue);
        const graphQuery = {
            query: `
                mutation {
                    loginUser(loginData: {
                        email: "${email.inputValue.toString()}",
                        password: "${password.inputValue.toString()}"
                    }){
                        statusCode,
                        user {
                            fullName,
                            _id,
                            email
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
            body: JSON.stringify(graphQuery)
        }).then((res)=>{
            return res.json();
        }).then((result)=>{
            console.log('login result',result)
            if(result.data.loginUser.statusCode && result.data.loginUser.statusCode>=200){
                localStorage.setItem('currentUser',JSON.stringify({...result.data.loginUser.user,token: result.data.loginUser.token}));
                currentUserDispatch(currentUserActions.setCurrentUser({currentUser: result.data.loginUser.user}))
                currentUserDispatch(alertHandlerActions.fireAlert({message:'Logged In...!!',severety:'success'}))
                history.replace('/main');
                window.location.reload();
            }
            else{
                currentUserDispatch(alertHandlerActions.fireAlert({message: result.errors[0].message ,severety:'error'}))
            }
        })

    }

    return ( 
        <Grid container sx={{justifyContent: 'center',p:0,minHeight:'80vh',alignItems:'center'}}>
           
            <Grid  item xs={11} md={7} sx={{backgroundColor: listColor,height:'fit-content'}}>
                <Grid container sx={{justifyContent: 'center',pt:3}}>
                    <LockIcon color="secondary" sx={{fontSize:'5em'}}></LockIcon>
                    
                </Grid>
                <Grid container sx={{justifyContent: 'center'}}>
                    <Typography color='secondary' sx={{fontSize:'1.8em',lineHeight: '1em'}}>Login</Typography>
                </Grid>
                <Grid container sx={{justifyContent: 'center' , mt:2}}>
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
                    <Grid item xs={9} md={7} sx={{display: 'flex',justifyContent: 'center', my:2}}>
                        <Button disabled={!isFormValid} color='secondary' onClick={loginHandler} variant="contained" sx={{width:'15ch'}}>Login</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
     );
}
 
export default Login;