import React, { useState, useEffect } from "react";
import EditStepModal from "./EditStepModal";
import EditNoteModal from "./EditNoteModal";
import "./DetailModal.css";

const DetailModal = ({ onClose, onEdit, onDelete, card }) => {
  const [detail, setDetail] = useState(null);
  const [editingStep, setEditingStep] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [isEditStepModalOpen, setIsEditStepModalOpen] = useState(false);
  const [isEditNoteModalOpen, setIsEditNoteModalOpen] = useState(false);

  const normalizeDetail = (data) => ({
    ...(data && typeof data === "object" && !Array.isArray(data) ? data : {}),
    selectionSteps: Array.isArray(data?.selectionSteps) ? data.selectionSteps : [],
    notes: Array.isArray(data?.notes) ? data.notes : [],
  });

 const onDetailFormData = async () => {
   if (!card?.id) return;
   try{
     const res = await fetch(`/api/application/detail/${card.id}`,{
       method: "GET",
       credentials: "include"
     });

     const data = await res.json();
     setDetail(normalizeDetail(data));
   }catch (e){
     console.error("detail load failed", e);
     setDetail(normalizeDetail(null));
   }
 }

 useEffect(() => {
   if (!card?.id) return;
   onDetailFormData();
 },[card])

  const onUpdateIsCompleted = async (stepId, nextIsCompleted) => {
    try {
      await fetch(`/api/selection/isCompleted/${stepId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted: nextIsCompleted }),
      });

      await onDetailFormData(); // 저장 후 상세 다시 불러오기
    } catch (e) {
      console.error("isCompleted update failed: ", e);
      alert("체크를 실패했습니다.");
    }
  };

  const onDeleteStep = async (stepId) => {
   try{
     const res = await fetch(`/api/selection/delete/${stepId}`,{
       method: "DELETE",
       headers:{
         "Content-Type": "application/json"
       }
     });
     await onDetailFormData();
   }catch (e){
     console.error("step delete failed: ",e);
     alert("삭제를 실패하였습니다.");
   }
  }

  const onDeleteNote = async (noteId) => {
    try{
      const res = await fetch(`/api/notes/delete/${noteId}`,{
        method: "DELETE",
        headers:{
          "Content-Type": "application/json"
        }
      });
      await onDetailFormData();
    }catch (e){
      console.error("step delete failed: ",e);
      alert("삭제를 실패하였습니다.");
    }
  }


  if (!card) return null;
  if (!detail) return <div>자세한 정보가 없습니다.</div>;

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
              onClick={() => onDelete && onDelete(detail.id)}
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
                  {detail.status === "INTERESTED" && "검토중 (検討中)"}
                  {detail.status === "APPLIED" && "서류제출 (ES提出)"}
                  {detail.status === "TEST" && "적성검사/코테 (適性検査)"}
                  {detail.status === "INTERVIEW" && "면접진행 (面접進行)"}
                  {detail.status === "OFFER" && "내정 (内定)"}
                  {detail.status === "REJECTED" && "불합격 (お祈り)"}
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
                {(detail.selectionSteps ?? []).map((step) => (
                  <div
                    key={step.id}
                    className={`step-item ${step.isCompleted ? "step-completed" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(step.isCompleted)}
                      onChange={(e) => onUpdateIsCompleted(step.id, e.target.checked)}
                    />
                    <div className="step-info">
                      <p className="step-name">{step.stepName}</p>
                      <p className="step-date">
                        {step.stepDate ? new Date(step.stepDate).toLocaleString() : "일정이 없습니다."}
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
                        onClick={() => onDeleteStep(step.id)}
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
                {(detail.qaNotes ?? []).map((note) => (
                  <div key={note.id} className="note-item">
                    <div className="note-header">
                      <span
                        className={`note-type-badge note-${note.type}`}
                      >
                        {note.type === "COMPANY_ANALYSIS" && "기업 분석"}
                        {note.type === "INTERVIEW_QA" && "면접 Q&A"}
                        {note.type === "REVERSE_QUESTION" && "역질문"}
                        {note.type === "FEEDBACK" && "면접 복기"}
                        {note.type === "SELF_ANALYSIS" && "자기 분석"}
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
                          onClick={() => onDeleteNote(note.id)}
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
          applicationId = {detail.id}
          onClose={() => {
            setIsEditStepModalOpen(false);
            setEditingStep(null);
          }}
          onSave={async () => {
            await onDetailFormData();
            setIsEditStepModalOpen(false);
            setEditingStep(null);
          }}
          step={editingStep}
        />

        <EditNoteModal
          isOpen={isEditNoteModalOpen}
          applicationId={detail.id}
          onClose={() => {
            setIsEditNoteModalOpen(false);
            setEditingNote(null);
          }}
          onSave={async () => {
            await onDetailFormData();
            setIsEditNoteModalOpen(false);
            setEditingNote(null);
          }}
          note={editingNote}
        />
      </div>
    </div>
  );
};

export default DetailModal;
