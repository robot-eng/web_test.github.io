export const ROLES = {
  WEREWOLF: 'หมาป่า',
  SEER: 'ผู้หยั่งรู้',
  DOCTOR: 'คุณหมอ',
  BODYGUARD: 'บอดี้การ์ด',
  VILLAGER: 'ชาวบ้าน',
  FOOL: 'คนบ้า',
  HUNTER: 'นักล่า',
  HALFBLOOD: 'ลูกครึ่ง',
  ELDER: 'ผู้อวุโส'
};

export const PHASES = {
  SETUP: 'SETUP',
  ROLE_REVEAL: 'ROLE_REVEAL',
  NIGHT_TRANSITION: 'NIGHT_TRANSITION',
  NIGHT_ACTION: 'NIGHT_ACTION',
  DAY_RESULT: 'DAY_RESULT',
  DAY_VOTE: 'DAY_VOTE',
  HUNTER_REVENGE: 'HUNTER_REVENGE',
  GAME_OVER: 'GAME_OVER'
};

export const getRoleDescription = (role) => {
  switch (role) {
    case ROLES.WEREWOLF: return 'ตื่นขึ้นมาตอนกลางคืนเพื่อเลือกเหยื่อ 1 คน พยายามหลอกเนียนเป็นชาวบ้านในตอนกลางวัน';
    case ROLES.SEER: return 'ตื่นขึ้นมาตอนกลางคืนเพื่อตรวจดูบทบาทของผู้เล่น 1 คนว่าใช่หมาป่าหรือไม่';
    case ROLES.DOCTOR: return 'เลือกรักษาผู้เล่น 1 คนในตอนกลางคืน ระวัง! หากคุณเลือกรักษาหมาป่า คุณจะตายเสียเอง แต่ถ้ารักษาลูกครึ่งในคืนที่ถูกกัดตรงจังหวะพอดี ลูกครึ่งจะรอดจากการกลายร่างเป็นหมาป่า!';
    case ROLES.BODYGUARD: return 'เลือกคุ้มกันผู้เล่น 1 คนในตอนกลางคืน หากคนนั้นถูกหมาป่าโจมตี เขาจะรอดชีวิต';
    case ROLES.FOOL: return 'ทำยังไงก็ได้ให้ตัวเองถูกชาวบ้านโหวตแขวนคอในตอนกลางวัน หากคุณถูกแขวนคอ คุณจะชนะเกมทันที!';
    case ROLES.HUNTER: return 'หากคุณตาย (ถูกกัด หรือ ถูกแขวนคอ) ก่อนตายคุณสามารถลากผู้เล่นคนอื่นไปลงนรกพร้อมกับคุณได้ 1 คน';
    case ROLES.HALFBLOOD: return 'คุณอยู่ฝั่งชาวบ้าน เมื่อผู้หยั่งรู้ตรวจสอบจะเห็นว่าเป็น "หมาป่า" และหากถูกหมาป่ากัด คุณจะไม่ตายแต่จะกลายร่างเป็น "หมาป่า" แทน!';
    case ROLES.ELDER: return 'ผ่านโลกมาเยอะ! คุณมี 2 ชีวิตเมื่อถูกหมาป่าโจมตี (รอดจากการถูกกัดได้ 1 ครั้ง) แต่ถ้าถูกแขวนคอ หรือถูกนักล่ายิง คุณจะตายทันที';
    case ROLES.VILLAGER: return 'นอนหลับในตอนกลางคืน ตื่นขึ้นมาตอนเช้าเพื่อปรึกษาและโหวตหาตัวหมาป่าให้เจอ';
    default: return '';
  }
};
