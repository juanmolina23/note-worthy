import { Container } from "react-bootstrap";
import NoteForm from "./NoteForm";
import { Note, Tag, TagData } from "./App";
import { useNote } from "./NoteLayout";

type EditNoteProps = {
  onSubmit: (note: Note) => void;
  onAddTag: (tag: TagData) => Promise<Tag>;
  availableTags: Tag[];
};

function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps) {
  const note = useNote();
  return (
    <Container className='my-4'>
      <h1>Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit({ _id: note._id, ...data })}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </Container>
  );
}

export default EditNote;
