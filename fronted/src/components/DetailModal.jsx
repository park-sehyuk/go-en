import React, { useState, useEffect } from "react";
import EditStepModal from "./EditStepModal";
import EditNoteModal from "./EditNoteModal";
import "./DetailModal.css";

const DetailModal = ({ appId, onClose, onEdit, onDelete, card }) => {
  const [detail, setDetail] = useState(null);
  const [editingStep, setEditingStep] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [isEditStepModalOpen, setIsEditStepModalOpen] = useState(false);
  const [isEditNoteModalOpen, setIsEditNoteModalOpen] = useState(false);

  useEffect(() => {
    if (card) {
      setDetail({
        id: card.id,
        companyName: card.companyName,
        position: card.position,
        status: card.status,
        priority: card.priority,
        deadline: card.deadline,
        url: card.url,
        steps: [
          {
            id: 1,
            step_name: "서류전형",
            step_date: "2024-03-20",
            location: "온라인",
            is_completed: true,
          },
          {
            id: 2,
            step_name: "1차 면접",
            step_date: "2024-04-05T14:00",
            location: "Zoom",
            is_completed: true,
          },
          {
            id: 3,
            step_name: "2차 면접",
            step_date: "2024-04-20T10:00",
            location: "회사 본사",
            is_completed: false,
          },
        ],
        notes: [
          {
            id: 1,
            question: "회사 비전에 대해 어떻게 생각하시나요?",
            answer: "일본의 기술 엔지니어링에 기여하고 싶어서...",
            note_type: "Interview_QA",
          },
          {
            id: 2,
            question: "가장 어려웠던 프로젝트는?",
            answer: "팀 코드베이스를 재구축할 때...",
            note_type: "Interview_QA",
          },
        ],
      });
    }
  }, [card]);

  // 단계 저장 함수
  const handleSaveStep = (stepData) => {
    setDetail((prev) => {
      if (stepData.id) {
        // 수정
        return {
          ...prev,
          steps: prev.steps.map((s) => (s.id === stepData.id ? stepData : s)),
        };
      } else {
        // 추가
        return {
          ...prev,
          steps: [...prev.steps, { ...stepData, id: Date.now() }],
        };
      }
    });
    setIsEditStepModalOpen(false);
    setEditingStep(null);
  };

  // 단계 삭제 함수
  const handleDeleteStep = (stepId) => {
    if (window.confirm("이 면접 단계를 삭제하시겠습니까?")) {
      setDetail((prev) => ({
        ...prev,
        steps: prev.steps.filter((s) => s.id !== stepId),
      }));
    }
  };

  // 노트 저장 함수
  const handleSaveNote = (noteData) => {
    setDetail((prev) => {
      if (noteData.id) {
        // 수정
        return {
          ...prev,
          notes: prev.notes.map((n) => (n.id === noteData.id ? noteData : n)),
        };
      } else {
        // 추가
        return {
          ...prev,
          notes: [...prev.notes, { ...noteData, id: Date.now() }],
        };
      }
    });
    setIsEditNoteModalOpen(false);
    setEditingNote(null);
  };

  // 노트 삭제 함수
  const handleDeleteNote = (noteId) => {
    if (window.confirm("이 면접 노트를 삭제하시겠습니까?")) {
      setDetail((prev) => ({
        ...prev,
        notes: prev.notes.filter((n) => n.id !== noteId),
      }));
    }
  };

  if (!detail) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-info">
            <h2>{detail.companyName}</h2>
            <p className="modal-header-position">{detail.position}</p>
          </div>
          <div className="modal-header-actions">
            <button
              className="edit-btn"
              onClick={() => onEdit && onEdit(card)}
              title="수정"
            >
              ✎
            </button>
            <button
              className="delete-btn"
              onClick={() => onDelete && onDelete(card.id)}
              title="삭제"
            >
              🗑
            </button>
            <button className="close-btn" onClick={onClose}>
              &times;
            </button>
          </div>
        </div>
        <div className="modal-body">
          {/* 상단: 기본 정보 */}
          <div className="modal-info-section">
            <div className="info-grid">
              <div className="info-item">
                <label>진행 상태</label>
                <span className={`status-badge status-${detail.status}`}>
                  {detail.status === "INTERESTED" && "검토중"}
                  {detail.status === "APPLIED" && "서류제출"}
                  {detail.status === "INTERVIEW" && "면접진행"}
                  {detail.status === "PASSED" && "최종합격"}
                </span>
              </div>
              <div className="info-item">
                <label>지망도</label>
                <div className="priority-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${star <= detail.priority ? "filled" : ""}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className="info-item">
                <label>마감일</label>
                <span>{detail.deadline || "정보 없음"}</span>
              </div>
              <div className="info-item full-width">
                <label>채용 공고 링크</label>
                {detail.url ? (
                  <a
                    href={detail.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="url-link"
                  >
                    {detail.url}
                  </a>
                ) : (
                  <span>정보 없음</span>
                )}
              </div>
            </div>
          </div>

          {/* 하단: 프로세스 & 메모 */}
          <div className="modal-content-wrapper">
            {/* 좌측: 선택 프로세스 */}
            <div className="modal-left">
              <div className="section-header">
                <h3 className="section-title">면접 단계</h3>
                <button
                  className="add-item-btn"
                  onClick={() => {
                    setEditingStep(null);
                    setIsEditStepModalOpen(true);
                  }}
                >
                  + 추가
                </button>
              </div>
              <div className="steps-container">
                {detail.steps.map((step) => (
                  <div
                    key={step.id}
                    className={`step-item ${step.is_completed ? "step-completed" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={step.is_completed}
                      readOnly
                    />
                    <div className="step-info">
                      <p className="step-name">{step.step_name}</p>
                      <p className="step-date">
                        {new Date(step.step_date).toLocaleString()}
                      </p>
                      {step.location && (
                        <p className="step-location">📍 {step.location}</p>
                      )}
                    </div>
                    <div className="step-actions">
                      <button
                        className="edit-item-btn"
                        onClick={() => {
                          setEditingStep(step);
                          setIsEditStepModalOpen(true);
                        }}
                      >
                        ✎
                      </button>
                      <button
                        className="delete-item-btn"
                        onClick={() => handleDeleteStep(step.id)}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 우측: 메모 섹션 */}
            <div className="modal-right">
              <div className="section-header">
                <h3 className="section-title">면접 노트</h3>
                <button
                  className="add-item-btn"
                  onClick={() => {
                    setEditingNote(null);
                    setIsEditNoteModalOpen(true);
                  }}
                >
                  + 추가
                </button>
              </div>
              <div className="notes-container">
                {detail.notes.map((note) => (
                  <div key={note.id} className="note-item">
                    <div className="note-header">
                      <span
                        className={`note-type-badge note-${note.note_type}`}
                      >
                        {note.note_type === "Interview_QA" && "면접 Q&A"}
                        {note.note_type === "Company_Research" && "회사 리서치"}
                        {note.note_type === "Personal_PR" && "자기 PR"}
                        {note.note_type === "Motivation" && "지망동기"}
                        {note.note_type === "Reverse_Question" && "역질문"}
                      </span>
                      <div className="note-actions">
                        <button
                          className="edit-item-btn"
                          onClick={() => {
                            setEditingNote(note);
                            setIsEditNoteModalOpen(true);
                          }}
                        >
                          ✎
                        </button>
                        <button
                          className="delete-item-btn"
                          onClick={() => handleDeleteNote(note.id)}
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                    <p className="note-question">Q: {note.question}</p>
                    <p className="note-answer">A: {note.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <EditStepModal
          isOpen={isEditStepModalOpen}
          onClose={() => {
            setIsEditStepModalOpen(false);
            setEditingStep(null);
          }}
          onSave={handleSaveStep}
          step={editingStep}
        />

        <EditNoteModal
          isOpen={isEditNoteModalOpen}
          onClose={() => {
            setIsEditNoteModalOpen(false);
            setEditingNote(null);
          }}
          onSave={handleSaveNote}
          note={editingNote}
        />
      </div>
    </div>
  );
};

export default DetailModal;
