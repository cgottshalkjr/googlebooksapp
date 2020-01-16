import React from "react";
import {Container, Col, Row } from "../Grid";
import "./booklist.css";
import { PromiseProvider } from "mongoose";


// This component exports both the List and ListItem components

export const BookList = ({children}) => (
    <ul className="list-group">
        {children}
    </ul>
);

export function BookListItem({
    thumbnail,
    title,
    description,
    handleSaveClick,
    author,
    href,
    bookId
}) {
    return (
        <div className="card shadow-lg m-2 bg-white rounded">
        <li className="list-group-item">
            <Container>
                <Row>
                    <Col size="xs-4 sm-2">
                        <img src={thumbnail} />
                    </Col>
                    <Col size="xs-8 sm-9">
                        <h3>{title}</h3>
                        <strong><span>Written by: {author}</span></strong>
                        <p>Description: {description}</p>
                        <a rel="noreferrer noopener" target="_blank" href={href}>
                          Checkout Book!
              </a>
              <button className="btn btn-primary saveBtn float-right" onClick={bookId, handleSaveClick}>Save</button>
                    </Col>
                </Row>
            </Container>
        </li>
        </div>
    );
}