import React, { useState, useEffect } from "react";
import "./EditStepModal.css";

const EditStepModal = ({ isOpen,applicationId ,onClose, onSave, step = null }) => {
  const [stepName, setStepName] = useState("");
  const [stepDate, setStepDate] = useState("");
  const [location, setLocation] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const onAddStep = async (e) => {
    e.preventDefault();

    try{
      const res = await fetch(`/api/selection/${applicationId}`,{
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          stepName:stepName,
          stepDate:stepDate || null,
          location:location,
          isCompleted:isCompleted
        })
      });

      if(onSave){
        await onSave();
      }else {
        onClose();
      }
    }catch (e){
      console.error("step save failed: ", e);
      alert("단계 추가를 실패했습니다.");
    }
  }

  useEffect(() => {
    if(!isOpen) return;

    if(step){
      setStepName(step.stepName || "");
      setStepDate(step.stepDate);
      setLocation(step.location || "");
      setIsCompleted(step.isCompleted || false);
    }else {
      setStepName( "");
      setStepDate("");
      setLocation("");
      setIsCompleted( false);
    }
  }, [isOpen, step])

  const onUpdateStep = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch(`/api/selection/update/${step.id}`,{
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          stepName: stepName,
          stepDate: stepDate,
          location: location,
          isCompleted: isCompleted
        })
      });

      if(onSave){
        await onSave();
      }else {
        onClose();
      }

    }catch (e){
      console.error("step update failed: ", e);
      alert("수정 실패했습니다.");
    }
  }

  const handleChangeStepName = (e) => setStepName(e.target.value);
  const handleChangeStepDate = (e) => setStepDate(e.target.value);
  const handleChangeLocation = (e) => setLocation(e.target.value);
  const handleChangeIsCompleted = (e) => setIsCompleted(e.target.checked);

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
        <form onSubmit={step ? onUpdateStep : onAddStep} className="edit-form">
          <div className="form-group">
            <label>단계명 *</label>
            <input
              type="text"
              name="step_name"
              value={stepName}
              onChange={handleChangeStepName}
              placeholder="예: 1차 면접, 2차 면접"
              required
            />
          </div>

          <div className="form-group">
            <label>면접/시험 일시</label>
            <input
              type="datetime-local"
              name="step_date"
              value={stepDate}
              onChange={handleChangeStepDate}
            />
          </div>

          <div className="form-group">
            <label>장소</label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={handleChangeLocation}
              placeholder="예: Zoom 링크 또는 회사 주소"
            />
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="is_completed"
              name="is_completed"
              checked={isCompleted}
              onChange={handleChangeIsCompleted}
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
