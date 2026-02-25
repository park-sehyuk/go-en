import { useState, useEffect } from "react";
import DetailModal from "../components/DetailModal";
import AddCardModal from "../components/AddCardModal";
import "./MainPage.css";

const COLUMNS = ["INTERESTED", "APPLIED","TEST", "INTERVIEW","OFFER","REJECTED"];

const MainPage = () => {
  const [cards, setCards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const onFormData = async () => {
    try {
      const res = await fetch("/api/application", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("failed to load app");
      }

      const data = await res.json();
      setCards(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("app load failed:", e);
      setCards([]);
    } finally {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    onFormData();
  }, []);

  const formatDeadlineLabel = (deadline) => {
    if (!deadline) return "마감일 없음";

    const today = new Date();
    const target = new Date(deadline);

    const diffMs = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 0) return `D-${diffDays}`;
    if (diffDays === 0) return "D-Day";
    return `마감 지남 (${Math.abs(diffDays)}일)`;
  };

  // 검색어와 필터에 따라 필터링된 카드 목록
  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      card.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "ALL" || card.status === filter;
    return matchesSearch && matchesFilter;
  });

  const onDragStart = (e, id) => {
    e.dataTransfer.setData("cardId", id);
  };

  const onDragOver = (e, status) => {
    e.preventDefault();
    setDragOverCol(status);
  };

  const onUpdateStatus = async (applicationId, newStatus) => {
    try {
      const res = await fetch(`/api/application/cardStatus/${applicationId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        let message = "상태변경에 실패했습니다.";

        const data = await res.json().catch(() => ({}));
        if (data?.message) message = data.message;
        alert(message);
        throw new Error(message);
      }
    } catch (e) {
      console.error("status save failed: ", e);
      alert("상태값 변경에 실패했습니다.");
      throw e;
    }
  };

  const onDrop = async (e, newStatus) => {
    const cardId = parseInt(e.dataTransfer.getData("cardId"), 10);
    setCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, status: newStatus } : c)),
    );
    setDragOverCol(null);

    try {
      await onUpdateStatus(cardId, newStatus);
    } catch {
      onFormData();
    }
  };



  // 카드 편집 오픈
  const handleEditCard = (card) => {
    setEditingCard(card);
    setIsAddCardModalOpen(true);
    setSelectedAppId(null);
  };

  if (!isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="kanban-container">
      <div className="kanban-header-area">
        <h1 className="kanban-header">🚀 Go-en 취업</h1>

        {/* 추가 기능: 툴바 (검색 + 필터 + 추가) */}
        <div className="kanban-toolbar">
          <input
            type="text"
            className="search-input"
            placeholder="회사명 또는 직무 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="toolbar-right">
            <select
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="ALL">전체 보기</option>
              <option value="INTERESTED">검토중 (検討中)</option>
              <option value="APPLIED">서류제출 (ES提出)</option>
              <option value="TEST">적성검사/코테 (適性検査)</option>
              <option value="INTERVIEW">면접진행 (面접進行)</option>
              <option value="OFFER">내정 (内定)</option>
              <option value="REJECTED">불합격 (お祈り)</option>
            </select>
            <button
              className="add-card-btn"
              onClick={() => {
                setEditingCard(null);
                setIsAddCardModalOpen(true);
              }}
            >
              + 카드 추가
            </button>
          </div>
        </div>
      </div>

      <div className="board">
        {COLUMNS.map((status) => (
          <div
            key={status}
            className={`column ${dragOverCol === status ? "dragging-over" : ""}`}
            onDragOver={(e) => onDragOver(e, status)}
            onDrop={(e) => onDrop(e, status)}
            onDragLeave={() => setDragOverCol(null)}
          >
            <div className="column-title">
              {status} (
              {filteredCards.filter((c) => c.status === status).length})
            </div>

            {filteredCards
              .filter((c) => c.status === status)
              .map((card) => (
                <div
                  key={card.id}
                  className="card"
                  draggable
                  onDragStart={(e) => onDragStart(e, card.id)}
                  onClick={() => setSelectedAppId(card.id)}
                >
                  <div className="card-header">
                    <p className="card-title">{card?.companyName}</p>
                    <span className="card-deadline">{formatDeadlineLabel(card.deadline)}</span>
                  </div>
                  <p className="card-position">{card.position}</p>
                </div>
              ))}
          </div>
        ))}
      </div>

      {selectedAppId && (
        <DetailModal
          appId={selectedAppId}
          onClose={() => setSelectedAppId(null)}
          onEdit={handleEditCard}
          onDelete={handleDeleteCard}
          card={cards.find((c) => c.id === selectedAppId)}
        />
      )}

      <AddCardModal
        isOpen={isAddCardModalOpen}
        onClose={() => {
          setIsAddCardModalOpen(false);
          setEditingCard(null);
        }}
        editingCard={editingCard}
        onSaved={async () => {
          await onFormData();
          setIsAddCardModalOpen(false);
          setEditingCard(null);
        }}
      />
    </div>
  );
};

export default MainPage;
