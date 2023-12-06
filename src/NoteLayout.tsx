import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Note } from "./App";

type NoteLayoutProp = {
  notes: Note[];
};

export function NoteLayout({ notes }: NoteLayoutProp) {
  const { id } = useParams();
  const note = notes.find((n) => n._id === id);

  if (note === null || typeof note === "undefined") {
    return <Navigate to='/' replace />;
  }

  return <Outlet context={note} />;
}

export function useNote() {
  return useOutletContext<Note>();
}
