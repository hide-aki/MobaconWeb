import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Label,
  Input,
  Row,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormFeedback,
  Media
} from "reactstrap";

import { imageRequest } from "../Configs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import Select from "react-select";
import ReactTooltip from "react-tooltip";
import $ from "jquery";
import FormData from "form-data";
import { invalid } from "moment";
import PropTypes from "prop-types";
import { user } from "../stores/actions";

class Register extends React.Component {
  static propTypes = {
    onComplete: PropTypes.func
  };

  state = {
    dropdownOpen: false,
    name: "",
    email: "",
    phoneNumber: "",
    selectedOption: null,
    selectedFile: "",
    value: "Please Select",
    valid: {
      value: false,
      name: false,
      email: false
    },
    invalid: {
      value: false,
      name: false,
      email: false
    },
    imagePath: null,
    imageFile: null,
    operators: []
  };

  componentDidMount() {
    this.setImage(this.props.imagePath);
  }

  componentDidUpdate(prevProps) {
    if (this.props.imagePath !== prevProps.imagePath) {
      this.setImage(this.props.imagePath);
    }
  }

  setImage = async imagePath => {
    const photo = await imageRequest(imagePath);
    this.setState({
      imagePath: photo
    });
  };

  handleName = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  handlePassword = e => {
    this.setState({
      password: e.target.value
    });
  };
  phoneNumberHandleChange = e => {
    this.setState({
      phoneNumber: e.target.value
    });
  };
  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
  nameChangeRoleId = event => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      value: event.target.innerText
    });
  };
  onFileChange = async e => {
    const file = e.target.files[0];
    if (!file || !file.type.match(/.(jpe?g|png)$/))
      return alert("Support jpeg, jpg, png only");
    const reader = new FileReader();
    reader.onload = e => {
      this.setState({ imagePath: e.target.result, isImageEdit: true });
    };
    await this.setState({ imageFile: file });
    reader.readAsDataURL(file);
  };

  render() {
    const { imagePath } = this.state;
    const {role} = this.props;
    const divStyle = {
      display: "none"
    };
    const cursor = {
      cursor: "pointer",
      position: "relative",
      top: "2px"
    };

    return (
      <Card className="mx-4 RegisterPage">
        <CardBody className="p-4">
          <h1 className="text-center color-main">Signup</h1>
          <p className="text-center color-main">Create your account</p>
          {/* {imagePath && (
                  <Media href="">
                    <Media className="imagePhoto" object src={imagePath} />
                  </Media>
                )} */}
          <Media href="" className="imageWrapper">
            <Media className="imagePhoto" object src={imagePath} />
            <Media className="imagePhotoOpacity" object src={imagePath} />
          </Media>

          <form className="md-form">
            <span className="alignImage">
              Image size 500x500 (1:1 ratio) recommanded
            </span>
            <div className="file-field">
              <div className="btn btn-sm fileInput">
                <Input
                  type="file"
                  accept="image/*"
                  name="file"
                  id="file"
                  style={divStyle}
                  onChange={this.onFileChange}
                />
                <Label for="file" style={cursor}>
                  Choose a file
                </Label>
              </div>
              <span className="imageName">{this.state.imageName}</span>
            </div>
          </form>
          <br />

          <FormGroup>
            <Label htmlFor="RoleId">RoleId</Label>
            <div>
              <ButtonDropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
              >
                <DropdownToggle
                  caret
                  size="lg"
                  className="RoleId"
                  id="dropdown"
                >
                  {this.state.value}
                  <FontAwesomeIcon icon="angle-down" className="angleDown" />
                </DropdownToggle>
                <DropdownMenu className="roleIdChoice">
                  {role.id === 1 && 
                    <DropdownItem onClick={this.nameChangeRoleId} value="1">
                      ADMINISTRATOR
                    </DropdownItem>}
                  <DropdownItem onClick={this.nameChangeRoleId} value="2">
                    OPERATOR
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </div>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              type="text"
              id="fullName"
              onChange={this.handleName}
              placeholder="Mihai Petrea"
              valid={this.state.valid.name}
              invalid={this.state.invalid.name}
              required
            />
            <FormFeedback valid={this.state.valid.name} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              onChange={this.handleEmail}
              placeholder="user@domain.com"
              valid={this.state.valid.email}
              invalid={this.state.invalid.email}
              required
              className="form-control"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              type="phoneNumber"
              id="phoneNumber"
              onChange={this.phoneNumberHandleChange}
              placeholder="0832345476"
            />
          </FormGroup>
          <Row className="justify-content-center">
            <Col md="auto">
              <Button
                color="primary"
                onClick={this.clickValidate}
                className="px-4"
              >
                SIGNUP
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
  signup = async () => {
    let roleId = this.state.value == "ADMINISTRATOR" ? 1 : 2;
    const formData = new FormData();
    formData.append("roleId", `${roleId}`);
    formData.append("fullName", this.state.name);
    formData.append("email", this.state.email);
    formData.append("phoneNumber", this.state.phoneNumber);
    formData.append("image", this.state.imageFile, this.state.imageFile.name);
    this.props.register(formData, () => {
      const { onCompleted } = this.props;
      if (onCompleted) {
        console.log("refresh operators")
        onCompleted();
      }
    });
  };
  clickValidate = () => {
    let isError = false;
    let valid = {
      value: true,
      email: true,
      name: true
    };
    let invalid = {
      value: false,
      email: false,
      name: false
    };
    const errors = {
      fulNameError: "",
      emailError: "",
      passwordError: "",
      valueError: ""
    };
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (this.state.value == "Please Select") {
      invalid.value = true;
      valid.value = false;
    }

    if (!emailRegex.test(this.state.email)) {
      invalid.email = true;
      valid.email = false;
    }
    if (this.state.name == "") {
      invalid.name = true;
      valid.name = false;
    }

    if (
      this.state.value !== "Please Select" &&
      emailRegex.test(this.state.email) &&
      this.state.name !== ""
    ) {
      isError = true;
      this.props.closeModal();
      this.signup();
    } else {
      isError = false;
    }

    this.setState({
      ...this.state,
      ...errors,
      valid: valid,
      invalid: invalid
    });
    return isError;
  };
}

const mapStateToProps = state => {
  return {
    imagePath: state.user.user_detail.imagePath,
    role: state.user.user_detail.role,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: user.register
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
