import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Modal, Button } from 'rsuite';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

class Create extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        answer: '', 
        formValue: {
          name: '',
          surname: '',
          email: '',
          telephone: '',
          address: ''
        },
        show: false
      };
      this.close = this.close.bind(this);
      this.open = this.open.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.updateData = this.updateData.bind(this);
    }
    close() {
      this.setState({ show: false });
    }
    open() {
      this.setState({ show: true });
    }
    handleChange(value) {
      this.setState({
        formValue: value
      });
    }
    
    updateData() { 
      var handleToUpdate = this.props.handleToUpdate;
      this.props.data.push({
        "Name" : this.state.formValue.name,
        "Surname" : this.state.formValue.surname,
        "Email" : this.state.formValue.email,
        "Telephone" : this.state.formValue.telephone,
        "Address" : this.state.formValue.address
      });  
      handleToUpdate(this.props.data);
    }
    
    resetForm() {
      this.setState({
        formValue: {
          name: '',
          surname: '',
          email: '',
          telephone: '',
          address: ''
        }
      });
    }

    handleSubmit = (event) => {
      fetch('https://ix9cpuy78d.execute-api.us-east-2.amazonaws.com/Dev/index', {  // enter the url of your application load balancer inside of ''
          method: 'POST',
          // We convert the React state to JSON and send it as the POST body
          body: JSON.stringify(this.state.formValue),
          headers: {
            "Content-Type": "application/json"
        }
        }).then(res => this.close())
          .then(res => this.updateData())
          .then(res => this.resetForm());
        
        event.preventDefault();  
    }
    render() {
      return (
        <React.Fragment>
          <Modal show={this.state.show} onHide={this.close} size="md">
            <Modal.Header>
              <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                fluid
                onChange={this.handleChange}
                formValue={this.state.formValue}
              >
                <FormGroup>
                  <ControlLabel>Name</ControlLabel>
                  <FormControl name="name" />
                  <HelpBlock>Required</HelpBlock>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Surname</ControlLabel>
                  <FormControl name="surname"/>
                  <HelpBlock>Required</HelpBlock>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Email</ControlLabel>
                  <FormControl name="email" type="email"/>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Telephone</ControlLabel>
                  <FormControl name="telephone" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Address</ControlLabel>
                  <FormControl name="address" />
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleSubmit} name="yes" appearance="primary" color="green">
                Submit
              </Button>
              <Button onClick={this.close} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
          <PersonAddIcon className="hvr-grow" onClick={this.open} />
        </React.Fragment>
      );
    }
  }
  
  export default Create;