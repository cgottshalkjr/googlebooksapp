import React, { Component } from "react";
import NavBar from "../components/NavBar";
import Jumbotron from "../components/Jumbotron";
import Input from "../components/Input";
import Button from "../components/Button";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { BookList, BookListItem } from "../components/BookList";

class Home extends Component {
  state = {
    books: [],
    bookSearch: "",
    saved: []
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.getBooks(this.state.bookSearch)
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  };

    handleSaveClick = id => {
      this.state.books.map(item => {
        if (item.id === id) {
          let book = {
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            link: item.volumeInfo.previewLink,
            image: item.volumeInfo.imageLinks.thumbnail,
            description: item.volumeInfo.description
          };
          console.log(book);
          API.saveBook(book)
          .catch(err => console.log(err));
        }
      });
    };

  // handleSaveClick = id => {
  //   const item = this.state.books.find(item => item.id === id);

  //   API.saveBook({
  //     bookId: item.id,
  //     title: item.volumeInfo.title,
  //     authors: item.volumeInfo.authors,
  //     link: item.volumeInfo.previewLink,
  //     image: item.volumeInfo.imageLinks.thumbnail,
  //     description: item.volumeInfo.description
  //   }).then(() => this.getBooks());
  // };

  render() {
    return (
      <div>
        <NavBar />
        <Jumbotron />
        <Container>
          <Row>
            <Col size="md-12">
              <form>
                <Container>
                  <Row>
                    <Col size="xs-9 sm-10">
                      <Input
                        name="bookSearch"
                        value={this.state.bookSearch}
                        onChange={this.handleInputChange}
                        placeholder="Search For a Book"
                      />
                    </Col>
                    <Col size="xs-3 sm-2">
                      <Button
                        onClick={this.handleFormSubmit}
                        type="success"
                        className="input-lg"
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </form>
            </Col>
          </Row>
          <Row>
            <Col size="xs-12">
              {!this.state.books.length ? (
                <h2>No Books to Display</h2>
              ) : (
                <BookList>
                  {this.state.books.map(item => {
                    return (
                      <BookListItem
                        key={item.id}
                        id={item.id}
                        handleSaveClick={() => this.handleSaveClick(item.id)}
                        title={item.volumeInfo.title}
                        author={
                          item.volumeInfo.authors || ["Unavailable Information"]
                        }
                        href={item.volumeInfo.previewLink}
                        description={
                          item.volumeInfo.description ||
                          "Unavailable Information"
                        }
                        thumbnail={
                          item.volumeInfo.imageLinks
                            ? item.volumeInfo.imageLinks.thumbnail
                            : "https://visualhunt.com/photos/2/eyeglasses-on-open-book.jpg?s=s"
                        }
                      />
                    );
                  })}
                </BookList>
              )}
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Home;
