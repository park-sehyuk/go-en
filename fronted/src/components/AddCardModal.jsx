import React, { useState, useEffect } from "react";
import "./AddCardModal.css";

const AddCardModal = ({ isOpen, onClose, onSave, editingCard = null }) => {
  const [formData, setFormData] = useState({
    id: null,
    company_name: "",
    position: "",
    status: "INTERESTED",
    priority: 3,
    deadline: "",
    url: "",
  });

  useEffect(() => {
    if (editingCard) {
      setFormData({
        id: editingCard.id,
        company_name: editingCard.companyName,
        position: editingCard.position,
        status: editingCard.status,
        priority: editingCard.priority || 3,
        deadline: editingCard.deadline || "",
        url: editingCard.url || "",
      });
    } else {
      setFormData({
        id: null,
        company_name: "",
        position: "",
        status: "INTERESTED",
        priority: 3,
        deadline: "",
        url: "",
      });
    }
  }, [editingCard, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "priority" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company_name || !formData.position) {
      alert("회사명과 직무는 필수입니다.");
      return;
    }
    onSave(formData);
    setFormData({
      id: null,
      company_name: "",
      position: "",
      status: "INTERESTED",
      priority: 3,
      deadline: "",
      url: "",
    });
  };

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
        <form onSubmit={handleSubmit} className="add-card-form">
          <div className="form-grid">
            <div className="form-group">
              <label>회사명 *</label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="예: LINE株式会社"
                required
              />
            </div>

            <div className="form-group">
              <label>지원 직무 *</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="예: Web Engineer"
                required
              />
            </div>

            <div className="form-group">
              <label>진행 상태</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="INTERESTED">검토중 (検討中)</option>
                <option value="APPLIED">서류제출 (ES提出)</option>
                <option value="INTERVIEW">면접진행중 (面接中)</option>
                <option value="PASSED">최종합격 (最終合格)</option>
              </select>
            </div>

            <div className="form-group">
              <label>지망도 (1-5)</label>
              <input
                type="number"
                name="priority"
                min="1"
                max="5"
                value={formData.priority}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>마감일</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>채용 공고 링크</label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
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
