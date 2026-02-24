import React, { useState, useEffect } from "react";
import "./EditNoteModal.css";

const EditNoteModal = ({ isOpen, onClose, onSave, note = null }) => {
  const [formData, setFormData] = useState({
    id: null,
    question: "",
    answer: "",
    note_type: "Interview_QA",
  });

  useEffect(() => {
    if (note) {
      setFormData({
        id: note.id,
        question: note.question,
        answer: note.answer,
        note_type: note.note_type,
      });
    } else {
      setFormData({
        id: null,
        question: "",
        answer: "",
        note_type: "Interview_QA",
      });
    }
  }, [note, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) {
      alert("질문과 답변은 필수입니다.");
      return;
    }
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content edit-note-modal">
        <div className="modal-header">
          <h2>{note ? "면접 노트 수정" : "면접 노트 추가"}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label>구분</label>
            <select
              name="note_type"
              value={formData.note_type}
              onChange={handleChange}
            >
              <option value="Interview_QA">면접 Q&A</option>
              <option value="Company_Research">회사 리서치</option>
              <option value="Personal_PR">자기 PR</option>
              <option value="Motivation">지망동기</option>
              <option value="Reverse_Question">역질문</option>
            </select>
          </div>

          <div className="form-group">
            <label>질문 (Q) *</label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="면접 질문을 입력하세요..."
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label>답변 (A) *</label>
            <textarea
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              placeholder="당신의 답변 스크립트를 입력하세요..."
              rows="5"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {note ? "수정 완료" : "추가"}
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNoteModal;
