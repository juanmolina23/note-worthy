import { Card, Stack, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Note } from "./App";

type NoteCardProps = {
  note: Note;
};

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Card
      as={Link}
      to={`/${note._id}`}
      className={`h-100 text-reset text-decoration-none custom-card`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className='align-items-center justify-content-center h-100'
        >
          <span className='fs-5'>{note.title}</span>
          {note.tags.length > 0 && (
            <Stack
              gap={1}
              direction='horizontal'
              className='justify-content-center flex-wrap'
            >
              {note.tags.map((tag) => (
                <Badge key={tag._id} className='text-truncate'>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}
