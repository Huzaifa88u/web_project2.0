import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Card from "react-bootstrap/Card";
import Avatar from 'react-avatar';

class FriendsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render(props) {
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Friend Requests</ModalHeader>
          <ModalBody>
            <Card style={{ width: '28rem' }}>
              <Card.Body>
                <div className="row">
                  <div className="col-4 mr-5">
                  <Avatar 
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 24, height: 24 }}
                  />
                  </div>
                  <div className="col-6 ml-5 pl-4" >
                    <Card.Title>Huzaifa Shahzad</Card.Title>
                    
                  <Card.Subtitle className="mb-2 text-muted">huzaifa88u@gmail.com</Card.Subtitle>
                  </div>
                  
                </div>
              </Card.Body>
            </Card>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default FriendsView;