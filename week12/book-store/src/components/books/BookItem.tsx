import styled from "styled-components";
import type { Book } from "../../models/book.model";

interface BookItemProps {
    book: Book;
}

function BookItem({ book }: BookItemProps) {
    return (
        <BookItemStyle>
            <h1>BookItem</h1>
        </BookItemStyle>
    );
}

const BookItemStyle = styled.div``;

export default BookItem;
