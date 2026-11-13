import React, { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ChevronRight, Grid3X3, List, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";

export default function GalleryExplorer({
  visibleGames, years, lanes, filters,
  query, onQueryChange, selectedYear, onYearChange,
  selectedLane, onLaneChange, selectedMechanic, onSelectMechanic,
  selectedGame, onSelectGame, onOpenLab,
  GameArt, GameDetail,
}) {
  const [sort, setSort] = useState("recent");
  const [density, setDensity] = useState("grid");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sortedGames = useMemo(() => [...visibleGames].sort((a, b) => {
    if (sort === "oldest") return a.year - b.year || a.title.localeCompare(b.title);
    if (sort === "name") return a.title.localeCompare(b.title);
    return b.year - a.year || a.title.localeCompare(b.title);
  }), [visibleGames, sort]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (event) => { if (event.key === "Escape") setDrawerOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  useEffect(() => { setDrawerOpen(false); }, [query, selectedYear, selectedLane, selectedMechanic]);

  function openGame(id) {
    onSelectGame(id);
    setDrawerOpen(true);
  }

  function reset() {
    onQueryChange("");
    onYearChange("all");
    onLaneChange("all");
    onSelectMechanic("all");
  }

  const hasFilters = Boolean(query.trim()) || selectedYear !== "all" || selectedLane !== "all" || selectedMechanic !== "all";

  return (
    <section className="discovery-panel discovery-gallery">
      <div className="discovery-gallery-heading">
        <div>
          <span className="discovery-eyebrow">THE GAME COLLECTION</span>
          <h2>Game Gallery</h2>
          <p>เลือกเกมที่สะดุดตา หรือใช้ตัวกรองเพื่อค้นหาเกมที่มีแนวทางการออกแบบที่สนใจ</p>
        </div>
        <span className="discovery-gallery-total">{sortedGames.length} เกม</span>
      </div>

      <div className="discovery-gallery-toolbar">
        <label className="discovery-gallery-search">
          <Search size={18}/>
          <input value={query} onChange={(event) => onQueryChange(event.target.value)}
            aria-label="ค้นหาชื่อเกม กลไก หรือประสบการณ์" placeholder="ค้นหาเกม กลไก หรือประสบการณ์..." />
        </label>
        <div className="discovery-gallery-filters">
          <label><span>ปี</span><select value={selectedYear} onChange={(event) => onYearChange(event.target.value)}>
            <option value="all">ทุกปี</option>{years.map((year) => <option key={year} value={year}>{year}</option>)}
          </select></label>
          <label><span>รางวัล</span><select value={selectedLane} onChange={(event) => onLaneChange(event.target.value)}>
            <option value="all">ทุกรางวัล</option>{lanes.map((lane) => <option key={lane.id} value={lane.id}>{lane.label}</option>)}
          </select></label>
          <label className="discovery-gallery-mechanic-select"><span>Wizard Hat</span><select value={selectedMechanic}
            onChange={(event) => onSelectMechanic(event.target.value)}>
            <option value="all">ทุกกลไก</option>
            {filters.map((mechanic) => <option key={mechanic.id} value={mechanic.id}>{mechanic.shortLabel || mechanic.label}</option>)}
          </select></label>
        </div>
      </div>

      <div className="discovery-gallery-results">
        <span><SlidersHorizontal size={15}/> แสดง {sortedGames.length} เกม จากปี 2015–2025</span>
        <div className="discovery-gallery-tools">
          {hasFilters && <button type="button" className="discovery-clear" onClick={reset}><RotateCcw size={14}/> ล้างตัวกรอง</button>}
          <label className="discovery-gallery-sort">เรียงตาม <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="recent">ปีล่าสุด</option><option value="oldest">ปีเก่าสุด</option><option value="name">ชื่อ A–Z</option>
          </select></label>
          <div className="discovery-layout-switch" role="group" aria-label="Gallery layout">
            <button type="button" onClick={() => setDensity("grid")} className={density === "grid" ? "active" : ""} aria-label="Grid view"><Grid3X3 size={17}/></button>
            <button type="button" onClick={() => setDensity("list")} className={density === "list" ? "active" : ""} aria-label="List view"><List size={17}/></button>
          </div>
        </div>
      </div>

      <div className={"discovery-gallery-cards " + (density === "list" ? "is-list" : "")}>
        {sortedGames.map((game) => {
          const lane = lanes.find((item) => item.id === game.lane);
          return (
            <article className="discovery-gallery-card" key={game.id}>
              <button type="button" className="discovery-gallery-open" onClick={() => openGame(game.id)}
                aria-label={"ดูรายละเอียดเกม " + game.title}>
                <div className="discovery-gallery-cover">
                  <GameArt game={game}/>
                  <span className={"discovery-lane-label " + (lane?.tone || "")}>{lane?.label}</span>
                </div>
                <div className="discovery-gallery-copy">
                  <span className="discovery-gallery-meta">{game.year} · {lane?.fullName}</span>
                  <h3>{game.title}</h3>
                  <p>{game.magic?.action || game.tableMoment}</p>
                  <span className="discovery-gallery-card-cta">ดูการวิเคราะห์ <ChevronRight size={15}/></span>
                </div>
              </button>
              <div className="discovery-gallery-tags">
                {game.taste.slice(0, 2).map((taste) => {
                  const card = filters.find((item) => item.tasteName === taste.name);
                  return card ? (
                    <button type="button" key={taste.name} title={"กรองเกมด้วย " + taste.name} onClick={() => onSelectMechanic(card.id)}>
                      {card.shortLabel || card.label}
                    </button>
                  ) : <span key={taste.name}>{taste.name}</span>;
                })}
              </div>
            </article>
          );
        })}
      </div>
      {sortedGames.length === 0 && (
        <div className="discovery-gallery-empty">
          <Search size={32}/><h3>ไม่พบเกมตามเงื่อนไขนี้</h3>
          <p>ลองใช้คำค้นที่กว้างขึ้น หรือล้างตัวกรองเพื่อดูเกมทั้งหมด</p>
          <button type="button" onClick={reset}>แสดงเกมทั้งหมด</button>
        </div>
      )}

      {drawerOpen && selectedGame && (
        <div className="discovery-drawer-backdrop" role="presentation" onClick={() => setDrawerOpen(false)}>
          <div className="discovery-drawer" role="dialog" aria-modal="true" aria-label={"รายละเอียดเกม " + selectedGame.title}
            onClick={(event) => event.stopPropagation()}>
            <div className="discovery-drawer-header">
              <span>GAME ANALYSIS · {selectedGame.year}</span>
              <button type="button" onClick={() => setDrawerOpen(false)} aria-label="ปิดรายละเอียดเกม"><X size={19}/></button>
            </div>
            <GameDetail game={selectedGame}/>
            <div className="discovery-drawer-footer">
              <button type="button" onClick={() => { setDrawerOpen(false); onOpenLab(); }}>
                สำรวจกลไกอื่นใน Wizard Hat Lab <ArrowUpRight size={15}/>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
