import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';

class CommentArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            rate: '',
        };
    }

    handleCommentSubmit = async () => {
        try {
            const { comment, rate } = this.state;
            const { elementId } = this.props;

            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg0NGQwNWI1MjViYjAwMThlZDA4MjciLCJpYXQiOjE3MDMxNjkyODUsImV4cCI6MTcwNDM3ODg4NX0.1lGRk9VREZVA0TnOVZqZj9pS7q3QyhRgAfNTp48ojyo';
            const apiUrl = `https://striveschool-api.herokuapp.com/api/books/${elementId}/comments`;

            const newComment = {
                comment: comment,
                rate: rate,
                elementId: elementId,
            };

            const response = await axios.post(apiUrl, newComment, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Commento inviato con successo:', response.data);
        } catch (error) {
            console.error('Errore durante l\'invio del commento:', error.response?.data || error.message);
        }
    };

    render() {
        const { comment, rate } = this.state;

        return (
            <Card>
                <Card.Body>
                    <Card.Text>
                        <Form.Group controlId="commentForm">
                            <Form.Label>Aggiungi un commento</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Inserisci il tuo commento"
                                value={comment}
                                onChange={(e) => this.setState({ comment: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="rateForm">
                            <Form.Label>Valuta (da 1 a 5)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Inserisci la tua valutazione"
                                value={rate}
                                onChange={(e) => this.setState({ rate: e.target.value })}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={this.handleCommentSubmit}>
                            Invia Commento
                        </Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default CommentArea;