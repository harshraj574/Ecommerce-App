import { useState , useContext } from "react";


import {Dialog,TextField,Box,Typography,Button,styled} from "@mui/material";

import { authenticateSingup, authenticateLogin } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

const Component = styled(Box)`
   height: 70vh;
   width: 90vh;
`
const Image = styled(Box)`
   background: #2874f0 url( https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
   height: 98%;
   width: 28%;
   padding: 45px 35px;
   &>p,&>h5{
    color: #FFFFFF;
    font-weight: 600;
   }
`

const Wrapper = styled(Box)`
  display:flex;
  flex-direction: column;
  padding: 25px 35px;
  flex: 1;
  &>div, &>button, &>p{
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
   text-transform: none;
   background: #FB641B;
   color: #FFF;
   height: 48px;
   border-radius:2px;
`
const RequestOTP = styled(Button)`
   text-transform: none;
   background: #fff;
   color: #2874f0;
   height: 48px;
   border-radius:2px;
   box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Text = styled(Typography)`
 font-size: 10.5px;
 color: #878787;
`
const CreateAccount = styled(Typography)`
 font-size: 11px;
 text-align: center;
 color: #2874f0;
 font-weight: 600;
 cursor: pointer;
`
const Error = styled(Typography)`
 font-size: 10px;
 color: #ff6161;
 line-height: 0;
 margin-top: 10px;
 font-weight: 600
`


const accountInitialValues = {
    login:{
        view: 'login',
        heading: "Login",
        subHeading: "Get access to your Orders, Wishlist and Recommendations"
    },
    signup:{
        view: 'signup',
        heading: "Looks like you're new here!",
        subHeading: 'Sign up with your mobile number to get started'
    }
}

const signupInitialValues = {
    firstname: '',
    Lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
}

const loginInitialValues = {
    username: '',
    password: ''
}

const LoginDialog = ({open,setOpen})=>{

    const [account, toggleAccount] = useState(accountInitialValues.login);
    const [signup,setSignup] = useState(signupInitialValues);
    const [login,setLogin] = useState(loginInitialValues);
    const [ error, showError] = useState(false);

    const {setAccount} = useContext(DataContext);

    const handleClose = ()=>{
        setOpen(false);
        toggleAccount(accountInitialValues.login);
        showError(false);
    }

    const toggleSignup = ()=>{
        toggleAccount(accountInitialValues.signup);
    }

    const onInputChange = (e)=>{
        setSignup({ ...signup, [e.target.name] : e.target.value});
    }

    const signupUser = async ()=>{
      let response =  await authenticateSingup(signup);
      if(!response) return;
      handleClose();
      setAccount(signup.username);
    }

    const onValueChange = (e)=>{

        setLogin({...login,[e.target.name]: e.target.value});
    }

    const loginUser = async ()=>{
          let response =  await authenticateLogin(login);
          if(!response) 
            showError(true);
        else {
            showError(false);
            handleClose();
            setAccount(login.username);
        }
    }


    return(
       <Dialog open={open} onClose={handleClose} PaperProps={{sx: {maxWidth: 'unset'}}}>
        <Component>
            <Box style={{display: 'flex', height:'100%'}}>
            <Image>
                <Typography variant="h5">{account.heading}</Typography>
                <Typography style={{marginTop:20}}>{account.subHeading}</Typography>
            </Image>
            { 
               account.view === 'login' ?
            <Wrapper>
                <TextField label="Enter UserName" variant="standard" onChange={(e)=> onValueChange(e)} name="username" />
               { error && <Error>Please Enter Valid UserName or Password</Error> }
                <TextField label="Enter Password" variant="standard"  onChange={(e)=> onValueChange(e)} name="password" />
                <Text>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Text>
                <LoginButton onClick={()=> loginUser()}>Login</LoginButton>
                <Typography style={{textAlign:'center'}}>OR</Typography>
                <RequestOTP>Request OTP</RequestOTP>
                <CreateAccount onClick={()=> toggleSignup()}>New to Flipkart? Create an account</CreateAccount>
            </Wrapper>
            :
            <Wrapper>
            <TextField label="Enter Firstname" variant="standard" onChange={(e)=> onInputChange(e)} name="firstname" />
            <TextField label="Enter Lastname" variant="standard" onChange={(e)=> onInputChange(e)} name="lastname" />
            <TextField label="Enter Username" variant="standard" onChange={(e)=> onInputChange(e)} name="username" />
            <TextField label="Enter Email" variant="standard" onChange={(e)=> onInputChange(e)} name="email" />
            <TextField label="Enter Password" variant="standard" onChange={(e)=> onInputChange(e)} name="password" />
            <TextField label="Enter Phone" variant="standard" onChange={(e)=> onInputChange(e)} name="phone" />
            
            <LoginButton onClick={()=> signupUser()}>Continue</LoginButton>
        </Wrapper>
             }

            </Box>
        </Component>
       </Dialog>
    )
}
export default LoginDialog;