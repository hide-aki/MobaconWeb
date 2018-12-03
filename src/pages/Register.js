// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
// import { Button, Card, CardBody, CardGroup, Col, Container, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Row, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import mobaconApi from '../Action';
// import Select from 'react-select';
// import ReactTooltip from 'react-tooltip';
// import $ from 'jquery';
// import FormData from 'form-data';
// function Register(props) {
  
//   state = {
//     dropdownOpen: false,
//     name: '',
//     email: '',
//     phoneNumber: '',
//     selectedOption: null,
//     selectedFile: '',
//     value: "Please Select",
  
//   };

 
  

//   handleName = (e) => {
//       this.setState({
//           name: e.target.value
//       });
//   }

//   handleEmail = (e) => {
//       this.setState({
//           email: e.target.value
//       });

//   }

//   handlePassword = (e) => {
//       this.setState({
//           password: e.target.value
//       });
//   }
//   phoneNumberHandleChange = (e) => {
//     this.setState({
//         phoneNumber: e.target.value
//     })
//   }
//   fileChangedHandler = (event) => {
//     this.setState({selectedFile: event.target.files[0]})
//   }
//   toggle = () =>{
//     this.setState({
//       dropdownOpen: !this.state.dropdownOpen
//     });
//   }
//   nameChangeRoleId = (event) => {
//     this.setState({
//       dropdownOpen : !this.state.dropdownOpen,
//       value : event.target.innerText
//     });
    
//   }
  
//   // render() {
//     return (
//       <div className="app flex-row align-items-center">
//         <Container>
//           <Row className="justify-content-center">
//             <Col md="6" className="Register">
//               <Card className="mx-4 RegisterPage">
//                 <CardBody className="p-4">
//                   <h1 className='text-center color-main'>Signup</h1>
//                   <p className="text-center color-main">Create your account</p>
//                   <FormGroup>
//                     <Label htmlFor="RoleId">RoleId</Label>
//                     <div>
//                       <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
//                       <DropdownToggle caret size="lg" className="RoleId" id="dropdown">
//                      {this.state.value} <FontAwesomeIcon icon="angle-down" className="angleDown"/>
//                       </DropdownToggle>
//                       <DropdownMenu className="roleIdChoice">
//                         <DropdownItem onClick={this.nameChangeRoleId} value="1">ADMINISTRATOR</DropdownItem>
//                         <DropdownItem onClick={this.nameChangeRoleId} value="2">OPERATOR</DropdownItem>
//                       </DropdownMenu>
//                     </ButtonDropdown>
//                     </div>
//                     <a data-tip="Carrier can't be null"><FontAwesomeIcon icon="info-circle" className="circle RoleIdTooltip" tool-tip-toggle="tooltip-demo"/></a>
//                     <ReactTooltip />
//                   </FormGroup>
//                   <FormGroup id="1">
//                     <Label htmlFor="fullName">Full Name</Label>
//                     <Input type="text" id="fullName" onChange={ this.handleName} placeholder="Mihai Petrea" required />
//                   </FormGroup>
//                   <FormGroup>
//                     <Label htmlFor="email">Email</Label>
//                     <Input type="email" id="email" onChange={ this.handleEmail } placeholder="user@domain.com" required />
//                   </FormGroup>
//                   <FormGroup>
//                     <Label htmlFor="phoneNumber">Phone Number</Label>
//                     <Input type="phoneNumber" id="phoneNumber" onChange={this.phoneNumberHandleChange} placeholder="0832345476" />
//                   </FormGroup>
//                   <FormGroup>
//                     <Input type="file" onChange={this.fileChangedHandler} id="image" />
//                     <ReactTooltip />
//                   </FormGroup>
//                   <br/>
//                   <Row className="justify-content-center">
//                     <Col md='auto'>
//                         <Button color="primary" onClick={this.clickValidate} className="px-4">SIGNUP</Button>
//                     </Col>
//                   </Row>
//                 </CardBody>
//               </Card>
             
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     );
// //   }
//   signup = async () => {
//     let roleId = this.state.value == 'ADMINISTRATOR' ? 1:2;
//     const formData = new FormData();
//     formData.append('roleId',`${roleId}`);
//     formData.append('fullName', this.state.name);
//     formData.append('email', this.state.email);
//     // if(this.)
//     formData.append('phoneNumber', this.state.phoneNumber);
//     console.log(typeof(this.state.selectedFile));
//     if(this.state.selectedFile !== ""){
//       console.log("x");
//       formData.append('image', this.state.selectedFile, this.state.selectedFile.name);
//     }
//     console.log(formData);
//     for (let key of formData.values()) {
//       console.log(key);
//     }
//     let result = await mobaconApi.signUp(formData);
//     if ( result.message === "created" ) {
//         this.props.history.push('/');
//     } else {
//       console.log(result);
//     }
//  }
//   clickValidate = () => {
//     let isError = false
//     const errors = {
//       fulNameError: "",
//       emailError: "",
//       passwordError: "",
//       valueError: ""
//     }
//     var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     if(this.state.value !== "Please Select" && emailRegex.test(this.state.email) && this.state.fullName !== ""){
//       isError = true;
//       this.signup();
//     }else {
//       isError = false;
//     }
//     this.setState({
//       ...this.state,
//       ...errors
//     });
//     return isError;
//   };
// }

// export default Register;

