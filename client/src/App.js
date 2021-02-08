import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import { Table } from 'rsuite';
import Create from './Components/Create';
import Edit from './Components/Edit';
import Remove from './Components/Remove';
import Details from './Components/Details';
import "./App.css";
const { Column, HeaderCell, Cell } = Table;


class FixedColumnTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleToUpdate = this.handleToUpdate.bind(this);
    this.state = { 
      data: [],
    };
  }
  handleToUpdate = (updateData) => {
    this.setState({ data: updateData });
  }
  callServer() {
   fetch('https://ix9cpuy78d.execute-api.us-east-2.amazonaws.com/Dev/index') // this is giving error enter the url of your application load balancer
        .then(res => res.json())
        .then(res =>  this.setState({ data: res }))
        .catch(err => err);
  }

  componentDidMount() {
    this.callServer();
    
  }
  
  render() {
    var handleToUpdate = this.handleToUpdate;
    return (
      <div>
        <Table
          height={800}
          data={this.state.data}
          affixHeader
          affixHorizontalScrollbar
          bordered
          cellBordered
        >
          <Column width={200} resizable>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="Name" />
          </Column>

          <Column width={200} resizable>
            <HeaderCell>Surname</HeaderCell>
            <Cell dataKey="Surname" />
          </Column>

          <Column width={300} resizable>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="Email" />
          </Column>

          <Column width={200} resizable>
            <HeaderCell>Telephone</HeaderCell>
            <Cell dataKey="Telephone" />
          
          </Column>
          <Column width={200}>
            <HeaderCell>Action</HeaderCell>
            <Cell>
              {rowData => {
                return (
                  <span>
                    <Details details={rowData}/>
                    <Edit details={rowData} handleToUpdate = {handleToUpdate.bind(this)} data={this.state.data}/>
                    <Remove details={rowData} handleToUpdate = {handleToUpdate.bind(this)} data={this.state.data}/>
                  </span>
                );
              }}
            </Cell>
          </Column> 
          <Column>
              <HeaderCell> 
                <Create handleToUpdate = {handleToUpdate.bind(this)} data={this.state.data}/>
              </HeaderCell>
              <Cell/>
          </Column>
        </Table>
      </div>
    );
  }
}
export default FixedColumnTable; 
