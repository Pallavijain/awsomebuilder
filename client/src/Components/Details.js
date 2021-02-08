import React from 'react';
import { Drawer, Button, Divider } from 'rsuite';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import '../App.css';
class Details extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        show: false
      };
      this.close = this.close.bind(this);
      this.toggleDrawer = this.toggleDrawer.bind(this);
    }
    close() {
      this.setState({
        show: false
      });
    }
    toggleDrawer() {
      this.setState({ show: true });
    }
    render() {
      return (
        <React.Fragment>
          <MoreHorizOutlinedIcon className='hvr-grow' onClick={this.toggleDrawer} />
          <Drawer
            show={this.state.show}
            onHide={this.close}
          >
            <Drawer.Header>
              <Drawer.Title>Description</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <p><b>Name:</b> {this.props.details.Name}</p>
              <Divider className="divider-margin"/>
              <p><b>Surname:</b> {this.props.details.Surname}</p>
              <Divider className="divider-margin"/>
              <p><b>Email:</b> {this.props.details.Email}</p>
              <Divider className="divider-margin"/>
              <p><b>Telephone:</b> {this.props.details.Telephone}</p>
              <Divider className="divider-margin"/>
              <p><b>Address:</b> {this.props.details.Address}</p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button onClick={this.close} appearance="primary" color="green">OK</Button>
            </Drawer.Footer>
          </Drawer>
        </React.Fragment>
      );
    }
  
  }
  
export default Details;