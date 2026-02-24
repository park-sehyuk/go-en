import { useState, useEffect } from "react";
import DetailModal from "../components/DetailModal";
import AddCardModal from "../components/AddCardModal";
import "./MainPage.css";

const COLUMNS = ["INTERESTED", "APPLIED", "INTERVIEW", "PASSED"];

const MainPage = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      companyName: "네이버",
      position: "백엔드",
      status: "APPLIED",
      priority: 4,
      deadline: "2024-04-15",
      url: "https://naver.com",
      progress: 30,
    },
    {
      id: 2,
      companyName: "카카오",
      position: "서버 개발",
      status: "INTERVIEW",
      priority: 5,
      deadline: "2024-04-25",
      url: "https://kakao.com",
      progress: 60,
    },
    {
      id: 3,
      companyName: "삼성전자",
      position: "SW개발",
      status: "INTERESTED",
      priority: 3,
      deadline: "2024-04-30",
      url: "https://samsung.com",
      progress: 0,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

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

  const onDrop = (e, newStatus) => {
    const cardId = parseInt(e.dataTransfer.getData("cardId"));
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, status: newStatus } : c)),
    );
    setDragOverCol(null);
  };

  // 새 카드 추가/수정 함수
  const handleSaveCard = (formData) => {
    if (formData.id) {
      // 기존 카드 수정
      setCards((prev) =>
        prev.map((c) =>
          c.id === formData.id
            ? {
                ...c,
                companyName: formData.company_name,
                position: formData.position,
                status: formData.status,
                priority: formData.priority,
                deadline: formData.deadline,
                url: formData.url,
              }
            : c,
        ),
      );
    } else {
      // 새 카드 추가
      const newCard = {
        id: Date.now(),
        companyName: formData.company_name,
        position: formData.position,
        status: formData.status,
        priority: formData.priority,
        deadline: formData.deadline,
        url: formData.url,
        progress: 0,
      };
      setCards([...cards, newCard]);
    }
    setIsAddCardModalOpen(false);
    setEditingCard(null);
  };

  // 카드 삭제 함수
  const handleDeleteCard = (cardId) => {
    if (window.confirm("이 카드를 삭제하시겠습니까?")) {
      setCards((prev) => prev.filter((c) => c.id !== cardId));
      setSelectedAppId(null);
    }
  };

  // 카드 편집 오픈
  const handleEditCard = (card) => {
    setEditingCard(card);
    setIsAddCardModalOpen(true);
    setSelectedAppId(null);
  };

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
              <option value="INTERESTED">관심 공고</option>
              <option value="APPLIED">지원 완료</option>
              <option value="INTERVIEW">면접 진행</option>
              <option value="PASSED">최종 합격</option>
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
                    <span className="card-deadline">D-{card.deadline}</span>
                  </div>
                  <p className="card-position">{card.position}</p>

                  {/* 추가 기능: 진행률 바 */}
                  <div className="progress-container">
                    <div
                      className="progress-bar"
                      style={{ width: `${card.progress}%` }}
                    ></div>
                  </div>
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
        onSave={handleSaveCard}
        editingCard={editingCard}
      />
    </div>
  );
};

export default MainPage;
