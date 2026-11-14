import React, { useDeferredValue, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Award,
  BookOpen,
  ChevronRight,
  CircleDot,
  ExternalLink,
  FlaskConical,
  Gamepad2,
  GalleryHorizontalEnd,
  Layers3,
  MessageCircle,
  MousePointer2,
  Puzzle,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import { awardLanes, coreMechanicFilters, games, tasteMechanicFilters, years } from "./data/games";
import { awardSource2026 } from "./data/winners2026.js";
import "./styles.css";
import TimelineExplorer from "./TimelineExplorer.jsx";
import GalleryExplorer from "./GalleryExplorer.jsx";
import "./explorer-redesign.css";


const COVER_BY_GAME = {
  "colt-express-2015": {
    "url": "https://cf.geekdo-images.com/2HKX0QANk_DY7CIVK5O5fQ__original/img/okv8rhQupsrXsEJsovQ_BJV5hKA=/0x0/filters:format(jpeg)/pic2869710.jpg",
    "source": "https://boardgamegeek.com/boardgame/158899",
    "name": "Colt Express"
  },
  "broom-service-2015": {
    "url": "https://cf.geekdo-images.com/PcxTKtTwov2vxkZZbRVDAw__original/img/kjg4hSkTE2a8MKlkZNgTGqfKqgc=/0x0/filters:format(jpeg)/pic2546156.jpg",
    "source": "https://boardgamegeek.com/boardgame/172308",
    "name": "Broom Service"
  },
  "spinderella-2015": {
    "url": "https://cf.geekdo-images.com/83b12oXwbrUmQQg0CrPuzg__original/img/2ZPsNKNjwXVMSzsckJFV8u7VoqA=/0x0/filters:format(jpeg)/pic2385041.jpg",
    "source": "https://boardgamegeek.com/boardgame/171129",
    "name": "Spinderella"
  },
  "codenames-2016": {
    "url": "https://cf.geekdo-images.com/nC6ifPCDnAItwoKSKXVrnw__original/img/Id-jjIer_61ZbvI2_RVRCeBZFY4=/0x0/filters:format(jpeg)/pic8907965.jpg",
    "source": "https://boardgamegeek.com/boardgame/178900",
    "name": "Codenames"
  },
  "isle-of-skye-2016": {
    "url": "https://cf.geekdo-images.com/GCxsnITFBO1pNXiBYkq_qA__original/img/8uoTbz4B_M1GbT4N3vGN-bhZF2Q=/0x0/filters:format(jpeg)/pic2524838.jpg",
    "source": "https://boardgamegeek.com/boardgame/176494/isle-of-skye-from-chieftain-to-king",
    "name": "Isle of Skye: From Chieftain to King"
  },
  "stone-age-junior-2016": {
    "url": "https://cf.geekdo-images.com/H1aCQoaq0H9Qt91hOgc3Sw__original/img/WFYWAb7gD96COGI6JW10XCd_vPI=/0x0/filters:format(jpeg)/pic9005688.jpg",
    "source": "https://boardgamegeek.com/boardgame/191004/my-first-stone-age",
    "name": "My First Stone Age"
  },
  "kingdomino-2017": {
    "url": "https://cf.geekdo-images.com/c0m3gwZTcfKoLI63ASio8g__original/img/HT6NQPT0cSFcZXjSewtjTO_NBAE=/0x0/filters:format(png)/pic8443569.png",
    "source": "https://boardgamegeek.com/boardgame/204583",
    "name": "Kingdomino"
  },
  "exit-2017": {
    "url": "https://cf.geekdo-images.com/r7cZVZMpP28w3-JQ-EYY7g__original/img/t--VcMKvWX2__eZYvZ7d9V13nvw=/0x0/filters:format(jpeg)/pic3332426.jpg",
    "source": "https://boardgamegeek.com/boardgame/203420/exit-the-game-the-abandoned-cabin",
    "name": "EXIT: The Game"
  },
  "icecool-2017": {
    "url": "https://cf.geekdo-images.com/xVx8ex1fjO9C7W8rRvWdVQ__original/img/rIyNSXqNgGs4Yqt0xL5CdTp9grg=/0x0/filters:format(png)/pic3320017.png",
    "source": "https://boardgamegeek.com/boardgame/177524",
    "name": "ICECOOL"
  },
  "azul-2018": {
    "url": "https://cf.geekdo-images.com/aPSHJO0d0XOpQR5X-wJonw__original/img/AkbtYVc6xXJF3c9EUrakklcclKw=/0x0/filters:format(png)/pic6973671.png",
    "source": "https://boardgamegeek.com/boardgame/230802",
    "name": "Azul"
  },
  "quacks-2018": {
    "url": "https://cf.geekdo-images.com/B1bLRWzTASZ-xx9NoAE79A__original/img/HulJk6gFzp_bxl0wzc2XEMq8NLM=/0x0/filters:format(png)/pic8780293.png",
    "source": "https://boardgamegeek.com/boardgame/244521/quacks",
    "name": "Quacks"
  },
  "funkelschatz-2018": {
    "url": "https://cf.geekdo-images.com/CNKb5AGuOvx6VlbWQEV7wQ__original/img/OV3AWRelBb93_is3fzIp6Db81o8=/0x0/filters:format(jpeg)/pic5220396.jpg",
    "source": "https://boardgamegeek.com/boardgame/235655/dragons-breath",
    "name": "Dragon's Breath"
  },
  "just-one-2019": {
    "url": "https://cf.geekdo-images.com/mHiOQYYPdSkM2xjEO3CNfA__original/img/z1F6yfBZVuLtOGw9_k7Fdv1ybTc=/0x0/filters:format(png)/pic8933221.png",
    "source": "https://boardgamegeek.com/boardgame/450619",
    "name": "Just One"
  },
  "wingspan-2019": {
    "url": "https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__original/img/cI782Zis9cT66j2MjSHKJGnFPNw=/0x0/filters:format(jpeg)/pic4458123.jpg",
    "source": "https://boardgamegeek.com/boardgame/266192",
    "name": "Wingspan"
  },
  "tal-der-wikinger-2019": {
    "url": "https://cf.geekdo-images.com/qgy9RIPh2imFaDBl8el_eg__original/img/N0rs8_rYtwQlHj-pImoPuwuxEhQ=/0x0/filters:format(jpeg)/pic4803013.jpg",
    "source": "https://boardgamegeek.com/boardgame/269526/valley-of-the-vikings",
    "name": "Valley of the Vikings"
  },
  "pictures-2020": {
    "url": "https://cf.geekdo-images.com/pR7dcr6bs5TIOHOhKIoe_A__original/img/YGaDDOA-Jtr9eS60TNUx51J36Ds=/0x0/filters:format(jpeg)/pic4946885.jpg",
    "source": "https://boardgamegeek.com/boardgame/284108",
    "name": "Pictures"
  },
  "the-crew-2020": {
    "url": "https://cf.geekdo-images.com/98LnQShydr11OBKS46xY-Q__original/img/Q-ZkgnuBu9OTBr7J3qnqPjqamAE=/0x0/filters:format(jpeg)/pic5687013.jpg",
    "source": "https://boardgamegeek.com/boardgame/284083",
    "name": "The Crew: The Quest for Planet Nine"
  },
  "speedy-roll-2020": {
    "url": "https://cf.geekdo-images.com/RZCgOQ6m2ZX_ePy-op9Svw__original/img/038LlceO23qXdIBv9CAhz7m6AGA=/0x0/filters:format(jpeg)/pic4561739.jpg",
    "source": "https://boardgamegeek.com/boardgame/259830/hedgehog-roll",
    "name": "Hedgehog Roll"
  },
  "micromacro-2021": {
    "url": "https://cf.geekdo-images.com/bLL3P-G25nIUkFjHxfJfnw__original/img/HBEhgjfb0QcF9pFrdJ8VYhBapoU=/0x0/filters:format(jpeg)/pic7632081.jpg",
    "source": "https://boardgamegeek.com/boardgame/318977",
    "name": "MicroMacro: Crime City"
  },
  "paleo-2021": {
    "url": "https://cf.geekdo-images.com/85t1wkwgvh3d2mmjsRcDrw__original/img/ejYTb1MVpf9optjLWlwbYua0TMk=/0x0/filters:format(jpeg)/pic6039256.jpg",
    "source": "https://boardgamegeek.com/boardgame/300531",
    "name": "Paleo"
  },
  "dragomino-2021": {
    "url": "https://cf.geekdo-images.com/S_Cpk3j3Z3ceNJBPNg4l7w__original/img/2g1g35Rp3u1tF_8fX3YLpmjIPj8=/0x0/filters:format(png)/pic5212561.png",
    "source": "https://boardgamegeek.com/boardgame/300010",
    "name": "Dragomino"
  },
  "cascadia-2022": {
    "url": "https://cf.geekdo-images.com/MjeJZfulbsM1DSV3DrGJYA__original/img/B374C04Eip7fmQBGJzgiOTp-jyQ=/0x0/filters:format(jpeg)/pic5100691.jpg",
    "source": "https://boardgamegeek.com/boardgame/295947",
    "name": "Cascadia"
  },
  "living-forest-2022": {
    "url": "https://cf.geekdo-images.com/fPhdfZX9UTLr4-SVgK0zoQ__original/img/ZPdxDPt1jSRQMNnVgn-qIPhNv0E=/0x0/filters:format(jpeg)/pic5899025.jpg",
    "source": "https://boardgamegeek.com/boardgame/328479",
    "name": "Living Forest"
  },
  "zauberberg-2022": {
    "url": "https://cf.geekdo-images.com/P44XaZ5uizRCH1gmodh9sg__original/img/JCDq2DfVMZnBf8xQKpaLCCNYB64=/0x0/filters:format(jpeg)/pic6348973.jpg",
    "source": "https://boardgamegeek.com/boardgame/341919/magic-mountain",
    "name": "Magic Mountain"
  },
  "dorfromantik-2023": {
    "url": "https://cf.geekdo-images.com/Nqw3SzV4JDd64lcDgytPEg__original/img/CK6xh0d01jIC7WOIGALHZCDli34=/0x0/filters:format(jpeg)/pic7227691.jpg",
    "source": "https://boardgamegeek.com/boardgame/370591",
    "name": "Dorfromantik: The Board Game"
  },
  "challengers-2023": {
    "url": "https://cf.geekdo-images.com/GtLESZ4ZjqikK12bjBTmig__original/img/CHUtcmSXFs8LYKRHyUaeio2ra4U=/0x0/filters:format(jpeg)/pic7040521.jpg",
    "source": "https://boardgamegeek.com/boardgame/359970",
    "name": "Challengers!"
  },
  "mysterium-kids-2023": {
    "url": "https://cf.geekdo-images.com/3PLNZOg5ZEVf9u121faEbw__original/img/J_D8TkWJfM4xFoWdoEmKKpXANck=/0x0/filters:format(jpeg)/pic7075722.jpg",
    "source": "https://boardgamegeek.com/boardgame/367206/mysterium-kids-captain-echos-treasure",
    "name": "Mysterium Kids: Captain Echo's Treasure"
  },
  "sky-team-2024": {
    "url": "https://cf.geekdo-images.com/uXMeQzNenHb3zK7Hoa6b2w__original/img/mWOQnkpyYBorh_Y1-0Y2o-ew17k=/0x0/filters:format(jpeg)/pic7398904.jpg",
    "source": "https://boardgamegeek.com/boardgame/373106",
    "name": "Sky Team"
  },
  "daybreak-2024": {
    "url": "https://cf.geekdo-images.com/YU8rm_FMnKHS2GPDFvLb6g__original/img/6umYavtw4Iw41gTtBZhNS7LrKIA=/0x0/filters:format(png)/pic7068528.png",
    "source": "https://boardgamegeek.com/boardgame/334986",
    "name": "Daybreak"
  },
  "magic-keys-2024": {
    "url": "https://cf.geekdo-images.com/du6vq9YnLlsIqv2Zh4yXFQ__original/img/j0ml7S2hQl24qXO4BzTmZ0KJhTM=/0x0/filters:format(png)/pic8256181.png",
    "source": "https://boardgamegeek.com/boardgame/368899/magic-keys",
    "name": "Magic Keys"
  },
  "bomb-busters-2025": {
    "url": "https://cf.geekdo-images.com/HpGXIlt5i6T-0jbiQRReOg__original/img/2uApg8IOYjNVSzbUIwJUa-Z8eL8=/0x0/filters:format(png)/pic8303080.png",
    "source": "https://boardgamegeek.com/boardgame/413246",
    "name": "Bomb Busters"
  },
  "deep-sea-2025": {
    "url": "https://cf.geekdo-images.com/wIbevITv9W79ELP8rEZoKA__original/img/41fYEG_IYb9ECcCO24Dk4dZUNT0=/0x0/filters:format(jpeg)/pic6996584.jpg",
    "source": "https://boardgamegeek.com/boardgame/367966",
    "name": "Endeavor: Deep Sea"
  },
  "topp-die-torte-2025": {
    "url": "https://cf.geekdo-images.com/dIHh1q19kHUJnAeCdANNvg__original/img/xZXK_v1K-RnaCSxeo7-jaj_d7vg=/0x0/filters:format(jpeg)/pic9482179.jpg",
    "source": "https://boardgamegeek.com/boardgame/423232/cherry-on-the-cake",
    "name": "Cherry on the Cake"
  }
};

const defaultGameId = "dito-2026";
const wizardHatUrl = "https://wizardsoflearning.com/wizards-hat-board-game-design-tools/";
const assetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const modules = [
  { id: "explore", title: "Timeline", shortTitle: "Timeline", status: "Active", icon: Award, text: "Explore winners and mechanics year by year." },
  { id: "gallery", title: "Game Gallery", shortTitle: "Gallery", status: "New", icon: GalleryHorizontalEnd, text: "Discover award-winning games." },
  { id: "lab", title: "Mechanic Library", shortTitle: "Mechanics", status: "Beta", icon: FlaskConical, text: "Understand mechanics through real award-winning games." },
  { id: "challenge", title: "Design Challenge", shortTitle: "Challenge", status: "Next", icon: Gamepad2, text: "Turn a winner pattern into a new design prompt." },
];

const MECHANIC_DESCRIPTIONS = {
  "co-operation": "ผู้เล่นทำงานร่วมกันเพื่อให้บรรลุเป้าหมายของเกม",
  "competitive": "ผู้เล่นแข่งขันเพื่อให้ได้คะแนนหรือผลลัพธ์เหนือกว่าคนอื่น",
  "fixed-turn-order": "ผู้เล่นผลัดกันเล่นตามลำดับคงที่",
  "simultaneous-action-selection": "ทุกคนเลือกสิ่งที่จะทำก่อนเปิดเผยผลพร้อมกัน",
  "dynamic-order": "ลำดับการเล่นเปลี่ยนได้ตามเงื่อนไขหรือการตัดสินใจ",
  "mission-success": "ผู้เล่นต้องทำภารกิจตามเป้าหมายให้สำเร็จ",
  "victory-points": "เกมใช้คะแนนสะสมเพื่อกำหนดผู้ชนะ",
  "fixed-number-rounds": "เกมสิ้นสุดเมื่อครบจำนวนรอบที่กำหนด",
  "completing-targets": "เกมสิ้นสุดเมื่อมีการทำเป้าหมายครบตามเงื่อนไข",
  "exhausting-resources": "เกมสิ้นสุดเมื่อทรัพยากรที่กำหนดหมดลง",
  "communication-limits": "สร้างความท้าทายด้วยข้อจำกัดในการส่งข้อมูลระหว่างผู้เล่น",
  "tile-laying": "นำชิ้นส่วนมาวางต่อกันเพื่อสร้างพื้นที่ รูปแบบ หรือการให้คะแนน",
  "deduction": "ใช้หลักฐานที่มีเพื่ออนุมานข้อมูลที่ยังไม่รู้",
  "dexterity": "นำทักษะการเคลื่อนไหวและการควบคุมอุปกรณ์มาเป็นส่วนหนึ่งของเกม",
  "push-your-luck": "เลือกระหว่างหยุดเพื่อรักษาผลตอบแทน หรือเสี่ยงต่อเพื่อได้มากขึ้น",
  "engine-building": "สร้างระบบความสามารถที่ส่งผลต่อเนื่องและแข็งแกร่งขึ้นในแต่ละรอบ",
  "drafting": "เลือกการ์ดหรือทรัพยากรจากตัวเลือกที่มีจำกัด",
  "set-collection": "สะสมชุดสิ่งของหรือการ์ดเพื่อรับคะแนนหรือผลประโยชน์",
  "targeted-clues": "ให้คำใบ้ที่มีความหมายเพื่อช่วยให้ผู้อื่นตีความเป้าหมาย",
  "output-randomness": "ความไม่แน่นอนเกิดขึ้นหลังผู้เล่นเลือกการกระทำ",
  "hand-management": "จัดลำดับว่าจะใช้หรือเก็บการ์ดในมือเพื่อจังหวะที่เหมาะสม",
  "worker-placement": "วางตัวแทนของผู้เล่นลงบนช่องการกระทำเพื่อรับผลต่าง ๆ",
};

function App() {
  const [activeModule, setActiveModule] = useState("explore");
  const [selectedGameId, setSelectedGameId] = useState(defaultGameId);
  const [selectedLane, setSelectedLane] = useState("all");
  const [selectedMechanic, setSelectedMechanic] = useState("all");
  const [mechanicSort, setMechanicSort] = useState("frequent");
  const [selectedYear, setSelectedYear] = useState("all");
  const [timelineYear, setTimelineYear] = useState(years[years.length - 1]);
  const [query, setQuery] = useState("");
  const [labGameId, setLabGameId] = useState("");
  const deferredQuery = useDeferredValue(query);
  const allMechanicFilters = [...coreMechanicFilters, ...tasteMechanicFilters];
  const selectedGame = games.find((game) => game.id === selectedGameId) ?? games[0];
  const selectedFilter = allMechanicFilters.find((filter) => filter.id === selectedMechanic);

  const visibleGames = games.filter((game) => {
    const matchesLane = selectedLane === "all" || game.lane === selectedLane;
    const matchesYear = selectedYear === "all" || game.year === Number(selectedYear);
    const matchesMechanic = selectedMechanic === "all" || gameMatchesMechanic(game, selectedFilter);
    const searchText = [
      game.title, game.year, game.verb, game.tableMoment,
      game.magic?.mood, game.magic?.action, game.lesson,
      game.core.conflict, game.core.order, game.core.win, game.core.end,
      game.taste.map((taste) => taste.name).join(" "),
    ].join(" ").toLowerCase();
    return matchesLane && matchesYear && matchesMechanic && searchText.includes(deferredQuery.trim().toLowerCase());
  });

  const countedCoreFilters = sortMechanics(coreMechanicFilters.map((filter) => ({
    ...filter, count: games.filter((game) => gameMatchesMechanic(game, filter)).length,
  })), mechanicSort);
  const countedTasteFilters = sortMechanics(tasteMechanicFilters.map((filter) => ({
    ...filter, count: games.filter((game) => gameMatchesMechanic(game, filter)).length,
  })), mechanicSort);

  const labGames = games.filter((game) => selectedMechanic === "all" || gameMatchesMechanic(game, selectedFilter));
  const labSelectedGame = labGames.find((game) => game.id === labGameId);

  function selectGame(gameId, nextModule = activeModule) {
    setSelectedGameId(gameId);
    setActiveModule(nextModule);
  }

  function openMechanic(cardId) {
    setSelectedMechanic(cardId);
    setLabGameId("");
    setActiveModule("lab");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app-shell redesigned-explorer">
      <main className="workspace">
        <SiteHeader activeModule={activeModule} onModuleChange={(module) => {
          setActiveModule(module);
          setLabGameId("");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}/>
        {activeModule === "explore" && (
          <TimelineExplorer
            games={games} years={years} lanes={awardLanes} filters={allMechanicFilters}
            year={timelineYear} onYearChange={setTimelineYear}
            selectedLane={selectedLane} onLaneChange={setSelectedLane}
            selectedGame={selectedGame} onSelectGame={(id) => selectGame(id, "explore")}
            onShowLab={openMechanic} GameArt={GameBoxArt} GameDetail={GameDetail}
          />
        )}
        {activeModule === "gallery" && (
          <GalleryExplorer
            visibleGames={visibleGames} years={years} lanes={awardLanes} filters={allMechanicFilters}
            query={query} onQueryChange={setQuery}
            selectedYear={selectedYear} onYearChange={setSelectedYear}
            selectedLane={selectedLane} onLaneChange={setSelectedLane}
            selectedMechanic={selectedMechanic} onSelectMechanic={setSelectedMechanic}
            selectedGame={selectedGame} onSelectGame={(id) => selectGame(id, "gallery")}
            onOpenLab={() => setActiveModule("lab")}
            GameArt={GameBoxArt} GameDetail={GameDetail}
          />
        )}
        {activeModule === "lab" && (
          <>
            <LabView
              selectedMechanic={selectedMechanic} mechanicSort={mechanicSort}
              countedCoreFilters={countedCoreFilters} countedTasteFilters={countedTasteFilters}
              onSelectMechanic={(id) => { setSelectedMechanic(id); setLabGameId(""); }}
              onSortChange={setMechanicSort}
            />
            <section className="discovery-panel discovery-lab-results" aria-live="polite">
              <span className="discovery-eyebrow">LEARN FROM REAL GAMES</span>
              <h2>{selectedFilter ? selectedFilter.shortLabel || selectedFilter.label : "ตัวอย่างกลไกจากเกมรางวัล"}</h2>
              <p>{selectedFilter
                ? MECHANIC_DESCRIPTIONS[selectedFilter.id] || "สำรวจว่าเกมรางวัลต่าง ๆ นำกลไกนี้ไปสร้างประสบการณ์อย่างไร"
                : "เลือกการ์ด Wizard Hat ด้านบนเพื่อดูความหมายและตัวอย่างเกมที่ใช้กลไกนั้น"}</p>
              <div className="discovery-lab-game-grid">
                {labGames.map((game) => (
                  <button type="button" key={game.id} onClick={() => setLabGameId(game.id)}
                    className={labSelectedGame?.id === game.id ? "active" : ""}>
                    <GameBoxArt game={game} compact/>
                    <span><strong>{game.title}</strong><small>{game.year} · {game.tableMoment}</small></span>
                    <ChevronRight size={16}/>
                  </button>
                ))}
              </div>
              {labSelectedGame && <div className="discovery-lab-detail"><GameDetail game={labSelectedGame}/></div>}
            </section>
          </>
        )}
        {activeModule === "challenge" && <ChallengeView game={selectedGame} onModuleChange={setActiveModule}/>}
        <SourceFooter/>
      </main>
    </div>
  );
}

function SiteHeader({ activeModule, onModuleChange }) {
  return (
    <nav className="site-header" aria-label="Playground navigation">
      <button className="site-brand" type="button" onClick={() => onModuleChange("explore")}>
        <img src={assetPath("brand/wol-logo.png")} alt="Wizards of Learning" />
        <div>
          <span>Wizards of Learning</span>
          <strong>Game Design Lab</strong>
        </div>
      </button>
      <div className="site-links">
        {modules.map((module) => (
          <button key={module.id} className={activeModule === module.id ? "active" : ""} type="button" onClick={() => onModuleChange(module.id)}>
            {module.shortTitle}
          </button>
        ))}
        <a href={wizardHatUrl} target="_blank" rel="noreferrer">
          Wizard Hat <ExternalLink size={14} />
        </a>
      </div>
    </nav>
  );
}

function Hero({ query, selectedYear, onQueryChange, onYearChange, onModuleChange }) {
  return (
    <header className="hero-section">
      <div className="hero-copy">
        <span className="hero-mark">Spiel des Jahres x Wizard Hat</span>
        <h1>อ่านเกมรางวัลโลก แล้วต่อยอดเป็นไอเดียเกมของเรา</h1>
        <p>
          Interactive explorer สำหรับดู pattern ของเกมที่ชนะ Spiel, Kenner และ Kinder ผ่าน MAGIC Star, CORE/TASTE และการ์ด Wizard Hat.
        </p>
        <div className="hero-actions">
          <button type="button" onClick={() => onModuleChange("gallery")}>
            ดูกล่องเกมทั้งหมด
          </button>
          <a href={wizardHatUrl} target="_blank" rel="noreferrer">
            ไปหน้า Wizard Hat <ExternalLink size={16} />
          </a>
        </div>
      </div>
      <HeroVisual />
      <div className="topbar-actions">
        <div className="search-box">
          <Search size={16} />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search game, mechanic, moment"
            aria-label="Search games"
          />
        </div>
        <select value={selectedYear} onChange={(event) => onYearChange(event.target.value)} aria-label="Filter by year">
          <option value="all">All years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="hero-card hero-card-left">
        <img src={assetPath("wizard-cards/card-027.png")} alt="" />
      </div>
      <div className="hero-card hero-card-main">
        <img src={assetPath("wizard-cards/card-087.png")} alt="" />
      </div>
      <div className="hero-card hero-card-right">
        <img src={assetPath("wizard-cards/card-041.png")} alt="" />
      </div>
      <span className="hero-token core-token">CORE</span>
      <span className="hero-token taste-token">TASTE</span>
    </div>
  );
}

function ModuleStrip({ activeModule, onModuleChange }) {
  return (
    <section className="mode-strip" aria-label="Playground modules">
      {modules.map((module) => (
        <ModeCard key={module.id} module={module} active={activeModule === module.id} onClick={() => onModuleChange(module.id)} />
      ))}
    </section>
  );
}

function ModeCard({ module, active, onClick }) {
  const Icon = module.icon;
  return (
    <button className={`mode-card ${active ? "active" : ""}`} type="button" onClick={onClick}>
      <div className="mode-icon">
        <Icon size={20} />
      </div>
      <div>
        <div className="mode-title">
          <h3>{module.title}</h3>
          <span>{module.status}</span>
        </div>
        <p>{module.text}</p>
      </div>
    </button>
  );
}

function FilterBar({ selectedLane, selectedFilter, visibleCount, onLaneChange }) {
  return (
    <section className="control-band">
      <div className="segment-group" aria-label="Award category">
        <button className={selectedLane === "all" ? "selected" : ""} type="button" onClick={() => onLaneChange("all")}>
          All awards
        </button>
        {awardLanes.map((lane) => (
          <button key={lane.id} className={selectedLane === lane.id ? "selected" : ""} type="button" onClick={() => onLaneChange(lane.id)}>
            {lane.label}
          </button>
        ))}
      </div>
      <div className="result-meter">
        <Sparkles size={16} />
        <span>{visibleCount} games in view</span>
        {selectedFilter && <strong>{selectedFilter.label}</strong>}
      </div>
    </section>
  );
}

function ExplorerView({ visibleGames, selectedGame, selectedGameId, onSelectGame, onReset }) {
  return (
    <div className="main-grid" id="explore">
      <section className="explorer-panel" aria-label="Award timeline">
        <div className="section-heading">
          <div>
            <h2>{years[0]}–{years.at(-1)} Winner Timeline</h2>
            <p>Three award lanes, one shared mechanic vocabulary.</p>
          </div>
          <button className="ghost-button" type="button" onClick={onReset}>
            Reset view
          </button>
        </div>
        <div className="timeline-frame">
          <Timeline visibleGames={visibleGames} selectedGameId={selectedGameId} onSelectGame={onSelectGame} />
        </div>
      </section>
      <GameDetail game={selectedGame} />
    </div>
  );
}

function Timeline({ visibleGames, selectedGameId, onSelectGame }) {
  return (
    <div className="timeline" style={{ "--year-count": years.length }}>
      <div className="year-row" aria-hidden="true">
        <span />
        {years.map((year) => (
          <strong key={year}>{year}</strong>
        ))}
      </div>
      {awardLanes.map((lane) => (
        <div key={lane.id} className="lane-row">
          <div className={`lane-label ${lane.tone}`}>
            <span>{lane.label}</span>
            <small>{lane.fullName}</small>
          </div>
          {years.map((year) => {
            const game = visibleGames.find((item) => item.year === year && item.lane === lane.id);
            return game ? (
              <button
                key={game.id}
                className={`game-tile ${lane.tone} ${selectedGameId === game.id ? "selected" : ""}`}
                type="button"
                onClick={() => onSelectGame(game.id)}
              >
                <GameBoxArt game={game} compact />
                <span>{game.title}</span>
                <em>{game.verb}</em>
              </button>
            ) : (
              <div key={`${lane.id}-${year}`} className="empty-tile" />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function GalleryView({ visibleGames, selectedGame, selectedGameId, onSelectGame, onReset }) {
  return (
    <div className="gallery-layout" id="gallery">
      <section className="gallery-panel" aria-label="Award game box gallery">
        <div className="section-heading">
          <div>
            <h2>Game Box Gallery</h2>
            <p>หน้ารวมกล่องเกมรางวัลทุกเกม ใช้ดูภาพรวมก่อนเข้า pattern analysis.</p>
          </div>
          <button className="ghost-button" type="button" onClick={onReset}>
            Reset view
          </button>
        </div>
        <div className="box-gallery-grid">
          {visibleGames.map((game) => (
            <button
              key={game.id}
              className={`box-gallery-card ${selectedGameId === game.id ? "selected" : ""}`}
              type="button"
              onClick={() => onSelectGame(game.id)}
            >
              <AwardBadge game={game} />
              <GameBoxArt game={game} />
              <div className="box-gallery-copy">
                <span>{game.year}</span>
                <strong>{game.title}</strong>
                <em>{game.tableMoment}</em>
              </div>
              <CoverStatus game={game} />
            </button>
          ))}
        </div>
      </section>
      <GameDetail game={selectedGame} />
    </div>
  );
}

function GameBoxArt({ game, compact = false }) {
  const [failedUrl, setFailedUrl] = useState(null);
  const cover = COVER_BY_GAME[game.id];
  if (cover && failedUrl !== cover.url) {
    return (
      <div className={`game-box-art ${compact ? "compact" : ""}`} style={{ background: "#fff", display: "block", height: compact ? 42 : 220 }}>
        <img src={cover.url} alt={`หน้ากล่องเกม ${game.title}`} loading="lazy" onError={() => setFailedUrl(cover.url)} style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
    );
  }
  const Icon = getVerbIcon(game);
  if (compact) {
    return (
      <div className={`game-box-art compact lane-${game.lane}`}>
        <Icon size={17} />
      </div>
    );
  }
  const lane = awardLanes.find((l) => l.id === game.lane);
  return (
    <div className={`game-box-art cover-plate lane-${game.lane}`}>
      <div className="cover-plate-top">
        <span className="cover-plate-award">{lane?.label}</span>
        <Icon size={22} />
      </div>
      <strong className="cover-plate-title">{game.title}</strong>
      <span className="cover-plate-meta">{game.year} · {game.verb}</span>
    </div>
  );
}

function AwardBadge({ game }) {
  const lane = awardLanes.find((item) => item.id === game.lane);
  return (
    <span className={`award-badge ${lane?.tone ?? ""}`}>
      {lane?.label} {game.year}
    </span>
  );
}

function CoverStatus({ game }) {
  return (
    <a
      className="cover-status review"
      href={COVER_BY_GAME[game.id]?.source ?? game.coverSourceUrl}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      ดูบน BGG ↗
    </a>
  );
}

function getVerbIcon(game) {
  if (["clue", "sound", "represent"].includes(game.verb)) return MessageCircle;
  if (["solve", "deduce", "investigate"].includes(game.verb)) return Puzzle;
  if (["survive", "mitigate"].includes(game.verb)) return ShieldCheck;
  if (["risk", "predict"].includes(game.verb)) return CircleDot;
  if (["flick", "roll", "move", "guide", "stack"].includes(game.verb)) return MousePointer2;
  return Sparkles;
}

function GameDetail({ game }) {
  const lane = awardLanes.find((item) => item.id === game.lane);

  return (
    <aside className="detail-panel" aria-label={`${game.title} detail`}>
      <div className={`detail-ribbon ${lane?.tone ?? "teal"}`}>
        <span>{game.year}</span>
        <strong>{lane?.fullName}</strong>
      </div>
      <GameBoxArt game={game} />
      <div className="detail-title">
        <div>
          <h2>{game.title}</h2>
          {!game.evidence && <p>{game.lesson}</p>}
        </div>
        <ChevronRight size={20} />
      </div>

      <InfoBlock icon={<BookOpen size={18} />} title="สถานะหลักฐาน">
        <p>{game.evidence
          ? "ตรวจจากคู่มือผู้จัดพิมพ์ · ระบุฉบับและหัวข้อให้ตรวจย้อนกลับได้"
          : "บทวิเคราะห์เดิม · หน้านี้ยังไม่มีการอ้างคู่มือเฉพาะเกมประกอบข้อสรุป"}</p>
      </InfoBlock>

      {game.evidence ? (
        <>
          <InfoBlock icon={<Layers3 size={18} />} title="กติกาที่ตรวจได้">
            <p>{game.evidence.designer} · {game.evidence.players}</p>
            <p>ฉบับที่ใช้อ้างอิง: {game.evidence.edition}</p>
            <p>{game.evidence.rules}</p>
            <p><a href={awardSource2026} target="_blank" rel="noreferrer">ประกาศผลรางวัลทางการ</a></p>
            <p><a href={game.evidence.rulesUrl} target="_blank" rel="noreferrer">คู่มือกติกา: {game.evidence.sections}</a></p>
          </InfoBlock>
          <InfoBlock icon={<Sparkles size={18} />} title="บทวิเคราะห์การออกแบบโดย WoL">
            <p>{game.lesson}</p>
            <p>{game.evidence.reasoning}</p>
            <p><small>อ่านจากกติกา · ยังไม่มีบันทึกทดลองเล่นสำหรับบทวิเคราะห์นี้ ส่วน MAGIC Star, CORE, TASTE และ Table Moment ด้านล่างเป็นการตีความของ WoL</small></p>
          </InfoBlock>
        </>
      ) : (
      <InfoBlock icon={<Sparkles size={18} />} title="สมมติฐานของ WoL: จังหวะไหนที่น่าลองเล่น">
        <p>
          สิ่งที่ผู้เล่นทำซ้ำ: <strong>{game.verb}</strong> · จังหวะบนโต๊ะที่น่าสังเกต: <strong>{game.tableMoment}</strong>
        </p>
      </InfoBlock>

      )}

      <InfoBlock icon={<Layers3 size={18} />} title="MAGIC Star">
        <div className="magic-grid">
          <MagicFacet label="Mood" value={game.magic.mood} />
          <MagicFacet label="Action" value={game.magic.action} />
          <MagicFacet label="Goal" value={game.magic.goal} />
          <MagicFacet label="Impediment" value={game.magic.impediment} />
          <MagicFacet label="Character" value={game.magic.character} />
        </div>
      </InfoBlock>

      <InfoBlock icon={<Trophy size={18} />} title="Wizard Hat CORE">
        <div className="core-grid">
          <CoreChip label="Conflict" value={game.core.conflict} />
          <CoreChip label="Order" value={game.core.order} />
          <CoreChip label="Win" value={game.core.win} />
          <CoreChip label="End" value={game.core.end} />
        </div>
      </InfoBlock>

      <InfoBlock icon={<Sparkles size={18} />} title="TASTE">
        <div className="taste-list">
          {game.taste.map((taste) => (
            <span key={`${game.id}-${taste.name}`}>
              {taste.name} <em>({taste.category})</em>
            </span>
          ))}
        </div>
      </InfoBlock>

      <div className="moment-card">
        <span>Table Moment</span>
        <strong>{game.tableMoment}</strong>
        <p>{game.replayEngine}</p>
      </div>

      {!game.evidence && <div className="source-card">
        <span>Cover source</span>
        {(COVER_BY_GAME[game.id]?.source || game.coverSourceUrl) ? (
          <a href={COVER_BY_GAME[game.id]?.source ?? game.coverSourceUrl} target="_blank" rel="noreferrer">
            {game.id === "just-one-2019" ? "BGG · ภาพฉบับใหม่ 2025" : game.id === "exit-2017" ? "BGG · ภาพตัวอย่างจากชุด EXIT" : "BGG · ภาพตัวอย่าง"} <ExternalLink size={14} />
          </a>
        ) : (
          <p>ยังไม่มีแหล่งรูปที่ตรวจสอบได้</p>
        )}
        <CoverStatus game={game} />
      </div>}
    </aside>
  );
}

function InfoBlock({ icon, title, children }) {
  return (
    <section className="info-block">
      <div className="info-title">
        {icon}
        <h3>{title}</h3>
      </div>
      {children}
    </section>
  );
}

function MagicFacet({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <p>{value}</p>
    </div>
  );
}

function CoreChip({ label, value }) {
  return (
    <div className="core-chip">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function LabView({ selectedMechanic, mechanicSort, countedCoreFilters, countedTasteFilters, onSelectMechanic, onSortChange }) {
  return (
    <section className="mechanic-map full-map" id="lab" aria-label="Wizard Hat mechanic filters">
      <MechanicMapHeader mechanicSort={mechanicSort} onSortChange={onSortChange} />
      <button className={`all-patterns ${selectedMechanic === "all" ? "active" : ""}`} type="button" onClick={() => onSelectMechanic("all")}>
        <Sparkles size={18} />
        <span>All patterns</span>
        <strong>{games.length}</strong>
      </button>
      <MechanicSection title="CORE" description="Conflict, Order, Win Condition, and End Trigger" filters={countedCoreFilters} selectedMechanic={selectedMechanic} onSelect={onSelectMechanic} />
      <MechanicSection title="TASTE" description="Mechanic flavors that shape the feel of play" filters={countedTasteFilters} selectedMechanic={selectedMechanic} onSelect={onSelectMechanic} />
    </section>
  );
}

function PatternPreview({ selectedMechanic, mechanicSort, countedCoreFilters, countedTasteFilters, onSelectMechanic, onSortChange, onOpenLab }) {
  return (
    <section className="mechanic-map pattern-preview" aria-label="Wizard Hat mechanic preview">
      <MechanicMapHeader mechanicSort={mechanicSort} onSortChange={onSortChange} compact />
      <button className="ghost-button open-lab" type="button" onClick={onOpenLab}>
        Open full Wizard Hat Lab
      </button>
      <MechanicSection title="CORE" description="Most common CORE cards in award winners" filters={countedCoreFilters.slice(0, 6)} selectedMechanic={selectedMechanic} onSelect={onSelectMechanic} />
      <MechanicSection title="TASTE" description="Most common TASTE cards in award winners" filters={countedTasteFilters.slice(0, 6)} selectedMechanic={selectedMechanic} onSelect={onSelectMechanic} />
    </section>
  );
}

function MechanicMapHeader({ mechanicSort, onSortChange, compact = false }) {
  return (
    <div className={`section-heading ${compact ? "compact" : ""}`}>
      <div>
        <h2>Wizard Hat Pattern Map</h2>
        <p>ใช้ภาพการ์ด Wizard Hat เป็น filter และเรียงจาก pattern ที่พบบ่อยในเกมรางวัล.</p>
      </div>
      <div className="sort-control">
        <span>Sort</span>
        <select value={mechanicSort} onChange={(event) => onSortChange(event.target.value)} aria-label="Sort mechanics">
          <option value="frequent">Most frequent</option>
          <option value="name">A-Z</option>
        </select>
      </div>
    </div>
  );
}

function MechanicSection({ title, description, filters, selectedMechanic, onSelect }) {
  return (
    <section className="mechanic-section">
      <div className="mechanic-section-title">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
      <div className="filter-grid card-image-grid">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`mechanic-image-card ${filter.color} ${selectedMechanic === filter.id ? "active" : ""}`}
            type="button"
            onClick={() => onSelect(filter.id)}
          >
            <div className="card-thumb">
              {filter.card ? <img src={assetPath(`wizard-cards/${filter.card}`)} alt="" loading="lazy" /> : <span className="card-image-unmapped" aria-label="กลุ่มวิเคราะห์ ไม่ใช่การ์ด Wizard Hat โดยตรง"><Puzzle size={28} /><small>Analysis group</small></span>}
            </div>
            <div className="mechanic-card-copy">
              <span>{filter.shortLabel ?? filter.label}</span>
              <em>{filter.category}</em>
            </div>
            <strong>{filter.count}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}

function ChallengeView({ game, onModuleChange }) {
  return (
    <section className="challenge-panel" id="challenge">
      <div className="challenge-copy">
        <span>Design Challenge</span>
        <h2>ลองออกแบบเกมใหม่จาก pattern ของ {game.title}</h2>
        <p>
          ใช้เกมรางวัลเป็น benchmark: เริ่มจาก “ทำไมคนถึงอยากเล่น” แล้วแยก MAGIC Star ออกจาก Wizard Hat CORE/TASTE.
        </p>
      </div>
      <div className="challenge-steps">
        <ChallengeStep number="1" title="Pick the promise" text={`Table Moment: ${game.tableMoment}. ผู้เล่นอยากกลับมาเพราะจังหวะนี้เกิดซ้ำได้.`} />
        <ChallengeStep number="2" title="Keep one CORE spine" text={`${game.core.conflict} / ${game.core.order} / ${game.core.win} / ${game.core.end}`} />
        <ChallengeStep number="3" title="Change one TASTE" text={`ลองเปลี่ยน ${game.taste[0]?.name ?? "main taste"} แล้วดูว่า MAGIC Star ยังสอดคล้องอยู่ไหม.`} />
      </div>
      <button type="button" onClick={() => onModuleChange("lab")}>
        เปิด Wizard Hat Lab เพื่อเลือก card
      </button>
    </section>
  );
}

function ChallengeStep({ number, title, text }) {
  return (
    <article>
      <span>{number}</span>
      <strong>{title}</strong>
      <p>{text}</p>
    </article>
  );
}

function SourceFooter() {
  return (
    <footer className="source-footer">
      <div>
        <BookOpen size={18} />
        <p>
          WoL วิเคราะห์เกมผู้ชนะสามสาขา ช่วง {years[0]}–{years.at(-1)} เพื่อเป็นตัวอย่างสำหรับนักออกแบบ ป้าย CORE/TASTE และ MAGIC Star เป็นการจัดหมวดของ WoL ส่วนความถี่ใช้เปรียบเทียบเฉพาะเกมในคลังนี้
        </p>
      </div>
      <a href={wizardHatUrl} target="_blank" rel="noreferrer">
        Continue with Wizard Hat <ExternalLink size={14} />
      </a>
      <details>
        <summary>บันทึกการปรับปรุงข้อมูล</summary>
        <p><time dateTime="2026-11-14">14 พ.ย. 2026</time> — เพิ่มเกมผู้ชนะปี 2026 ทั้งสามสาขา พร้อมคู่มือและฉบับที่ใช้อ้างอิง และระบุสถานะหลักฐานของบทวิเคราะห์ปีก่อน</p>
      </details>
    </footer>
  );
}

function gameMatchesMechanic(game, filter) {
  if (!filter) return true;
  if (filter.coreField) {
    return String(game.core[filter.coreField] ?? "").includes(filter.match);
  }
  if (filter.tasteName) {
    return game.taste.some((taste) => taste.name === filter.tasteName || taste.name.includes(filter.tasteName));
  }
  return game.tags.includes(filter.id);
}

function sortMechanics(filters, sortMode) {
  return [...filters].sort((a, b) => {
    if (sortMode === "name") return (a.shortLabel ?? a.label).localeCompare(b.shortLabel ?? b.label);
    return b.count - a.count || (a.shortLabel ?? a.label).localeCompare(b.shortLabel ?? b.label);
  });
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


