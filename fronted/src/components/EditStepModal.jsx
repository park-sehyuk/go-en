import React, { useState, useEffect } from "react";
import "./EditStepModal.css";

const EditStepModal = ({ isOpen, onClose, onSave, step = null }) => {
  const [formData, setFormData] = useState({
    id: null,
    step_name: "",
    step_date: "",
    location: "",
    is_completed: false,
  });

  useEffect(() => {
    if (step) {
      setFormData({
        id: step.id,
        step_name: step.step_name,
        step_date: step.step_date,
        location: step.location,
        is_completed: step.is_completed,
      });
    } else {
      setFormData({
        id: null,
        step_name: "",
        step_date: "",
        location: "",
        is_completed: false,
      });
    }
  }, [step, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.step_name) {
      alert("단계명은 필수입니다.");
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
      <div className="modal-content edit-step-modal">
        <div className="modal-header">
          <h2>{step ? "면접 단계 수정" : "면접 단계 추가"}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label>단계명 *</label>
            <input
              type="text"
              name="step_name"
              value={formData.step_name}
              onChange={handleChange}
              placeholder="예: 1차 면접, 2차 면접"
              required
            />
          </div>

          <div className="form-group">
            <label>면접/시험 일시</label>
            <input
              type="datetime-local"
              name="step_date"
              value={formData.step_date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>장소</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="예: Zoom 링크 또는 회사 주소"
            />
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="is_completed"
              name="is_completed"
              checked={formData.is_completed}
              onChange={handleChange}
            />
            <label htmlFor="is_completed">완료 여부</label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {step ? "수정 완료" : "추가"}
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

export default EditStepModal;
