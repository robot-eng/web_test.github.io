import React from 'react';
import { BookOpen, Users, Moon, Sun, Skull, Eye, ShieldPlus, Shield, Ghost, Crosshair, VenetianMask, Award, X } from 'lucide-react';

export default function HowToPlayModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/90 p-4 overflow-y-auto">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative mt-10 md:mt-0">
        
        {/* Header (Sticky) */}
        <div className="p-4 border-b border-slate-700 flex justify-between items-center sticky top-0 bg-slate-800 rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
            <BookOpen size={24} className="text-blue-400" /> วิธีเล่นและบทบาท
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-8 text-left text-slate-300">
          
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-2">กติกาเบื้องต้น</h3>
            <p>เกมนี้จะแบ่งผู้เล่นเป็น 2 ฝั่งหลักคือ <span className="text-emerald-400 font-bold">"ชาวบ้าน"</span> และ <span className="text-red-500 font-bold">"หมาป่า"</span></p>
            <ul className="space-y-3">
              <li className="flex gap-3 items-start"><Moon className="text-blue-400 shrink-0 mt-1" size={20} /> <div><strong>กลางคืน:</strong> หมาป่าจะตื่นขึ้นมาเลือกเหยื่อ และบทบาทพิเศษอื่นๆ จะตื่นมาใช้ความสามารถตามลำดับ</div></li>
              <li className="flex gap-3 items-start"><Sun className="text-yellow-400 shrink-0 mt-1" size={20} /> <div><strong>กลางวัน:</strong> ทุกคนจะตื่นขึ้นมาเพื่อปรึกษาหารือกันว่าใครคือหมาป่า และทำการโหวตแขวนคอผู้ต้องสงสัย 1 คน</div></li>
              <li className="flex gap-3 items-start"><Award className="text-emerald-400 shrink-0 mt-1" size={20} /> <div><strong>เป้าหมาย:</strong> ชาวบ้านต้องหาหมาป่าให้เจอและโหวตแขวนคอให้หมด ส่วนหมาป่าต้องฆ่าชาวบ้านให้จำนวนเหลือเท่ากับหรือน้อยกว่าหมาป่า</div></li>
            </ul>
            <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-2">ระบบบอท (AI Players) 🤖</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 items-start"><Users className="text-slate-400 shrink-0 mt-1" size={20} /> <div><strong>การเข้าร่วม:</strong> หัวหน้าห้องสามารถกด '+ เพิ่มบอท' เพื่อให้คนครบและสนุกได้แม้เพื่อนมาไม่ถึง</div></li>
              <li className="flex gap-3 items-start"><Moon className="text-blue-400 shrink-0 mt-1" size={20} /> <div><strong>ตอนกลางคืน:</strong> หากบอทได้เป็นหมาป่า, หมอ, หรือบอดี้การ์ด บอทจะทำการสุ่มเลือกเป้าหมายอัตโนมัติ (แต่ถ้ามีคนจริงเป็นหมาป่าด้วย ระบบจะยึดคำสั่งคนจริงก่อนเสมอ)</div></li>
              <li className="flex gap-3 items-start"><Sun className="text-yellow-400 shrink-0 mt-1" size={20} /> <div><strong>ตอนกลางวัน:</strong> บอทจะไม่พูดและไม่โหวต ให้ผู้เล่นที่เป็นคนจริงๆ ปรึกษาและโหวตกันเอง จากนั้นให้หัวหน้าห้องเป็นคนล็อกเป้าแขวนคอตามมติของวงสนทนาได้เลย!</div></li>
              <li className="flex gap-3 items-start"><Crosshair className="text-amber-500 shrink-0 mt-1" size={20} /> <div><strong>นักล่าบอท:</strong> หากนักล่าที่เป็นบอทตาย ไม่ว่าจะด้วยวิธีใด บอทจะหน่วงเวลา 3 วินาที (ให้ลุ้น) แล้วจะลั่นไกปืนสุ่มยิงคนที่รอดชีวิตทันที!</div></li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-2">คำอธิบายบทบาททั้งหมด</h3>
            
            <div className="space-y-4">
              <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-700/50 flex gap-4">
                <Skull className="text-red-500 shrink-0" size={32} />
                <div>
                  <strong className="text-lg text-red-400 block mb-1">หมาป่า</strong>
                  <p className="text-sm">ตื่นขึ้นมาตอนกลางคืนเพื่อเลือกเหยื่อ 1 คน พยายามหลอกเนียนเป็นชาวบ้านในตอนกลางวัน</p>
                </div>
              </div>

              <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-700/50 flex gap-4">
                <Eye className="text-purple-400 shrink-0" size={32} />
                <div>
                  <strong className="text-lg text-purple-400 block mb-1">ผู้หยั่งรู้</strong>
                  <p className="text-sm">ตื่นขึ้นมาตอนกลางคืนเพื่อตรวจดูบทบาทของผู้เล่น 1 คนว่าใช่หมาป่าหรือไม่</p>
                </div>
              </div>

              <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-700/50 flex gap-4">
                <ShieldPlus className="text-emerald-400 shrink-0" size={32} />
                <div>
                  <strong className="text-lg text-emerald-400 block mb-1">คุณหมอ</strong>
                  <p className="text-sm">เลือกรักษาผู้เล่น 1 คนในตอนกลางคืน ระวัง! หากคุณเลือกรักษาหมาป่า คุณจะตายเสียเอง แต่ถ้ารักษาลูกครึ่งในคืนที่ถูกกัดตรงจังหวะพอดี ลูกครึ่งจะรอดจากการกลายร่างเป็นหมาป่า!</p>
                </div>
              </div>

              <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-700/50 flex gap-4">
                <Shield className="text-sky-400 shrink-0" size={32} />
                <div>
                  <strong className="text-lg text-sky-400 block mb-1">บอดี้การ์ด</strong>
                  <p className="text-sm">เลือกคุ้มกันผู้เล่น 1 คนในตอนกลางคืน หากคนนั้นถูกหมาป่าโจมตี เขาจะรอดชีวิต</p>
                </div>
              </div>

              <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-700/50 flex gap-4">
                <Users className="text-slate-300 shrink-0" size={32} />
                <div>
                  <strong className="text-lg text-slate-300 block mb-1">ชาวบ้าน</strong>
                  <p className="text-sm">นอนหลับในตอนกลางคืน ตื่นขึ้นมาตอนเช้าเพื่อปรึกษาและโหวตหาตัวหมาป่าให้เจอ</p>
                </div>
              </div>

              <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-700/50 flex gap-4">
                <Ghost className="text-orange-400 shrink-0" size={32} />
                <div>
                  <strong className="text-lg text-orange-400 block mb-1">คนบ้า</strong>
                  <p className="text-sm">ทำยังไงก็ได้ให้ตัวเองถูกชาวบ้านโหวตแขวนคอในตอนกลางวัน หากคุณถูกแขวนคอ คุณจะชนะเกมทันที!</p>
                </div>
              </div>

              <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-700/50 flex gap-4">
                <Crosshair className="text-amber-500 shrink-0" size={32} />
                <div>
                  <strong className="text-lg text-amber-500 block mb-1">นักล่า</strong>
                  <p className="text-sm">หากคุณตาย (ถูกกัด หรือ ถูกแขวนคอ) ก่อนตายคุณสามารถลากผู้เล่นคนอื่นไปลงนรกพร้อมกับคุณได้ 1 คน</p>
                </div>
              </div>

              <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-700/50 flex gap-4">
                <VenetianMask className="text-indigo-400 shrink-0" size={32} />
                <div>
                  <strong className="text-lg text-indigo-400 block mb-1">ลูกครึ่ง</strong>
                  <p className="text-sm">คุณอยู่ฝั่งชาวบ้าน เมื่อผู้หยั่งรู้ตรวจสอบจะเห็นว่าเป็น "หมาป่า" และหากถูกหมาป่ากัด คุณจะไม่ตายแต่จะกลายร่างเป็น "หมาป่า" แทน!</p>
                </div>
              </div>

              <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-700/50 flex gap-4">
                <Award className="text-yellow-200 shrink-0" size={32} />
                <div>
                  <strong className="text-lg text-yellow-200 block mb-1">ผู้อวุโส</strong>
                  <p className="text-sm">ผ่านโลกมาเยอะ! คุณมี 2 ชีวิตเมื่อถูกหมาป่าโจมตี (รอดจากการถูกกัดได้ 1 ครั้ง) แต่ถ้าถูกแขวนคอ หรือถูกนักล่ายิง คุณจะตายทันที</p>
                </div>
              </div>
            </div>

          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 bg-slate-800 rounded-b-2xl">
          <button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors">
            เข้าใจแล้ว ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
}
