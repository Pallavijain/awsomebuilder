import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Modal, Button } from 'rsuite';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import '../App.css';
class Edit extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: this.props.data,
        formValue: { 
          name: this.props.details.Name,
          surname: this.props.details.Surname,
          address: this.props.details.Address,
          email: this.props.details.Email,
          telephone: this.props.details.Telephone
        },
        show: false,
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
      this.setState({
        formValue: {
          name: this.props.details.Name,
          surname: this.props.details.Surname,
          email: this.props.details.Email,
          telephone: this.props.details.Telephone,
          address: this.props.details.Address
        }
      });
    }

    handleChange(value) {
      this.setState({
        formValue: value
      });
    }
    
    updateData() { 
      var handleToUpdate = this.props.handleToUpdate;
      for( var i =0; i < this.props.data.length; i++) { 
        if( this.props.data[i].Email === this.state.formValue.email) { 
          this.props.data[i].Name = this.state.formValue.name;
          this.props.data[i].Surname = this.state.formValue.surname;
          this.props.data[i].Address = this.state.formValue.address;
          this.props.data[i].Email = this.state.formValue.email;
          this.props.data[i].Telephone = this.state.formValue.telephone; 
          
        }
      }
      handleToUpdate(this.props.data);    
    }

    handleSubmit = (event) => {
      fetch('https://ix9cpuy78d.execute-api.us-east-2.amazonaws.com/Dev/index', { // enter the url of your application load balancer inside of ''
          method: 'PUT',
          // We convert the React state to JSON and send it as the POST body
          body: JSON.stringify(this.state.formValue),
          headers: {"Content-Type": "application/json"}
        }).then(res => this.close())
          .then(res => this.updateData());
        event.preventDefault();  
    }
    
    render() {
      const disabled = true;
      return (
        <React.Fragment>
          <Modal show={this.state.show} onHide={this.close} size="md">
            <Modal.Header>
              <Modal.Title>Edit</Modal.Title>
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
              <Button onClick= {this.handleSubmit} appearance="primary" color="green">
                Submit
              </Button>
              <Button onClick={this.close} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
          <EditOutlinedIcon className="hvr-grow" onClick={this.open}/>
        </React.Fragment>
      );
    }
  }
export default Edit;