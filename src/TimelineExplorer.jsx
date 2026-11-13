import React, { useMemo, useState } from "react";
import { cardImage, CORE_CATEGORIES, TASTE_CATEGORIES, useWizardHatPalette } from "./WizardHatPalette.js";
import { ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, BookOpen, ChevronDown, ChevronUp, Layers3, Sparkles, Trophy } from "lucide-react";

const CORE_FIELDS = [
  ["conflict", "Conflict"],
  ["order", "Order"],
  ["win", "Win Condition"],
  ["end", "End Trigger"],
];

const CORE_HINTS = {
  "Co-Operation": "ผู้เล่นร่วมมือกันเพื่อบรรลุเป้าหมายเดียวกัน",
  "Competitive": "ผู้เล่นแข่งขันกันเพื่อสร้างผลลัพธ์หรือคะแนนที่เหนือกว่าคนอื่น",
  "Fixed Turn Order": "ผู้เล่นผลัดกันเล่นตามลำดับที่กำหนดไว้",
  "Simultaneous Action Selection": "ผู้เล่นตัดสินใจเลือกการกระทำพร้อมกัน",
  "Victory Points": "ตัดสินผู้ชนะจากคะแนนสะสมเมื่อเกมจบ",
  "Completing Targets": "เกมสิ้นสุดเมื่อผู้เล่นทำเป้าหมายที่กำหนดสำเร็จ",
  "Fixed Number of Rounds": "เกมจบเมื่อเล่นครบจำนวนรอบ",
};

function getEntries(items) {
  const map = new Map();
  items.forEach((game) => {
    CORE_FIELDS.forEach(([field, category]) => {
      const label = game.core?.[field];
      if (!label) return;
      const key = "core:" + field + ":" + label;
      if (!map.has(key)) map.set(key, { key, label, category, kind: "CORE", field, gameIds: [] });
      map.get(key).gameIds.push(game.id);
    });
    (game.taste || []).forEach((taste) => {
      const key = "taste:" + taste.name;
      if (!map.has(key)) map.set(key, { key, label: taste.name, category: taste.category, kind: "TASTE", gameIds: [] });
      map.get(key).gameIds.push(game.id);
    });
  });
  return [...map.values()].sort((a, b) => b.gameIds.length - a.gameIds.length || a.label.localeCompare(b.label));
}

function relatedWizardCard(entry, allFilters) {
  return allFilters.find((card) => {
    if (entry.kind === "CORE") return card.coreField === entry.field && entry.label.includes(card.match);
    return card.tasteName && (card.tasteName === entry.label || entry.label.includes(card.tasteName));
  });
}

export default function TimelineExplorer({
  games, years, lanes, filters, year, onYearChange,
  selectedLane, onLaneChange, selectedGame, onSelectGame,
  onShowLab, GameArt, GameDetail,
}) {
  const [mode, setMode] = useState("year");
  const [focus, setFocus] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [expandedCore, setExpandedCore] = useState(false);
  const [expandedTaste, setExpandedTaste] = useState(false);
  const cardPalette = useWizardHatPalette();

  const yearGames = useMemo(
    () => games.filter((game) => game.year === Number(year) && (selectedLane === "all" || game.lane === selectedLane)),
    [games, year, selectedLane]
  );
  const yearEntries = useMemo(() => getEntries(yearGames), [yearGames]);
  const focused = yearEntries.find((entry) => entry.key === focus);
  const shownGames = focused ? yearGames.filter((game) => focused.gameIds.includes(game.id)) : yearGames;
  const chosenDetail = shownGames.find((game) => game.id === selectedGame?.id);
  const earlier = years.indexOf(Number(year)) - 1;
  const previousGames = earlier >= 0
    ? games.filter((game) => game.year === years[earlier] && (selectedLane === "all" || game.lane === selectedLane))
    : [];
  const prevTaste = new Set(getEntries(previousGames).filter((entry) => entry.kind === "TASTE").map((entry) => entry.label));
  const newToSample = yearEntries.filter((entry) => entry.kind === "TASTE" && !prevTaste.has(entry.label)).length;
  const taste = yearEntries.filter((entry) => entry.kind === "TASTE");
  const core = yearEntries.filter((entry) => entry.kind === "CORE");

  const allComparisonEntries = useMemo(() => {
    const scopedGames = games.filter((game) => selectedLane === "all" || game.lane === selectedLane);
    return getEntries(scopedGames);
  }, [games, selectedLane]);

  const categoryTrendGroups = {
    CORE: CORE_CATEGORIES.map((category) => ({
      category, entries: allComparisonEntries.filter((entry) => entry.kind === "CORE" && entry.category === category),
    })),
    TASTE: TASTE_CATEGORIES.map((category) => ({
      category, entries: allComparisonEntries.filter((entry) => entry.kind === "TASTE" && entry.category === category),
    })),
  };

  function chooseYear(nextYear, focusKey = "") {
    onYearChange(Number(nextYear));
    setFocus(focusKey);
    setExpanded(false);
  }

  function chooseMechanic(entry) {
    setFocus((old) => old === entry.key ? "" : entry.key);
  }

  function renderMechanics(items) {
    return items.slice(0, expanded ? undefined : 8).map((entry) => (
      <button key={entry.key} type="button"
        className={"discovery-mechanic" + (focused?.key === entry.key ? " is-selected" : "")}
        onClick={() => chooseMechanic(entry)} aria-pressed={focused?.key === entry.key}>
        <span className="discovery-mechanic-label">{entry.label}</span>
        <span className="discovery-mechanic-count">{entry.gameIds.length} เกม</span>
      </button>
    ));
  }


  function renderComparison(kind) {
    const isCore = kind === "CORE";
    const expanded = isCore ? expandedCore : expandedTaste;
    const setExpandedSection = isCore ? setExpandedCore : setExpandedTaste;
    const groups = categoryTrendGroups[kind];
    const maxRows = isCore ? 4 : 3;
    const totalEntries = groups.reduce((sum, group) => sum + group.entries.length, 0);
    const hasHidden = groups.some((group) => group.entries.length > maxRows);
    return (
      <section className="discovery-comparison-section" aria-label={kind + " mechanic comparison"}>
        <div className="discovery-comparison-heading">
          <div>
            <span className="discovery-eyebrow">{isCore ? "GAME STRUCTURE" : "PLAYER EXPERIENCE"}</span>
            <h3>{kind} · {isCore ? "โครงสร้างของเกม" : "กลไกสร้างประสบการณ์"}</h3>
            <p>{isCore
              ? "Conflict, Order, Win Condition และ End Trigger คือโครงสร้างหลักของการเล่น"
              : "Touch, Asset, Strategy, Twist และ Engage เพิ่มรสชาติและรูปแบบประสบการณ์"}</p>
          </div>
          <span>{totalEntries} รูปแบบในชุดข้อมูล</span>
        </div>
        <div className="discovery-card-legend" aria-label={"กลุ่มสีการ์ด " + kind}>
          {groups.map((group) => (
            <div key={group.category} className="discovery-card-legend-item"
              style={{ "--hat-color": cardPalette[group.category] || "#8ca9a4" }}>
              <img src={cardImage(group.category)} alt="" loading="lazy" />
              <span>{group.category}</span>
            </div>
          ))}
        </div>
        <div className="discovery-trend-scroll">
          <table className="discovery-heatmap discovery-card-heatmap">
            <thead>
              <tr>
                <th scope="col">ประเภท / กลไก</th>
                {years.map((item) => <th scope="col" key={item}>{item}</th>)}
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => {
                const shownEntries = expanded ? group.entries : group.entries.slice(0, maxRows);
                const style = { "--hat-color": cardPalette[group.category] || "#8ca9a4" };
                return (
                  <React.Fragment key={group.category}>
                    <tr className="discovery-category-header" style={style}>
                      <th colSpan={years.length + 1} scope="rowgroup">
                        <span className="discovery-category-heading">
                          <img src={cardImage(group.category)} alt="" loading="lazy" />
                          <strong>{group.category}</strong>
                          <small>{group.entries.length} กลไก</small>
                        </span>
                      </th>
                    </tr>
                    {shownEntries.map((entry) => (
                      <tr key={entry.key} className="discovery-category-data-row" style={style}>
                        <th scope="row">{entry.label}</th>
                        {years.map((item) => {
                          const count = games.filter((game) =>
                            game.year === item && (selectedLane === "all" || game.lane === selectedLane) &&
                            (isCore ? game.core[entry.field] === entry.label
                              : game.taste.some((tasteItem) => tasteItem.name === entry.label))
                          ).length;
                          return (
                            <td key={item}>
                              <button type="button" disabled={!count}
                                className={"discovery-heat discovery-card-heat " + (count ? "level-" + count : "")}
                                aria-label={group.category + ": " + entry.label + ", ปี " + item + ", " + count + " เกม"}
                                title={entry.label + " · " + item + " · " + count + " เกม"}
                                onClick={() => { chooseYear(item, entry.key); setMode("year"); }}>
                                {count || "·"}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        {hasHidden && (
          <button type="button" className="discovery-comparison-more" onClick={() => setExpandedSection(!expanded)}>
            {expanded ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
            {expanded ? "ย่อรายการ " + kind : "แสดงกลไก " + kind + " ทั้งหมด"}
          </button>
        )}
      </section>
    );
  }

  return (
    <div className="discovery-timeline">
      <section className="discovery-panel discovery-intro">
        <div>
          <span className="discovery-eyebrow"><Trophy size={15}/> AWARD-WINNING GAME HISTORY · 2015—2025</span>
          <h2>สำรวจวิวัฒนาการของเกม ผ่านกลไกที่ถูกเลือกใช้</h2>
          <p>เลือกปีเพื่อดูเกมรางวัลทั้ง 3 ประเภท แล้วสำรวจว่าแต่ละเกมใช้กลไกอะไรและสร้างประสบการณ์แบบไหน</p>
        </div>
        <div className="discovery-view-toggle" role="group" aria-label="Timeline view">
          <button type="button" className={mode === "year" ? "active" : ""} onClick={() => setMode("year")}><Layers3 size={17}/> ปีต่อปี</button>
          <button type="button" className={mode === "trend" ? "active" : ""} onClick={() => setMode("trend")}><BarChart3 size={17}/> เปรียบเทียบกลไก</button>
        </div>
      </section>

      <section className="discovery-panel">
        <div className="discovery-toolbar">
          <div className="discovery-segments" aria-label="Award category">
            <button type="button" className={selectedLane === "all" ? "active" : ""} onClick={() => { onLaneChange("all"); setFocus(""); }}>ทุกประเภทรางวัล</button>
            {lanes.map((lane) => (
              <button key={lane.id} type="button" className={selectedLane === lane.id ? "active" : ""}
                onClick={() => { onLaneChange(lane.id); setFocus(""); }}>{lane.label}</button>
            ))}
          </div>
          <span className="discovery-context">Spiel des Jahres · Kenner · Kinder</span>
        </div>

        {mode === "year" ? (
          <>
            <div className="discovery-years" role="group" aria-label="Select award year">
              <button type="button" className="discovery-year-arrow" aria-label="Previous year"
                disabled={years.indexOf(Number(year)) === 0}
                onClick={() => chooseYear(years[years.indexOf(Number(year)) - 1])}><ArrowLeft size={16}/></button>
              <div className="discovery-year-scroll">
                {years.map((item) => (
                  <button type="button" key={item} aria-pressed={Number(year) === item}
                    className={"discovery-year" + (Number(year) === item ? " active" : "")}
                    onClick={() => chooseYear(item)}>{item}</button>
                ))}
              </div>
              <button type="button" className="discovery-year-arrow" aria-label="Next year"
                disabled={years.indexOf(Number(year)) === years.length - 1}
                onClick={() => chooseYear(years[years.indexOf(Number(year)) + 1])}><ArrowRight size={16}/></button>
            </div>
            <div className="discovery-year-summary">
              <div><span className="discovery-eyebrow">YEAR SNAPSHOT</span><h3>{year}</h3><p>เกมรางวัลในชุดข้อมูลปี {year}</p></div>
              <div className="discovery-stats">
                <span><strong>{yearGames.length}</strong> เกม</span>
                <span><strong>{taste.length}</strong> กลไก TASTE</span>
                <span><strong>{newToSample}</strong> กลไก TASTE ที่ไม่พบในชุดปีก่อน</span>
              </div>
            </div>
            <div className="discovery-workspace">
              <div className="discovery-games-area">
                <div className="discovery-section-title">
                  <h3>{focused ? "เกมที่ใช้ " + focused.label : "เกมที่ได้รับรางวัล"}</h3>
                  <span>{shownGames.length} เกม</span>
                </div>
                {focused && (
                  <div className="discovery-focus">
                    <div>
                      <span className="discovery-eyebrow">MECHANIC SPOTLIGHT</span>
                      <h4>{focused.label}</h4>
                      <p>{CORE_HINTS[focused.label] || "ดูกลไกนี้ผ่านเกมตัวอย่างที่ได้รับรางวัลในปี " + year}</p>
                    </div>
                    <div className="discovery-focus-actions">
                      {relatedWizardCard(focused, filters) && (
                        <button type="button" onClick={() => onShowLab(relatedWizardCard(focused, filters).id)}>
                          <BookOpen size={15}/> เปิดการ์ด Wizard Hat <ArrowUpRight size={14}/>
                        </button>
                      )}
                      <button type="button" className="discovery-link-subtle" onClick={() => setFocus("")}>แสดงทุกเกม</button>
                    </div>
                  </div>
                )}
                <div className="discovery-game-grid">
                  {shownGames.map((game) => {
                    const lane = lanes.find((item) => item.id === game.lane);
                    return (
                      <button key={game.id} type="button" className={"discovery-game-card" + (chosenDetail?.id === game.id ? " active" : "")}
                        onClick={() => onSelectGame(game.id)} aria-label={"วิเคราะห์เกม " + game.title}>
                        <span className={"discovery-lane-label " + (lane?.tone || "")}>{lane?.label}</span>
                        <div className="discovery-game-image"><GameArt game={game}/></div>
                        <span className="discovery-game-heading">{game.title}</span>
                        <span className="discovery-game-desc">{game.magic?.action || game.tableMoment}</span>
                        <span className="discovery-game-mechanics">{game.taste.slice(0, 2).map((item) => item.name).join(" · ")}</span>
                        <span className="discovery-game-cta">ดูการวิเคราะห์ <ArrowUpRight size={15}/></span>
                      </button>
                    );
                  })}
                </div>
                {shownGames.length === 0 && <p className="discovery-empty">ไม่พบเกมที่ใช้กลไกนี้ภายใต้ตัวกรองปัจจุบัน</p>}
              </div>
              <aside className="discovery-mechanic-area">
                <div className="discovery-section-title"><h3>กลไกในปี {year}</h3><span>{yearEntries.length} รายการ</span></div>
                <p className="discovery-helper">คลิกชื่อกลไกเพื่อดูเกมที่ใช้ แล้วเข้าสู่ Wizard Hat เพื่อศึกษาเพิ่มเติม</p>
                <h4>CORE · โครงสร้างเกม</h4>
                <div className="discovery-mechanic-list">{renderMechanics(core)}</div>
                <h4>TASTE · วิธีสร้างประสบการณ์</h4>
                <div className="discovery-mechanic-list">{renderMechanics(taste)}</div>
                {(core.length > 8 || taste.length > 8) && (
                  <button type="button" className="discovery-show-more" onClick={() => setExpanded(!expanded)}>
                    {expanded ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}
                    {expanded ? "แสดงรายการย่อ" : "ดูกลไกทั้งหมด"}
                  </button>
                )}
              </aside>
            </div>
            {chosenDetail && (
              <div className="discovery-detail-block">
                <div className="discovery-section-title"><h3>วิเคราะห์เกมที่เลือก</h3><span>MAGIC Star · CORE · TASTE</span></div>
                <GameDetail game={chosenDetail}/>
              </div>
            )}
          </>
        ) : (
          <div className="discovery-trends">
            <div className="discovery-section-title">
              <h3>เปรียบเทียบกลไกในเกมรางวัลแต่ละปี</h3>
              <span>CORE + TASTE · 2015–2025</span>
            </div>
            <p>กลุ่มสีอ้างอิงจากภาพการ์ด Wizard Hat จริงใน Learning Game Atlas แต่ละช่องแสดงจำนวนเกมที่ใช้กลไกนั้นในปีที่เลือก คลิกตัวเลขเพื่อดูเกมตัวอย่างได้</p>
            {renderComparison("CORE")}
            {renderComparison("TASTE")}
            <p className="discovery-caveat"><Sparkles size={15}/> ข้อมูลนี้ครอบคลุมเฉพาะเกมผู้ชนะรางวัลในชุดข้อมูลปี 2015–2025 ไม่ใช่สถิติของอุตสาหกรรมบอร์ดเกมทั้งหมด</p>
          </div>
        )}
      </section>
    </div>
  );
}
