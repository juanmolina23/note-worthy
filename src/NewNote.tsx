import { Container } from "react-bootstrap";
import NoteForm from "./NoteForm";
import { NoteData, Tag, TagData } from "./App";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: TagData) => Promise<Tag>;
  availableTags: Tag[];
};

function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
  return (
    <Container className='my-4'>
      <h1>New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </Container>
  );
}

export default NewNote;
