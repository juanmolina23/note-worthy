import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "./App";
import { useMemo, useState } from "react";
import { EditTagsModal } from "./EditTagsModal";
import { NoteCard } from "./NoteCard";

type NoteListProp = {
  availableTags: Tag[];
  notes: Note[];
  onDelete: (id: string) => void;
  onUpdate: (tag: Tag) => void;
};

export function NoteList({
  availableTags,
  notes,
  onDelete,
  onUpdate,
}: NoteListProp) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  function handleModalClose(tags: Tag[]) {
    tags.forEach((t) => {
      onUpdate(t);
    });
    setEditTagsModalIsOpen(false);
  }

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      if (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) => {
            return note.tags.some((noteTag) => noteTag._id === tag._id);
          }))
      ) {
        return note;
      }
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <Row className='align-items-center mb-4'>
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs='auto'>
          <Stack gap={2} direction='horizontal'>
            <Link to='/new'>
              <Button variant='primary'>Create</Button>
            </Link>
            <Button
              variant='outline-secondary'
              onClick={() => setEditTagsModalIsOpen(true)}
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Row className='mb-4'>
              <Col>
                <Form.Group controlId='title'>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type='text'
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      console.log(filteredNotes);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='tags'>
                  <Form.Label>Tags</Form.Label>
                  <ReactSelect
                    options={availableTags.map((tag) => {
                      return { label: tag.label, value: tag._id };
                    })}
                    value={selectedTags.map((tag) => {
                      return { label: tag.label, value: tag._id };
                    })}
                    onChange={(tags) => {
                      setSelectedTags(
                        tags.map((tag) => {
                          return { label: tag.label, _id: tag.value };
                        })
                      );
                    }}
                    isMulti
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row xs={1} sm={2} lg={3} xl={4} className='g-3'>
        {filteredNotes.map((note) => (
          <Col key={note._id}>
            <NoteCard note={note} />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        availableTags={availableTags}
        show={editTagsModalIsOpen}
        handleClose={handleModalClose}
        onDelete={onDelete}
      />
    </>
  );
}
