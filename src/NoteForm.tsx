import { FormEvent, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, TagData, Tag } from "./App";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: TagData) => Promise<Tag>;
  availableTags: Tag[];
} & Partial<NoteData>;

export default function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) {
  const [noteTitle, setNoteTitle] = useState<string>(title);
  const [noteMarkdown, setNoteMarkdown] = useState<string>(markdown);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: noteTitle,
      markdown: noteMarkdown,
      tags: selectedTags,
    });

    navigate("..");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                defaultValue={title}
                onChange={(e) => setNoteTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='tags'>
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag._id };
                })}
                onCreateOption={async (label) => {
                  const res: Tag = await onAddTag({ label });
                  setSelectedTags((prev) => {
                    if (prev.length === 0) {
                      return [res];
                    } else {
                      return [...prev, res];
                    }
                  });
                }}
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
        <Row>
          <Col>
            <Form.Group controlId='markdown'>
              <Form.Label>Body</Form.Label>
              <Form.Control
                defaultValue={markdown}
                onChange={(e) => setNoteMarkdown(e.target.value)}
                required
                as='textarea'
                rows={15}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Stack
              direction='horizontal'
              gap={2}
              className='justify-content-end'
            >
              <Button type='submit' variant='primary'>
                Save
              </Button>
              <Link to='..'>
                <Button type='button' variant='outline-secondary'>
                  Cancel
                </Button>
              </Link>
            </Stack>
          </Col>
        </Row>
      </Stack>
    </Form>
  );
}
