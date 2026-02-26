import { useState, useEffect } from "react";
import "./EditNoteModal.css";

const EditNoteModal = ({ isOpen,applicationId ,onClose, onSave, note = null }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [noteType, setNoteType] = useState("");

  const onAddNote = async (e) => {
    e.preventDefault();

    try{
      const res = await fetch(`/api/notes/${applicationId}`,{
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question:question,
          answer:answer,
          noteType: noteType
        })
      });

      if(onSave){
        await onSave();
      }else {
        onClose();
      }
    }catch (e){
      console.error("note save failed: ", e);
      alert("노트 추가를 실패했습니다.");
    }
  }

  useEffect(() => {
    if(!isOpen) return;

    if(note){
      setNoteType(note.type || "COMPANY_ANALYSIS");
      setQuestion(note.question || "");
      setAnswer(note.answer || "");
    }else {
      setNoteType( "COMPANY_ANALYSIS");
      setQuestion("");
      setAnswer("");
    }
  }, [isOpen, note])

  const onUpdateNote = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch(`/api/notes/update/${note.id}`,{
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question:question,
          answer:answer,
          noteType: noteType
        })
      });

      if(onSave){
        await onSave();
      }else {
        onClose();
      }

    }catch (e){
      console.error("note save failed: ", e);
      alert("노트 추가를 실패했습니다.");
    }
  }

  const handleChangeQuestion = (e) => setQuestion(e.target.value);
  const handleChangeAnswer = (e) => setAnswer(e.target.value);
  const handleChangeNoteType = (e) => setNoteType(e.target.value);

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
        <form onSubmit={note? onUpdateNote : onAddNote} className="edit-form">
          <div className="form-group">
            <label>구분</label>
            <select
              name="note_type"
              value={noteType}
              onChange={handleChangeNoteType}
            >
              <option value="COMPANY_ANALYSIS">기업 분석</option>
              <option value="INTERVIEW_QA">면접 Q&A</option>
              <option value="REVERSE_QUESTION">역질문</option>
              <option value="FEEDBACK">면접 복기</option>
              <option value="SELF_ANALYSIS">자기 분석</option>
            </select>
          </div>

          <div className="form-group">
            <label>질문 (Q) *</label>
            <textarea
              name="question"
              value={question}
              onChange={handleChangeQuestion}
              placeholder="면접 질문을 입력하세요..."
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label>답변 (A) *</label>
            <textarea
              name="answer"
              value={answer}
              onChange={handleChangeAnswer}
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
