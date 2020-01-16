import axios from "axios";

export default {
//getBooks method retrieves books/accepts a query to search the google api
  getBooks: function (query) {
    return axios.get("/api/books", { params: { q: query } });
  },
  
// Gets all books that are saved in db.
  getSavedBooks: function() {
    return axios.get("/api/saved" );
  },
  // Deletes books matched with an id
  deleteBook: function(id) {
    return axios.delete("/api/saved/" + id);
  },

   // Saves book to db
  saveBook: function(book) {
    return axios.post("/api/saved/", book);
  }
};

