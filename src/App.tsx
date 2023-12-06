import { Container } from "react-bootstrap";
import { Route, Routes, Navigate } from "react-router-dom";
import NewNote from "./NewNote";
import { useEffect, useState } from "react";
import { NoteList } from "./NoteList";
import { NoteLayout } from "./NoteLayout";
import { Note } from "./Note";
import EditNote from "./EditNote";

export class APICall {
  public static async get(url: string) {
    const response = await fetch(url);
    return await response;
  }

  public static async post(url: string, data: string) {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    let params: RequestInit = {
      headers: requestHeaders,
      method: "POST",
      body: data,
    };
    const response = await fetch(url, params);
    return await response;
  }

  public static async put(url: string, data: string) {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    let params: RequestInit = {
      headers: requestHeaders,
      method: "PUT",
      body: data,
    };
    const response = await fetch(url, params);
    return await response;
  }

  public static async delete(url: string) {
    let params: RequestInit = {
      method: "DELETE",
    };
    const response = await fetch(url, params);
    return await response;
  }
}

export type Note = {
  _id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  _id: string;
} & TagData;

export type TagData = {
  label: string;
};

function App() {
  const [notesDB, setNotesDB] = useState<Note[]>([]);
  const [tagsDB, setTagsDB] = useState<Tag[]>([]);

  async function getAllNotes() {
    const response: Response = await APICall.get("http://localhost:3000/notes");
    const data: Note[] = await response.json();
    setNotesDB([...data]);
  }

  async function getAllTags() {
    const response: Response = await APICall.get("http://localhost:3000/tags");
    const data: Tag[] = await response.json();
    setTagsDB([...data]);
  }

  async function addNote(note: NoteData) {
    console.log(note);
    const response: Response = await APICall.post(
      "http://localhost:3000/notes/add",
      JSON.stringify(note)
    );
    const data: Note = await response.json();
    setNotesDB((prev) => {
      return [...prev, { ...data }];
    });
  }

  async function addTag(tag: TagData) {
    const response: Response = await APICall.post(
      "http://localhost:3000/tags/add",
      JSON.stringify(tag)
    );
    const data: Tag = await response.json();
    setTagsDB((prev) => {
      return [...prev, { ...data }];
    });
    return data;
  }

  async function updateTag(tag: Tag) {
    const response: Response = await APICall.put(
      `http://localhost:3000/tags/${tag._id}`,
      JSON.stringify(tag)
    );
    const data: Tag = await response.json();
    console.log(data);

    setTagsDB((prev) => {
      return prev.map((t) => {
        if (t._id === tag._id) {
          return { ...t, label: tag.label };
        } else {
          return t;
        }
      });
    });

    setNotesDB((prev) => {
      return prev.map((n) => {
        return {
          ...n,
          tags: n.tags.map((t) => {
            if (t._id === tag._id) {
              return { ...t, label: tag.label };
            } else {
              return t;
            }
          }),
        };
      });
    });
  }

  async function updateNote(note: Note) {
    const response: Response = await APICall.put(
      `http://localhost:3000/notes/${note._id}`,
      JSON.stringify(note)
    );
    const data: Tag = await response.json();
    console.log(data);

    setNotesDB((prev) => {
      return prev.map((n) => {
        if (n._id === note._id) {
          return {
            ...n,
            title: note.title,
            markdown: note.markdown,
            tags: note.tags,
          };
        } else {
          return n;
        }
      });
    });
  }

  async function deleteTag(id: string) {
    const response: Response = await APICall.delete(
      `http://localhost:3000/tags/${id}`
    );
    const data: Tag = await response.json();
    console.log(data);

    setTagsDB((prev) => {
      return prev.filter((t) => t._id !== id);
    });
  }

  async function deleteNote(id: string) {
    const response: Response = await APICall.delete(
      `http://localhost:3000/notes/${id}`
    );
    const data: Tag = await response.json();
    console.log(data);
    setNotesDB((prev) => {
      return prev.filter((n) => n._id !== id);
    });
  }

  useEffect(() => {
    getAllNotes();
    getAllTags();
  }, []);

  return (
    <Container className='my-4'>
      <Routes>
        <Route
          index
          element={
            <NoteList
              notes={notesDB}
              availableTags={tagsDB}
              onDelete={deleteTag}
              onUpdate={updateTag}
            />
          }
        />
        <Route
          path='/new'
          element={
            <NewNote
              onSubmit={addNote}
              onAddTag={addTag}
              availableTags={tagsDB}
            />
          }
        />
        <Route path='/:id' element={<NoteLayout notes={notesDB} />}>
          <Route index element={<Note onDelete={deleteNote} />}></Route>
          <Route
            path='edit'
            element={
              <EditNote
                onSubmit={updateNote}
                onAddTag={addTag}
                availableTags={tagsDB}
              />
            }
          ></Route>
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Container>
  );
}

export default App;
