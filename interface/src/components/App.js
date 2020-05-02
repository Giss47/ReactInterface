import React, { Component } from 'react';
import '../css/App.css';

import AddAppointments from './AddApointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';

import  { without }  from 'lodash';

class  App extends Component {

  constructor() {
    super();
    this.state = {
      myAppointments: [],
      lastIndex: 0,
      formDispaly : true
    };
    this.deletAppointment = this.deletAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm(){
    this.setState({
      formDispaly: !this.state.formDispaly
    });
  }

  deletAppointment(apt){
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, apt);
    this.setState({myAppointments: tempApts})
  }
  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(resutl => {
        const apts = resutl.map(item => {
          item.aptId = this.state.lastIndex;
          this.setState({lastIndex: this.state.lastIndex + 1})
          return item;
        });

        this.setState({
          myAppointments: apts
        });

      });
  }

  render() {
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments
                  formDispaly={this.state.formDispaly}
                  toggleForm={this.toggleForm}
                 />
                <SearchAppointments/>
                <ListAppointments 
                  appointments={this.state.myAppointments}
                  deletAppointment={this.deletAppointment}/>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
    }
  }
  
  export default App;