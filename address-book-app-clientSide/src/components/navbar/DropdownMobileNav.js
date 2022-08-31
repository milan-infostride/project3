import { grey } from '@mui/material/colors';
const bgcolor = grey[900];
const DropdownMoblieNav = (props)=>{
    

    return (
        <div id="mySidenav" class="sidenav" style={{
            backgroundColor: bgcolor,
            color: '#fff' 
        }}>
            
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
        </div>
    )
}