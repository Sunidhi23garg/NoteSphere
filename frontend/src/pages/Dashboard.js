import React, { useEffect, useState, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import Note from "./Note";
import API from "../services/api";
import "./Dashboard.css";

const socket = io("http://localhost:5000", {
  autoConnect: false,
});

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authError, setAuthError] = useState(false);
  const [serverError, setServerError] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState(false);
  const observerRef = useRef(null);
  const token = localStorage.getItem("token");

  const loadNotes = useCallback(async () => {
    if (!hasMore || loading || !token) return;
    setLoading(true);
    setServerError("");

    try {
      const res = await API.get("/notes", {
        params: { skip: page * 20, limit: 20 },
      });
      const fetched = Array.isArray(res.data) ? res.data : res.data.notes;

      setNotes((prev) => {
        const newNotes = fetched.filter(
          (newNote) => !prev.some((existingNote) => existingNote._id === newNote._id)
        );
        return [...prev, ...newNotes];
      });

      setPage((prev) => prev + 1);
      if (fetched.length < 20) setHasMore(false);
    } catch (err) {
      console.error("Error loading notes:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        setAuthError(true);
        localStorage.removeItem("token");
      } else if (err.response?.status === 500) {
        setServerError("Server error. Please try again later.");
      } else {
        setServerError(err.response?.data?.message || "Failed to load notes");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, token, page]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Please enter both title and content");
      return;
    }

    try {
      const res = await API.post("/notes", { title, content });
      setNotes((prev) => [res.data, ...prev]);
      setTitle("");
      setContent("");
      setShowForm(false);
      setError("");
    } catch (err) {
      console.error("Error adding note:", err);
      setError(err.response?.data?.message || "Error adding note");
    }
  };

  useEffect(() => {
    if (!token) {
      setAuthError(true);
      return;
    }

    const initializeDashboard = async () => {
      try {
        await loadNotes();
        socket.auth = { token };
        socket.connect();

        socket.on("noteCreated", (note) => {
          setNotes((prev) => [note, ...prev]);
        });

        socket.on("noteUpdated", (updatedNote) => {
          setNotes((prev) =>
            prev.map((note) => (note._id === updatedNote._id ? updatedNote : note))
          );
        });

        socket.on("noteDeleted", (id) => {
          setNotes((prev) => prev.filter((note) => note._id !== id));
        });
      } catch (err) {
        console.error("Error initializing dashboard:", err);
      }
    };

    initializeDashboard();

    return () => socket.disconnect();
  }, [token, loadNotes]);

  useEffect(() => {
    if (!hasMore || loading) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadNotes();
      },
      { threshold: 1 }
    );

    const sentinel = document.getElementById("sentinel");
    if (sentinel) observerRef.current.observe(sentinel);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loadNotes, hasMore, loading]);

  if (authError) {
    return (
      <div className="auth-error">
        Session expired. Please{" "}
        <a href="/login">login again</a>.
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2 className="dashboard-title">Your Notes</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className={`add-note-btn ${showForm ? 'cancel' : ''}`}
          >
            {showForm ? "Cancel" : "Add New Note"}
          </button>
        </div>

        {showForm && (
          <div className="note-form-container">
            <h3 className="note-form-title">Add New Note</h3>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleAddNote} className="note-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="form-textarea"
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Add Note
              </button>
            </form>
          </div>
        )}

        {serverError && (
          <p className="server-error">{serverError}</p>
        )}

        <div className="notes-grid">
          {notes.length > 0 ? (
            notes.map((note) => <Note key={note._id} note={note} />)
          ) : (
            !loading && (
              <div className="empty-state">
                <h3>No notes found</h3>
                <p>Click "Add New Note" to create your first note!</p>
              </div>
            )
          )}
        </div>

        {loading && <p className="loading-state">Loading more notes...</p>}
        {hasMore && <div id="sentinel" className="sentinel"></div>}
      </div>
    </div>
  );
};

export default Dashboard;