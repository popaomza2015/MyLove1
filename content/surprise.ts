/* ─────────────────────────────────────────────
   All copy, audio & image paths live here.
   Edit this single file to personalise the app.
   ───────────────────────────────────────────── */

export interface MemoryCard {
  image: string;        // path under /images  — missing → warm gradient
  title: string;
  story: string;        // max 3 lines recommended
  date: string;
}

export interface GiftItem {
  kind: 'thing' | 'letter' | 'promise' | 'voice';
  title: string;
  note: string;         // cream note revealed on unwrap
  audioSrc?: string;    // optional audio file under /audio
}

export const content = {
  /* ── Metadata & Sharing (LINE / Social) ──── */
  meta: {
    title: 'ถึงเธอ 💌 สุขสันต์วันเกิด',
    description: 'มีข้อความพิเศษและกล่องของขวัญรอคุณเปิดอ่านอยู่...',
    url: 'https://mylove.app',
    ogImage: '/images/mylove1.jpg',
  },

  /* ── Ambient Background & Music ─────────── */
  ambient: {
    candleFlicker: true,          // เปลวเทียนไหวเบาๆ
    particles: true,              // ละอองแสงสีทองลอยช้าๆ
    music: {
      enabled: true,
      title: 'เพลงรักเบาๆ',
      src: '/audio/bgm.mp3',       // วางไฟล์เพลง mp3 ใน public/audio/ (ถ้าไม่มีมีเสียงเปียโนบรรเลงนุ่มนวลอัตโนมัติ)
    },
  },

  /* ── Counter (ตัวนับวัน) ──────────────────── */
  counter: {
    enabled: true,
    startDate: '2024-01-01',      // วันที่เริ่มนับ (ปี-เดือน-วัน)
    prefix: 'เดินทางร่วมกันมาแล้ว',
    suffix: 'วันแห่งความสุข ✨',
  },

  /* ── 1. Envelope ─────────────────────────── */
  envelope: {
    name: 'ถึงเธอ',
    date: '23 พฤศจิกายน',
    holdHint: 'กดค้างไว้นิดหนึ่ง',
  },

  /* ── 2. Letter ───────────────────────────── */
  letter: {
    body: `วันนี้เป็นวันพิเศษของคนพิเศษ\nเลยอยากจะบอกว่า...\n\nขอบคุณที่เกิดมา\nขอบคุณที่อยู่ตรงนี้\nขอบคุณที่เป็นเธอ\n\nสุขสันต์วันเกิดนะ 🎂`,
    swipeHint: 'เลื่อนขึ้นเพื่อดูความทรงจำ',
  },

  /* ── 3. Memories ─────────────────────────── */
  memories: {
    polaroidStyle: true,
    cards: [
      {
        image: '/images/mylove1.jpg',
        title: 'วันแรกที่เจอกัน',
        story: 'วันนั้นฟ้าสวย ใจก็สวยตาม ตั้งแต่วินาทีนั้นก็รู้ว่าคนนี้แหละ',
        date: 'มกราคม 2568',
      },
      {
        image: '/images/mylove1.jpg',
        title: 'ทริปทะเลครั้งแรก',
        story: 'คลื่นเสียงดัง แต่เสียงหัวเราะเธอดังกว่า วันนั้นมีความสุขมาก',
        date: 'มีนาคม 2568',
      },
      {
        image: '/images/mylove1.jpg',
        title: 'วันฝนตก',
        story: 'วิ่งหนีฝนด้วยกัน เปียกทั้งคู่ แต่กลับยิ้มไม่หุบ',
        date: 'มิถุนายน 2568',
      },
      {
        image: '/images/mylove1.jpg',
        title: 'ค่ำคืนพิเศษ',
        story: 'นั่งดูดาวด้วยกัน ไม่ต้องพูดอะไร แค่อยู่ด้วยกันก็พอแล้ว',
        date: 'กันยายน 2568',
      },
    ] as MemoryCard[],
  },

  /* ── 4. Gifts ────────────────────────────── */
  gifts: {
    items: [
      {
        kind: 'thing' as const,
        title: 'ของขวัญชิ้นแรก 🎁',
        note: 'มีของพิเศษรอเธออยู่ เจอกันแล้วจะมอบให้นะ',
      },
      {
        kind: 'voice' as const,
        title: 'ข้อความเสียงจากใจ 🎙️',
        note: 'กดปุ่มเล่นเสียงเพื่อฟังความในใจที่อยากบอก...',
        audioSrc: '/audio/voice-note.mp3', // วางไฟล์เสียงที่อัดไว้ใน public/audio/
      },
      {
        kind: 'letter' as const,
        title: 'จดหมายลับ 💌',
        note: 'ทุกคำที่เขียน เขียนจากใจ อ่านตอนคิดถึงนะ',
      },
      {
        kind: 'promise' as const,
        title: 'สัญญาหนึ่งข้อ 🤞',
        note: 'สัญญาว่าจะอยู่ข้างๆ เธอ ไม่ว่าวันไหน',
      },
    ] as GiftItem[],
    nextButton: 'อ่านหน้าสุดท้าย',
  },

  /* ── 5. Ending ───────────────────────────── */
  ending: {
    message: 'ขอให้ปีนี้เป็นปีที่ดีที่สุดของเธอนะ 🤍',
    replayText: 'ดูความทรงจำอีกครั้ง',
    closeText: 'ปิดซองจดหมาย',
  },
};
