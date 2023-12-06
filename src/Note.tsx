import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./NoteLayout";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

type NoteProp = {
  onDelete: (id: string) => void;
};

export function Note({ onDelete }: NoteProp) {
  const note = useNote();
  const navigate = useNavigate();

  function handleDelete() {
    onDelete(note._id);
    navigate("..");
  }

  return (
    <>
      <Row className='align-items-center mb-4'>
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction='horizontal' className='flex-wrap'>
              {note.tags.map((tag) => (
                <Badge key={tag._id} className='text-truncate'>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs='auto'>
          <Stack gap={2} direction='horizontal'>
            <Link to={`/${note._id}/edit`}>
              <Button variant='primary'>Edit</Button>
            </Link>
            <Button variant='outline-danger' onClick={handleDelete}>
              Delete
            </Button>
            <Link to='..'>
              <Button variant='outline-secondary'>Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <Row>
        <Col>
          <ReactMarkdown>{note.markdown}</ReactMarkdown>
        </Col>
      </Row>
    </>
  );
}
