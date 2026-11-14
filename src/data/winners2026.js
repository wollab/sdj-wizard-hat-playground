export const awardSource2026 = "https://www.spiel-des-jahres.de/preistraeger2026/";

export const winners2026 = [
  {
    id: "dito-2026", year: 2026, lane: "spiel", title: "Dito!",
    verb: "match", tableMoment: "ลุ้นว่าใครเขียนคำเดียวกัน",
    replayEngine: "หมวดคำและคนที่นั่งร่วมโต๊ะเปลี่ยนคำตอบที่น่าจะตรงกัน",
    core: { conflict: "Competitive", order: "Simultaneous Action Selection", win: "Victory Points", end: "Fixed Number of Rounds" },
    taste: [{ name: "Hidden Information", category: "Twist" }],
    magic: { mood: "ลุ้นและขำเมื่อคิดตรงกัน", action: "เขียนคำตอบลับ แล้วผลัดกันเปิดคำ", goal: "ทำคะแนนจากคำตรงกันและโบนัสแถวหรือคอลัมน์", impediment: "ไม่เห็นคำตอบของคนอื่นก่อนเปิด", character: "ผู้ร่วมวงตอบคำ" },
    lesson: "ให้คะแนนจากคำที่คิดตรงกัน แล้วเพิ่มโบนัสตามตำแหน่งคำ เพื่อให้ผู้เล่นต้องคิดทั้งว่าจะเขียนอะไรและจะวางไว้ตรงไหน",
    tags: ["word association", "answer matching", "hidden information"],
    evidence: {
      designer: "Martin Ang", edition: "Game Factory · กติกาภาษาเยอรมัน", players: "3–7 คน · อายุ 10+",
      rulesUrl: "https://gf-api.gamefactory-games.com/spielanleitungen/646031_de.pdf", sections: "หน้า 2–4: ลำดับเล่น การคิดคะแนน และจบเกม",
      rules: "แต่ละหมวดให้ทุกคนเขียนสามคำตอบแบบไม่ให้คนอื่นเห็น จากนั้นผลัดกันเลือกคำเดิมมาอ่าน คำที่ตรงกันให้คะแนนและอาจได้โบนัสจากตำแหน่งในตาราง เล่นสามรอบ คะแนนรวมสูงสุดชนะ",
      reasoning: "Order อ้างถึงช่วงเขียนคำตอบพร้อมกัน ส่วนช่วงเปิดคำผลัดกันเล่น ป้าย Hidden Information หมายถึงคำตอบที่ยังไม่เปิด ไม่ได้หมายความว่าเกมเป็นปริศนาหักล้างด้วยตรรกะ",
    },
  },
  {
    id: "rebirth-2026", year: 2026, lane: "kenner", title: "Rebirth",
    verb: "place", tableMoment: "เลือกขยายกลุ่มหรือแย่งพื้นที่รอบปราสาท",
    replayEngine: "ลำดับแผ่นที่จั่วและพื้นที่ที่ผู้เล่นอื่นยึดไปเปลี่ยนจุดลงที่คุ้มค่า",
    core: { conflict: "Competitive", order: "Fixed Turn Order", win: "Victory Points", end: "Exhausting Resources" },
    taste: [{ name: "Tile Laying, Pattern Building, Jigsaw", category: "Touch" }, { name: "Area Majority", category: "Strategy" }],
    magic: { mood: "ชั่งใจและจับจังหวะ", action: "ลงแผ่นหนึ่งแผ่นในช่องที่ถูกกติกา คิดคะแนน แล้วจั่วแผ่นถัดไป", goal: "มีคะแนนสูงสุดเมื่อทุกคนลงแผ่นหมด", impediment: "ชนิดแผ่นที่ถือและช่องว่างจำกัดทางเลือก", character: "ผู้นำตระกูลที่ร่วมฟื้นฟูดินแดน" },
    lesson: "ลดตัวเลือกในมือเหลือแผ่นเดียว แต่ให้ตำแหน่งเดียวส่งผลต่อระบบคะแนนหลายแบบ การตัดสินใจจึงอยู่ที่ว่าจะลงตรงไหน",
    tags: ["tile-laying", "area majority", "spatial planning"],
    evidence: {
      designer: "Reiner Knizia", edition: "Mighty Boards · แผนที่ Scotland", players: "2–4 คน · อายุ 10+",
      rulesUrl: "https://mighty-boards.com/images/user_files/37/rebirth_rulebook1-1_033.pdf", sections: "Scotland หน้า 2–4: Gameplay, Scoring Tiles และ Final Scoring",
      rules: "ในเทิร์นให้ลงแผ่นที่ถือ คิดผลจากตำแหน่ง แล้วจั่วแผ่นถัดไป กลุ่มฟาร์มและชุมชนมีวิธีคิดคะแนนต่างกัน ผู้เล่นชิงปราสาทด้วยพื้นที่รอบปราสาท เกมจบเมื่อทุกคนลงแผ่นหมด",
      reasoning: "Tile Laying คือการลงแผ่นจริง ส่วน Area Majority ใช้กับอำนาจรอบปราสาท ข้อวิเคราะห์นี้อิง Scotland; แผนที่ Ireland ใช้ภารกิจและโบนัสต่างกัน",
    },
  },
  {
    id: "mooki-island-2026", year: 2026, lane: "kinder", title: "Die Insel der Mookies",
    verb: "collect", tableMoment: "พลิกดูแล้วเลือกว่าเอามูคกี้หรือส่งแมงมุม",
    replayEngine: "ลำดับไพ่และสิ่งที่อยู่อีกด้านเปลี่ยนทางเลือกในแต่ละเทิร์น",
    core: { conflict: "Competitive", order: "Fixed Turn Order", win: "Victory Points", end: "Exhausting Resources" },
    taste: [{ name: "Drafting, Action Selection", category: "Strategy" }, { name: "Set Collection", category: "Asset" }, { name: "Take That", category: "Engage" }],
    magic: { mood: "อยากรู้อยากเห็นและลุ้นเบา ๆ", action: "เลือกกอง หยิบไพ่แล้วเลือกหนึ่งด้าน", goal: "ได้ดาวจากถ้วยรางวัลมากกว่าอีกฝ่าย", impediment: "ดูไพ่เก่าในกองสะสมไม่ได้ และแมงมุมอาจทำให้เสียถ้วย", character: "นักสำรวจเกาะที่ออกไปผูกมิตรกับมูคกี้" },
    lesson: "การเลือกหนึ่งด้านของไพ่ทำให้เทิร์นสั้น แต่ละใบอาจให้ทางเลือกระหว่างสะสมให้ตัวเองกับรบกวนอีกฝ่าย",
    tags: ["drafting", "set-collection", "majority", "memory"],
    evidence: {
      designer: "Florian Sirieix", edition: "Scorpion Masqué · คู่มืออังกฤษ Mooki Island", players: "2 คน · อายุ 4+",
      rulesUrl: "https://www.scorpionmasque.com/sites/scorpionmasque.com/files/mki_rules_en.pdf", sections: "Gameplay, The Mooki Collection Pile และ End of the Game",
      rules: "ผลัดกันหยิบไพ่จากหนึ่งในสองกองแล้วเลือกด้าน มูคกี้เข้ากองตัวเอง แมงมุมเข้ากองอีกฝ่าย เมื่อกองจั่วหนึ่งกองหมดให้นับเสียงข้างมากในแต่ละครอบครัว ผู้มีแมงมุมมากกว่าเสียถ้วยหนึ่งใบถ้ามี ดาวรวมบนถ้วยที่เหลือตัดสินผู้ชนะ",
      reasoning: "Set Collection ใช้เรียกการสะสมแยกครอบครัว แต่การได้ถ้วยวัดจากจำนวนเทียบคู่แข่ง ไม่ใช่สะสมให้ครบชุด",
    },
  },
];
