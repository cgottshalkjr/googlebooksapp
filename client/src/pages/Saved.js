import React, { Component } from "react";
import NavBar from "../components/NavBar";
import Jumbotron from "../components/Jumbotron";
import Input from "../components/Input";
import Button from "../components/Button";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { SavedBookList, BookListItem } from "../components/SavedBookList";

class Saved extends Component {
  state = {
    savedBooks: []
  };

  componentDidMount() {
    this.loadSavedBooks();
  }

  loadSavedBooks = () => {
    API.getSavedBooks().then(res => this.setState({ savedBooks: res.data }));
  };

  handleDeleteClick = (event, id) => {
    event.preventDefault();
    API.deleteBook(id)
    .then(res => this.loadSavedBooks())
    .catch(err => console.log(err));
  }

  render() {
    return (
      <Container>
        <NavBar />
        <Row>
          <Col size="xs-12">
            {!this.state.savedBooks.length ? (
              <h2>No Books to Display</h2>
            ) : (
              <SavedBookList>
                {this.state.savedBooks.map(item => {
                  return (
                    <BookListItem
                      key={item.id}
                      id={item._id}
                      title={item.title}
                      author={item.authors || ["Unavailable Information"]}
                      href={item.previewLink}
                      description={
                        item.description || "Unavailable Information"
                      }
                      thumbnail={item.thumbnail}
                      clickEvent={this.handleDeleteClick}
                    />
                  );
                })}
              </SavedBookList>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;
