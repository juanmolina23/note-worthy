import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Tag } from "./App";
import { useRef, useState } from "react";

type EditTagsModalProps = {
  show: boolean;
  availableTags: Tag[];
  handleClose: (tags: Tag[]) => void;
  onDelete: (id: string) => void;
};

export function EditTagsModal({
  availableTags,
  handleClose,
  show,
  onDelete,
}: EditTagsModalProps) {
  const tagLabel = useRef<HTMLInputElement>(null);
  const [updatedTags, setUpdatedTags] = useState<Tag[]>([]);

  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose([...updatedTags]);
        setUpdatedTags([]);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag._id}>
                <Col>
                  <Form.Control
                    type='text'
                    ref={tagLabel}
                    defaultValue={tag.label}
                    onChange={(e) => {
                      setUpdatedTags((prev) => {
                        if (prev.length === 0) {
                          return [{ _id: tag._id, label: e.target.value }];
                        } else {
                          return prev.map((t) => {
                            if (t._id === tag._id) {
                              return { ...t, label: e.target.value };
                            } else {
                              return { ...t };
                            }
                          });
                        }
                      });
                    }}
                  />
                </Col>
                <Col xs='auto'>
                  <Button
                    variant='outline-danger'
                    onClick={() => onDelete(tag._id)}
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
