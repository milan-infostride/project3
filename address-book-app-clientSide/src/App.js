import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import SecondaryMenuBar from "./components/SecondryMenuBar/SecondaryMenuBar";
import MyClassComponent from "./components/MyClassComponent";
import { useEffect, useReducer, useState } from "react";
import AddressCard from "./components/ListingAdresses/AddressCard";
import AddressList from "./components/ListingAdresses/AddressList";
import commonFunctions from "./components/commanFunctions";
import { useSelector, useDispatch } from "react-redux";
import { addressActions } from "./Stores/slices/adderesses-slice";
import commanFunctions from "./components/commanFunctions";
import { Redirect, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import { currentUserActions } from "./Stores/slices/current-user-slice";
import { Alert, Snackbar } from "@mui/material";
import { alertHandlerActions } from "./Stores/slices/alert-handler-slice";
import constants from "./util/constants";
var initialAddresses = [];

function App() {
  let user = JSON.parse(localStorage.getItem("currentUser"));

  const alertData = useSelector((state) => state.alertHandlerSlice);
  //const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const addresses = useSelector((state) => state.addresses.addresses);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    addressDispatch(alertHandlerActions.closeAlert());
  };
  const addressDispatch = useDispatch();

  let dummyAddress = {
    name: "milan",
    title: "title",
    body: "body",
  };
  let dummyAddressEdit = {
    name: "nalim",
    title: "title",
    body: "body",
    id: 5,
  };
  // const initAdresses =  async ()=>{
  //   let addresses = {
  //     addresses: []
  //   }
  //   await fetch('http://localhost:3000/addresses').then(res=>{return res.json()}).then(res=>{console.log('stateres = ',res); addresses.addresses = res});
  //   console.log('init address = ',addresses);
  //   return addresses;
  // }
  const addAdressHandler = (newAddress, sortType) => {
    console.log('newAddress-----',newAddress)
    let action = {
      type: "add",
      //value: {}
    };
    newAddress.uid = currentUser.id;
    let graphQlQuery = {
      query: `
      mutation {
           addAddress(addAddressData:{
             name: "${newAddress.name}",
             building_location: "${newAddress.building_location}",
             city: "${newAddress.city}",
             state: "${newAddress.state}",
             date: "${newAddress.date}"
           }){
            name 
            building_location 
            city 
            state 
            date 
            uid 
            _id
           }
          }
      `
    }
    fetch(constants.serverUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(graphQlQuery),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("response ", res);
        //lastArray.push(res)
        //return lastArray;
        let addedAddress = {...res.data.addAddress, id: res.data.addAddress._id};
        console.log("qction value", addedAddress);
        addressDispatch(addressActions.addAddress({ newAddress: addedAddress }));
        addressDispatch(
          alertHandlerActions.fireAlert({
            message: "Address Added Successfully..!!",
            severety: "success",
          })
        );
        // addressDispatch(action);
        if (sortType.length > 0) {
          let actionSort = { type: sortType };
          addressDispatch(addressActions.sortAddresses({ sortType: sortType }));
        }
        if (searchString.length > 0) {
          window.location.reload();
        }
      });
  };
  const editAddressHandler = (newAddress) => {
    // fetch(" http://localhost:3000/addresses/" + newAddress.id, {
    //   method: "PUT",
    //   body: JSON.stringify(newAddress),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })

    let graphQlQuery = {
      query: `
      mutation {
           editAddress(editAddressData: {
             address_id: "${newAddress.id}",
             newAddress: {
              name: "${newAddress.name}",
              building_location: "${newAddress.building_location}",
              city: "${newAddress.city}",
              state: "${newAddress.state}",
              date: "${newAddress.date}",
             }
           }){
             name,
             uid,
             city
           }
         }
      `
    }
    fetch(constants.serverUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(graphQlQuery),
    })
      .then((res) => {
        console.log("response = ", res);
        return res.json();
      })
      .then((res) => {
        console.log("next res = ", res);
        let action = {
          type: "edit",
          value: newAddress,
          // id: newAddress.id
        };
        addressDispatch(addressActions.editAddress({ newAddress: newAddress }));
        addressDispatch(
          alertHandlerActions.fireAlert({
            message: "Address Edited Successfully..!!",
            severety: "success",
          })
        );
      });
  };
  const deleteHandler = (id) => {
    console.log('id ------',id)
    let qraphQlQuery = {
      query: `
          mutation {
              deleteAdddress(deleteAddressData:{
                address_id: "${id}"
              }){
                statusCode,
                message
              }
            }
      `,
    };

    fetch(constants.serverUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(qraphQlQuery),
    })
      .then((res) => {
        console.log("response = ", res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        let action = {
          type: "remove",
          value: {
            id: id,
          },
        };
        addressDispatch(addressActions.removeAddress({ id: id }));
        addressDispatch(
          alertHandlerActions.fireAlert({
            message: "Address Deleted Successfully..!!",
            severety: "success",
          })
        );
      });
  };
  const [searchString, setSearchString] = useState("");
  // const [seachClicked,setSearchClicked] = useState(false);
  // const addressReducer = (prevState,action)=>{
  //   if(action.type=='initialize'){
  //     console.log(prevState)
  //     console.log('action value = ',action.value)
  //     return action.value;
  //   }
  //   if(action.type=='add'){
  //     let lastArray = [...prevState];
  //     console.log('prevState = ',prevState);
  //     console.log('action value',action.value);

  //     lastArray.push(action.value);
  //     console.log('la',lastArray);
  //     return lastArray;

  //   }
  //   if(action.type=='remove'){
  //     let lastArray = [...prevState];
  //     let index = lastArray.findIndex(item=>{
  //       return item.id == action.value.id;
  //     });
  //     lastArray.splice(index,1);

  //     return lastArray;
  //   }
  //   if(action.type=='edit'){
  //     let lastArray = [...prevState];
  //     let currentAddress = lastArray.find(item=>{
  //       return item.id == action.value.id;
  //     })
  //     let index = lastArray.findIndex(item=>{
  //       return item.id==action.value.id;
  //     })
  //     currentAddress = {...action.value};
  //     lastArray.splice(index,1,currentAddress);

  //     return lastArray;
  //   }
  //   if(action.type=='dl'){
  //     console.log('in action dl')
  //     let lastArray = [...prevState];
  //     lastArray.sort((a,b)=>{
  //       return b.date - a.date;
  //     })
  //     return lastArray;
  //   }
  //   if(action.type=='do'){
  //     let lastArray = [...prevState];
  //     lastArray.sort((a,b)=>{
  //       return a.date - b.date;
  //     })
  //     return lastArray;
  //   }
  //   if(action.type=='a-z'){
  //     let lastArray = [...prevState];

  //     lastArray.sort((a,b)=>{
  //       return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  //     })
  //     return lastArray;
  //   }
  //   if(action.type=='z-a'){
  //     let lastArray = [...prevState];

  //     lastArray.sort((a,b)=>{
  //       return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
  //     })
  //     return lastArray;
  //   }
  //   if(action.type=='search'){
  //     let keyWords = action.value.keyWords;
  //     console.log('initial = ',initialAddresses);
  //     let lastArray = initialAddresses;
  //     lastArray = lastArray.filter((item)=>{
  //       let itemKeys = item.name.split(' ');
  //       // let commonFunctions = JSON.parse(localStorage.getItem('commonFunctions'));
  //       itemKeys = commonFunctions.sanatizeWords(itemKeys);
  //       for(let i=0;i<keyWords.length;i++){
  //         if(itemKeys.includes(keyWords[i]))
  //           return item;
  //       }
  //     })
  //     return lastArray;
  //   }
  // }

  // let myAddresses = []
  useEffect(() => {
    const graphQlQuery = {
      query: `
      {
         getAddresses{
           addresses{
             name,
             building_location,
             _id
           }
         }
       }
      `,
    };

    if (localStorage.getItem("currentUser")) {
      // let user = JSON.parse(localStorage.getItem("currentUser"));
      addressDispatch(currentUserActions.setCurrentUser({ currentUser: user }));
      fetch(constants.serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(graphQlQuery),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log("res------", res);
          initialAddresses = res.data.getAddresses.addresses.map(item=>{
            let currId = item._id;
            delete item._id;
            return {
              ...item,
              id: currId
            }
          });
          addressDispatch(
            addressActions.initialize({ initialAddresses: initialAddresses })
          );
        });
    }
  }, []);

  //const [addresses,addressDispatch] = useReducer(addressReducer,[]);
  const searchAddressesHandler = (str) => {
    let keyWords = str.split(" ");
    keyWords = commanFunctions.sanatizeWords(keyWords);
    let searchedResult = [];
    keyWords.forEach((keyWord) => {
      searchedResult = addresses.filter((item) => {
        let addressKeyWords = item.name.split(" ");
        addressKeyWords = commanFunctions.sanatizeWords(addressKeyWords);
        return addressKeyWords.includes(keyWord);
      });
    });

    setSearchAddresses(searchedResult);
  };
  useEffect(() => {
    console.log("adresses = ", addresses);
    if (searchString.length > 0) {
      searchAddressesHandler(searchString);
    }
  }, [addresses]);
  const [searchAddresses, setSearchAddresses] = useState([]);

  return (
    <>
      <Navbar />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={alertData.alertOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity={alertData.severety}>{alertData.message}</Alert>
      </Snackbar>
      <Route path="/" exact>
        <Redirect to="/login"></Redirect>
      </Route>
      <Route path="/main">
        {currentUser.id != -1 && (
          <>
            <SecondaryMenuBar
              addresses={addresses}
              addAdressHandler={addAdressHandler}
              searchAddressesHandler={searchAddressesHandler}
              setSearchString={setSearchString}
              addressDispatch={addressDispatch}
            />

            <AddressList
              addresses={
                searchAddresses.length > 0 ? searchAddresses : addresses
              }
              editAddressHandler={editAddressHandler}
              deleteHandler={deleteHandler}
            />
          </>
        )}
      </Route>
      <Route path="/login">
        <Login></Login>
      </Route>
      <Route path="/signup">
        <Signup></Signup>
      </Route>
    </>
  );
}

export default App;
