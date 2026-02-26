import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import "./AddCardModal.css";

const AddCardModal = ({ isOpen, onClose, editingCard = null, onSaved}) => {
  const navigator = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState();
  const [deadline, setDeadline] = useState();
  const [url, setUrl] = useState("");

  const onAddCard = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch("/api/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          companyName: companyName,
          position: position,
          status: status,
          priority: priority,
          deadline: deadline,
          url: url
        })
      });
      await onSaved();
    }catch (e){
      console.error("application save failed: ", e);
      alert("카드추가를 실패했습니다.");
    }
  }

  useEffect(() => {
    if (!isOpen) return;

    if (editingCard) {
      setCompanyName(editingCard.companyName || "");
      setPosition(editingCard.position || "");
      setStatus(editingCard.status || "INTERESTED");
      setPriority(editingCard.priority);
      setDeadline(editingCard.deadline);
      setUrl(editingCard.url || "");
    }else {
      setCompanyName( "");
      setPosition( "");
      setStatus( "INTERESTED");
      setPriority("");
      setDeadline("");
      setUrl( "");
    }
  }, [isOpen, editingCard]);

  const updateCard = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch(`/api/application/${editingCard.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          companyName: companyName,
          position: position,
          status: status,
          priority: priority,
          deadline: deadline,
          url: url
        })
      });

      if(onSaved){
        await onSaved();
      }else {
        onClose();
      }
    }catch (e){
      console.error("application update failed: ", e);
      alert("수정 실패했습니다.");
    }
  }


  const handleChangeCompanyName = (e) => setCompanyName(e.target.value);
  const handleChangePosition = (e) => setPosition(e.target.value);
  const handleChangeStatus = (e) => setStatus(e.target.value);
  const handleChangePriority = (e) => setPriority(e.target.value);
  const handleChangeDeadline = (e) => setDeadline(e.target.value);
  const handleChangeUrl = (e) => setUrl(e.target.value);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content add-card-modal">
        <div className="modal-header">
          <h2>{editingCard ? "카드 수정" : "새 카드 추가"}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={editingCard ? updateCard : onAddCard} className="add-card-form">
          <div className="form-grid">
            <div className="form-group">
              <label>회사명 *</label>
              <input
                type="text"
                name="company_name"
                value={companyName}
                onChange={handleChangeCompanyName}
                placeholder="예: LINE株式会社"
                required
              />
            </div>

            <div className="form-group">
              <label>지원 직무 *</label>
              <input
                type="text"
                name="position"
                value={position}
                onChange={handleChangePosition}
                placeholder="예: Web Engineer"
                required
              />
            </div>

            <div className="form-group">
              <label>진행 상태</label>
              <select
                name="status"
                value={status}
                onChange={handleChangeStatus}
              >
                <option value="INTERESTED">검토중 (検討中)</option>
                <option value="APPLIED">서류제출 (ES提出)</option>
                <option value="TEST">적성검사/코테 (適性検査)</option>
                <option value="INTERVIEW">면접진행 (面접進行)</option>
                <option value="OFFER">내정 (内定)</option>
                <option value="REJECTED">불합격 (お祈り)</option>
              </select>
            </div>

            <div className="form-group">
              <label>지망도 (1-5)</label>
              <input
                type="number"
                name="priority"
                min="1"
                max="5"
                value={priority}
                onChange={handleChangePriority}
              />
            </div>

            <div className="form-group">
              <label>마감일</label>
              <input
                type="date"
                name="deadline"
                value={deadline}
                onChange={handleChangeDeadline}
              />
            </div>

            <div className="form-group full-width">
              <label>채용 공고 링크</label>
              <input
                type="url"
                name="url"
                value={url}
                onChange={handleChangeUrl}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editingCard ? "수정 완료" : "카드 추가"}
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

export default AddCardModal;
