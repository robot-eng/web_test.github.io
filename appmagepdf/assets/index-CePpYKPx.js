import{n as e}from"./rolldown-runtime-S-ySWqyJ.js";import{n as t,t as n}from"./pdflib-qVFFl0zM.js";import{n as r,t as i}from"./pdfjs-ChQ4HP4S.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var a={th:{"nav.merge":`รวมไฟล์ PDF`,"nav.delete":`ลบหน้า`,"nav.reorder":`จัดเรียงหน้า`,"nav.organize":`จัดระเบียบหน้า`,"nav.img2pdf":`แปลงรูปเป็น PDF`,"nav.compress":`บีบอัด PDF`,"nav.split":`แยกไฟล์ PDF`,"nav.rotate":`หมุนหน้า`,"nav.extract":`แยกหน้าที่เลือก`,"nav.home":`เครื่องมือจัดการ PDF`,"security.badge":`ประมวลผลในเครื่องเท่านั้น`,"security.desc":`ไฟล์ของคุณจะไม่ถูกส่งไปยังเซิร์ฟเวอร์ใดๆ ทุกขั้นตอนทำงานบนเบราว์เซอร์ของคุณโดยตรง มั่นใจได้ในความปลอดภัยของข้อมูล`,"dashboard.welcome":`ยินดีต้อนรับสู่ PDF Manager`,"dashboard.sub":`เลือกเครื่องมือที่คุณต้องการเพื่อจัดการไฟล์ PDF อย่างรวดเร็วและปลอดภัย`,"merge.title":`รวมไฟล์ PDF`,"merge.dropText":`ลากไฟล์ PDF มาวางที่นี่ หรือคลิกเพื่อเลือก`,"merge.dropHint":`รองรับหลายไฟล์พร้อมกัน`,"merge.files":`ไฟล์`,"merge.totalPages":`หน้ารวม`,"merge.clearAll":`ล้างทั้งหมด`,"merge.mergeBtn":`รวมไฟล์ PDF`,"merge.needTwo":`ต้องมีอย่างน้อย 2 ไฟล์เพื่อรวม`,"merge.processing":`กำลังรวมไฟล์ PDF...`,"merge.success":`รวมไฟล์สำเร็จ! ✓`,"merge.dragReorder":`ลากเพื่อจัดเรียง`,"merge.removeFile":`ลบไฟล์`,"merge.pages":`หน้า`,"merge.expandPages":`ดูหน้า`,"merge.collapsePages":`ซ่อนหน้า`,"merge.viewPage":`ดูหน้า`,"delete.title":`ลบหน้า`,"delete.dropText":`เลือกไฟล์ PDF ที่ต้องการลบหน้า`,"delete.dropHint":`ลากไฟล์มาวาง หรือคลิกเพื่อเลือก`,"delete.selectAll":`เลือกทั้งหมด`,"delete.deselectAll":`ยกเลิกทั้งหมด`,"delete.deleteBtn":`ลบหน้าที่เลือก`,"delete.selected":`เลือก`,"delete.of":`จาก`,"delete.pagesLabel":`หน้า`,"delete.minWarning":`(ต้องเหลืออย่างน้อย 1 หน้า)`,"delete.processing":`กำลังลบหน้า...`,"delete.success":`ลบ {n} หน้าสำเร็จ! ✓`,"delete.pageNum":`หน้า {n}`,"delete.viewPage":`ดูหน้า`,"delete.reorderHint":`ลากเพื่อจัดเรียง · คลิกเพื่อเลือก`,"reorder.title":`จัดเรียงหน้า`,"reorder.dropText":`เลือกไฟล์ PDF ที่ต้องการจัดเรียงหน้า`,"reorder.dropHint":`ลากเพื่อสลับตำแหน่งหน้า`,"reorder.info":`{n} หน้า — ลากเพื่อจัดเรียงลำดับ`,"reorder.reset":`รีเซ็ต`,"reorder.saveBtn":`บันทึก PDF`,"reorder.processing":`กำลังจัดเรียงหน้า...`,"reorder.success":`จัดเรียงหน้าสำเร็จ! ✓`,"reorder.pageNum":`หน้า {n}`,"reorder.viewPage":`ดูหน้า`,"split.title":`แยกไฟล์ PDF`,"split.dropText":`เลือกไฟล์ PDF ที่ต้องการแยก`,"split.dropHint":`แบ่ง PDF เป็นหลายไฟล์ตามช่วงหน้า`,"split.viewPage":`ดูหน้า`,"split.totalPages":`ทั้งหมด {n} หน้า`,"split.splitEvery":`แยกทุกหน้า (1 หน้า/ไฟล์)`,"split.rangeLabel":`กำหนดช่วงหน้า (1-indexed)`,"split.addRange":`เพิ่มช่วง`,"split.file":`ไฟล์`,"split.to":`ถึง`,"split.removeRange":`ลบช่วง`,"split.info":`จะแยกเป็น {n} ไฟล์`,"split.splitBtn":`แยกไฟล์ PDF`,"split.invalidRange":`ช่วงที่ {n} ไม่ถูกต้อง (1-{max})`,"split.processing":`กำลังแยกไฟล์ PDF...`,"split.success":`แยกเป็น {n} ไฟล์สำเร็จ! ✓`,"rotate.title":`หมุนหน้า`,"rotate.dropText":`เลือกไฟล์ PDF ที่ต้องการหมุนหน้า`,"rotate.dropHint":`คลิกที่หน้าเพื่อหมุน 90° ตามเข็มนาฬิกา`,"rotate.allRotate90":`หมุนทุกหน้า 90°`,"rotate.reset":`รีเซ็ต`,"rotate.saveBtn":`บันทึก PDF`,"rotate.info":`{n} หน้าถูกหมุน`,"rotate.noRotation":`ยังไม่ได้หมุนหน้าใด`,"rotate.processing":`กำลังหมุนหน้า...`,"rotate.success":`หมุน {n} หน้าสำเร็จ! ✓`,"rotate.pageNum":`หน้า {n}`,"rotate.viewPage":`ดูหน้า`,"extract.title":`แยกหน้าที่เลือก`,"extract.dropText":`เลือกไฟล์ PDF ที่ต้องการแยกหน้า`,"extract.dropHint":`เลือกเฉพาะหน้าที่ต้องการเป็นไฟล์ใหม่`,"extract.selectAll":`เลือกทั้งหมด`,"extract.deselectAll":`ยกเลิกทั้งหมด`,"extract.extractBtn":`แยกหน้าที่เลือก`,"extract.selected":`เลือก`,"extract.of":`จาก`,"extract.pagesLabel":`หน้า`,"extract.processing":`กำลังแยกหน้า...`,"extract.success":`แยก {n} หน้าสำเร็จ! ✓`,"extract.pageNum":`หน้า {n}`,"extract.viewPage":`ดูหน้า`,"img2pdf.title":`แปลงรูปเป็น PDF`,"img2pdf.dropText":`ลากรูปภาพมาวางที่นี่ (JPG, PNG)`,"img2pdf.dropHint":`สามารถเลือกหลายรูปและจัดเรียงได้ตามต้องการ`,"img2pdf.btn":`สร้างไฟล์ PDF จากรูป`,"compress.title":`บีบอัด PDF`,"compress.dropText":`เลือกไฟล์ PDF ที่ต้องการลดขนาด`,"compress.dropHint":`ลดขนาดไฟล์เพื่อให้ส่งทางอีเมลหรือแอปแชทได้ง่ายขึ้น`,"compress.btn":`บีบอัดไฟล์ PDF`,"compress.processing":`กำลังบีบอัดไฟล์ PDF...`,"compress.success":`บีบอัดสำเร็จ! ลดขนาดลงได้ {n}%`,"viewer.close":`ปิด`,"viewer.prev":`หน้าก่อน`,"viewer.next":`หน้าถัดไป`,"viewer.pageOf":`{current} / {total}`,"viewer.select":`เลือก`,"viewer.deselect":`ยกเลิกเลือก`,"viewer.rotate":`หมุน 90°`,"viewer.delete":`ลบหน้านี้`,"common.loading":`กำลังโหลด PDF...`,"common.readError":`ไม่สามารถอ่านไฟล์ PDF`,"common.error":`เกิดข้อผิดพลาด`,"common.selectPdf":`กรุณาเลือกไฟล์ PDF`,"common.viewPage":`ดูหน้า`,"common.deleteAll":`ไม่สามารถลบทุกหน้าได้ — ต้องเหลืออย่างน้อย 1 หน้า`},en:{"nav.merge":`Merge PDFs`,"nav.delete":`Delete Pages`,"nav.reorder":`Reorder Pages`,"nav.organize":`Organize PDF`,"nav.img2pdf":`Image to PDF`,"nav.compress":`Compress PDF`,"nav.split":`Split PDF`,"nav.rotate":`Rotate Pages`,"nav.extract":`Extract Pages`,"nav.home":`PDF Tools Dashboard`,"security.badge":`Processed locally only`,"security.desc":`Your files are never sent to any server. Everything is processed directly in your browser, ensuring maximum privacy and security.`,"dashboard.welcome":`Welcome to PDF Manager`,"dashboard.sub":`Choose a tool to manage your PDF files quickly and securely.`,"merge.title":`Merge PDFs`,"merge.dropText":`Drag PDF files here or click to select`,"merge.dropHint":`Supports multiple files`,"merge.files":`files`,"merge.totalPages":`total pages`,"merge.clearAll":`Clear all`,"merge.mergeBtn":`Merge PDFs`,"merge.needTwo":`Need at least 2 files to merge`,"merge.processing":`Merging PDFs...`,"merge.success":`Files merged successfully! ✓`,"merge.dragReorder":`Drag to reorder`,"merge.removeFile":`Remove file`,"merge.pages":`pages`,"merge.expandPages":`View pages`,"merge.collapsePages":`Hide pages`,"merge.viewPage":`View page`,"delete.title":`Delete Pages`,"delete.dropText":`Select a PDF to delete pages from`,"delete.dropHint":`Drag a file here or click to select`,"delete.selectAll":`Select all`,"delete.deselectAll":`Deselect all`,"delete.deleteBtn":`Delete selected`,"delete.selected":`Selected`,"delete.of":`of`,"delete.pagesLabel":`pages`,"delete.minWarning":`(Must keep at least 1 page)`,"delete.processing":`Deleting pages...`,"delete.success":`Deleted {n} pages! ✓`,"delete.pageNum":`Page {n}`,"delete.viewPage":`View page`,"delete.reorderHint":`Drag to reorder · Click to select`,"reorder.title":`Reorder Pages`,"reorder.dropText":`Select a PDF to reorder pages`,"reorder.dropHint":`Drag to swap page positions`,"reorder.info":`{n} pages — drag to reorder`,"reorder.reset":`Reset`,"reorder.saveBtn":`Save PDF`,"reorder.processing":`Reordering pages...`,"reorder.success":`Pages reordered! ✓`,"reorder.pageNum":`Page {n}`,"reorder.viewPage":`View page`,"split.title":`Split PDF`,"split.dropText":`Select a PDF to split`,"split.dropHint":`Split PDF into multiple files by page ranges`,"split.viewPage":`View page`,"split.totalPages":`Total {n} pages`,"split.splitEvery":`Split every page (1 page/file)`,"split.rangeLabel":`Define page ranges (1-indexed)`,"split.addRange":`Add range`,"split.file":`File`,"split.to":`to`,"split.removeRange":`Remove range`,"split.info":`Will split into {n} files`,"split.splitBtn":`Split PDF`,"split.invalidRange":`Range {n} is invalid (1-{max})`,"split.processing":`Splitting PDF...`,"split.success":`Split into {n} files! ✓`,"rotate.title":`Rotate Pages`,"rotate.dropText":`Select a PDF to rotate pages`,"rotate.dropHint":`Click a page to rotate 90° clockwise`,"rotate.allRotate90":`Rotate all 90°`,"rotate.reset":`Reset`,"rotate.saveBtn":`Save PDF`,"rotate.info":`{n} pages rotated`,"rotate.noRotation":`No pages rotated yet`,"rotate.processing":`Rotating pages...`,"rotate.success":`Rotated {n} pages! ✓`,"rotate.pageNum":`Page {n}`,"rotate.viewPage":`View page`,"extract.title":`Extract Pages`,"extract.dropText":`Select a PDF to extract pages from`,"extract.dropHint":`Pick specific pages for a new PDF`,"extract.selectAll":`Select all`,"extract.deselectAll":`Deselect all`,"extract.extractBtn":`Extract selected`,"extract.selected":`Selected`,"extract.of":`of`,"extract.pagesLabel":`pages`,"extract.processing":`Extracting pages...`,"extract.success":`Extracted {n} pages! ✓`,"extract.pageNum":`Page {n}`,"extract.viewPage":`View page`,"img2pdf.title":`Image to PDF`,"img2pdf.dropText":`Drag images here (JPG, PNG)`,"img2pdf.dropHint":`Supports multiple images and custom sorting`,"img2pdf.btn":`Convert to PDF`,"compress.title":`Compress PDF`,"compress.dropText":`Select a PDF to reduce its size`,"compress.dropHint":`Reduce file size for easier sharing via email or chat`,"compress.btn":`Compress PDF`,"compress.processing":`Compressing PDF...`,"compress.success":`Compressed successfully! Saved {n}%`,"viewer.close":`Close`,"viewer.prev":`Previous`,"viewer.next":`Next`,"viewer.pageOf":`{current} / {total}`,"viewer.select":`Select`,"viewer.deselect":`Deselect`,"viewer.rotate":`Rotate 90°`,"viewer.delete":`Delete this page`,"common.loading":`Loading PDF...`,"common.readError":`Cannot read PDF file`,"common.error":`Error occurred`,"common.selectPdf":`Please select a PDF file`,"common.viewPage":`View page`,"common.deleteAll":`Cannot delete all pages — at least 1 must remain`}},o=localStorage.getItem(`pdf-manager-lang`)||`th`,s=[];function c(e,t={}){let n=a[o]?.[e]||a.th[e]||e;for(let[e,r]of Object.entries(t))n=n.replace(`{${e}}`,r);return n}function ee(){return o}function te(e){e!==`th`&&e!==`en`||(o=e,localStorage.setItem(`pdf-manager-lang`,e),s.forEach(t=>t(e)))}function ne(){te(o===`th`?`en`:`th`)}function l(e){return s.push(e),()=>{s=s.filter(t=>t!==e)}}function u(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(r.result),r.onerror=n,r.readAsArrayBuffer(e)})}function re(e){if(e===0)return`0 B`;let t=1024,n=[`B`,`KB`,`MB`,`GB`],r=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/t**+r).toFixed(1))+` `+n[r]}async function d(e){return(await n.load(e)).getPageCount()}async function ie(e){let t=await n.create();for(let r of e){let e=await n.load(r);(await t.copyPages(e,e.getPageIndices())).forEach(e=>t.addPage(e))}return t.save()}async function ae(e,t){let r=await n.load(e),i=await n.create();return(await i.copyPages(r,t)).forEach(e=>i.addPage(e)),i.save()}async function oe(e,t){let r=await n.load(e),i=[];for(let e of t){let t=await n.create(),a=[];for(let t=e.start;t<=e.end;t++)a.push(t);(await t.copyPages(r,a)).forEach(e=>t.addPage(e)),i.push(await t.save())}return i}async function se(e,r){let i=await n.load(e);for(let[e,n]of r){let r=i.getPage(e),a=r.getRotation().angle;r.setRotation(t((a+n)%360))}return i.save()}async function ce(e,t){let r=await n.load(e),i=await n.create();return(await i.copyPages(r,t)).forEach(e=>i.addPage(e)),i.save()}function f(e,t){let n=new Blob([e],{type:`application/pdf`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=t,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(r)}i.workerSrc=new URL(``+new URL(`pdf.worker-xSiVJ7U_.mjs`,import.meta.url).href,``+import.meta.url).toString();async function le(e){return r({data:new Uint8Array(e)}).promise}async function ue(e,t,n,r=200){let i=await e.getPage(t),a=r/i.getViewport({scale:1}).width,o=i.getViewport({scale:a});n.width=o.width,n.height=o.height;let s=n.getContext(`2d`);s.clearRect(0,0,n.width,n.height),s.fillStyle=`#fff`,s.fillRect(0,0,n.width,n.height),await i.render({canvasContext:s,viewport:o}).promise}function p(e,t=200){return new Promise(async(n,r)=>{try{let r=await le(e),i=Array.from({length:r.numPages},()=>{let e=document.createElement(`canvas`);return e.width=210,e.height=297,e});n(i),(async()=>{for(let e=1;e<=r.numPages;e+=5){let n=[];for(let a=e;a<e+5&&a<=r.numPages;a++)n.push(ue(r,a,i[a-1],t));await Promise.all(n),await new Promise(e=>setTimeout(e,0))}})()}catch(e){r(e)}})}var m=null,h=null;function g({pdfBuffer:e,pageIndex:t,totalPages:n,onClose:r,renderActions:i}){pe(),h={pdfBuffer:e,pageIndex:t,totalPages:n,onClose:r,renderActions:i,pdfDoc:null},m=document.createElement(`div`),m.className=`page-viewer-overlay`,m.innerHTML=`
    <button class="page-viewer-close" title="${c(`viewer.close`)}">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>
    <button class="page-viewer-nav page-viewer-prev" title="${c(`viewer.prev`)}">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <div class="page-viewer-content">
      <canvas class="page-viewer-canvas"></canvas>
    </div>
    <button class="page-viewer-nav page-viewer-next" title="${c(`viewer.next`)}">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
    </button>
    <div class="page-viewer-footer">
      <div class="page-viewer-info"></div>
      <div class="page-viewer-actions"></div>
    </div>
  `,document.body.appendChild(m),m.offsetHeight,m.classList.add(`open`),m.querySelector(`.page-viewer-close`).addEventListener(`click`,pe),m.querySelector(`.page-viewer-prev`).addEventListener(`click`,()=>_(-1)),m.querySelector(`.page-viewer-next`).addEventListener(`click`,()=>_(1)),m.addEventListener(`click`,e=>{e.target===m&&pe()}),document.addEventListener(`keydown`,de),fe()}function de(e){m&&(e.key===`Escape`&&pe(),e.key===`ArrowLeft`&&_(-1),e.key===`ArrowRight`&&_(1))}function _(e){if(!h)return;let t=h.pageIndex+e;t<0||t>=h.totalPages||(h.pageIndex=t,fe())}async function fe(){if(!m||!h)return;let{pdfBuffer:e,pageIndex:t,totalPages:n,renderActions:i}=h,a=m.querySelector(`.page-viewer-canvas`),o=m.querySelector(`.page-viewer-info`),s=m.querySelector(`.page-viewer-actions`),c=m.querySelector(`.page-viewer-prev`),ee=m.querySelector(`.page-viewer-next`);o.textContent=`${t+1} / ${n}`,c.disabled=t===0,ee.disabled=t===n-1;try{if(!h.pdfDoc){let t=r({data:new Uint8Array(e)});h.pdfDoc=await t.promise}let n=await h.pdfDoc.getPage(t+1),i=n.getViewport({scale:1}),o=Math.min(window.innerWidth*.75,800),s=window.innerHeight*.78,c=o/i.width,ee=s/i.height,te=Math.min(c,ee),ne=n.getViewport({scale:te});a.width=ne.width,a.height=ne.height;let l=a.getContext(`2d`);l.clearRect(0,0,a.width,a.height),l.fillStyle=`#fff`,l.fillRect(0,0,a.width,a.height),await n.render({canvasContext:l,viewport:ne}).promise}catch(e){console.error(`Viewer render error:`,e)}s.innerHTML=``,i&&i(t,s)}function pe(){document.removeEventListener(`keydown`,de),m&&(m.classList.remove(`open`),setTimeout(()=>{m?.remove(),m=null},250)),h?.onClose&&h.onClose(),h?.pdfDoc&&h.pdfDoc.destroy(),h=null}var me=e({render:()=>he}),v=[],y=new Set;function he(e){v=[],y=new Set,e.innerHTML=`
    <div class="drop-zone" id="merge-drop-zone">
      <input type="file" id="merge-file-input" accept=".pdf" multiple />
      <div class="drop-zone-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M16 3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/>
          <path d="M12 8v8M8 12h8"/>
        </svg>
      </div>
      <div class="drop-zone-text">${c(`merge.dropText`)}</div>
      <div class="drop-zone-hint">${c(`merge.dropHint`)}</div>
    </div>
    <div class="file-list" id="merge-file-list"></div>
    <div class="action-bar" id="merge-action-bar" style="display:none;">
      <span class="selection-info" id="merge-info"></span>
      <button class="btn btn-ghost" id="merge-clear-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        ${c(`merge.clearAll`)}
      </button>
      <button class="btn btn-primary" id="merge-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8v8M8 12h8"/></svg>
        ${c(`merge.mergeBtn`)}
      </button>
    </div>
  `,ge(e)}function ge(e){let t=e.querySelector(`#merge-drop-zone`),n=e.querySelector(`#merge-file-input`);t.addEventListener(`dragover`,e=>{e.preventDefault(),t.classList.add(`drag-over`)}),t.addEventListener(`dragleave`,()=>t.classList.remove(`drag-over`)),t.addEventListener(`drop`,n=>{n.preventDefault(),t.classList.remove(`drag-over`),_e(n.dataTransfer.files,e)}),n.addEventListener(`change`,t=>{_e(t.target.files,e),t.target.value=``}),e.querySelector(`#merge-btn`)?.addEventListener(`click`,()=>be()),e.querySelector(`#merge-clear-btn`)?.addEventListener(`click`,()=>{v=[],y.clear(),b(e)})}async function _e(e,t){let n=Array.from(e).filter(e=>e.type===`application/pdf`||e.name.endsWith(`.pdf`));if(n.length===0){X(c(`common.selectPdf`),`error`);return}for(let e of n){let t=new Uint8Array(await u(e)),n=await d(t);v.push({name:e.name,size:e.size,buffer:t,pageCount:n,cachedCanvases:null})}b(t)}function b(e){let t=e.querySelector(`#merge-file-list`),n=e.querySelector(`#merge-action-bar`),r=e.querySelector(`#merge-info`);if(v.length===0){t.innerHTML=``,n.style.display=`none`;return}n.style.display=`flex`;let i=v.reduce((e,t)=>e+t.pageCount,0);r.innerHTML=`<strong>${v.length}</strong> ${c(`merge.files`)} · <strong>${i}</strong> ${c(`merge.totalPages`)}`,t.innerHTML=v.map((e,t)=>`
    <div class="file-card-wrapper" data-index="${t}">
      <div class="file-card" draggable="true" data-index="${t}">
        <div class="drag-handle" title="${c(`merge.dragReorder`)}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h.01M8 12h.01M8 18h.01M16 6h.01M16 12h.01M16 18h.01"/></svg>
        </div>
        <div class="file-card-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
        </div>
        <div class="file-card-info">
          <div class="file-card-name">${e.name}</div>
          <div class="file-card-meta">${re(e.size)} · ${e.pageCount} ${c(`merge.pages`)}</div>
        </div>
        <div class="move-actions">
          <button class="btn-move" data-move-up="${t}" ${t===0?`disabled`:``} title="Move Up">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M18 15l-6-6-6 6"/></svg>
          </button>
          <button class="btn-move" data-move-down="${t}" ${t===v.length-1?`disabled`:``} title="Move Down">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 9l6 6 6-6"/></svg>
          </button>
        </div>
        <div class="file-card-actions">
          <button class="file-card-expand ${y.has(t)?`expanded`:``}" data-expand="${t}" title="${y.has(t)?c(`merge.collapsePages`):c(`merge.expandPages`)}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            <span>${e.pageCount} ${c(`merge.pages`)}</span>
          </button>
          <button class="btn-icon danger" data-remove="${t}" title="${c(`merge.removeFile`)}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>
      <div class="merge-page-preview" id="merge-preview-${t}" style="${y.has(t)?``:`display:none;`}"></div>
    </div>
  `).join(``),t.querySelectorAll(`[data-remove]`).forEach(t=>{t.addEventListener(`click`,()=>{let n=parseInt(t.dataset.remove);y.delete(n),v.splice(n,1);let r=new Set;y.forEach(e=>{e>n?r.add(e-1):e<n&&r.add(e)}),y=r,b(e)})}),t.querySelectorAll(`[data-move-up]`).forEach(t=>{t.addEventListener(`click`,()=>{let n=parseInt(t.dataset.moveUp);if(n>0){let[t]=v.splice(n,1);v.splice(n-1,0,t),b(e)}})}),t.querySelectorAll(`[data-move-down]`).forEach(t=>{t.addEventListener(`click`,()=>{let n=parseInt(t.dataset.moveDown);if(n<v.length-1){let[t]=v.splice(n,1);v.splice(n+1,0,t),b(e)}})}),t.querySelectorAll(`[data-expand]`).forEach(n=>{n.addEventListener(`click`,async()=>{let r=parseInt(n.dataset.expand);if(y.has(r)){y.delete(r);let e=t.querySelector(`#merge-preview-${r}`);e&&(e.style.display=`none`),n.classList.remove(`expanded`)}else y.add(r),n.classList.add(`expanded`),await ve(r,e)})}),y.forEach(t=>{ve(t,e)}),ye(t,e)}async function ve(e,t){let n=v[e];if(!n)return;let r=t.querySelector(`#merge-preview-${e}`);r&&(r.style.display=``,n.cachedCanvases||=await p(n.buffer,100),r.innerHTML=n.cachedCanvases.map((t,n)=>`
    <div class="merge-page-thumb" data-file="${e}" data-page="${n}" title="${c(`merge.viewPage`)}">
      <div class="page-card-overlay" style="border-radius: 6px;">
        <button class="view-btn merge-view-btn" data-file="${e}" data-page="${n}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
      <div class="merge-page-thumb-num">${n+1}</div>
    </div>
  `).join(``),n.cachedCanvases.forEach((t,n)=>{let i=r.querySelector(`.merge-page-thumb[data-file="${e}"][data-page="${n}"]`);i&&(i.firstChild.tagName===`CANVAS`&&i.removeChild(i.firstChild),i.insertBefore(t,i.firstChild))}),r.querySelectorAll(`.merge-view-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=parseInt(e.dataset.file),r=parseInt(e.dataset.page),i=v[n];i&&g({pdfBuffer:i.buffer,pageIndex:r,totalPages:i.pageCount})})}))}function ye(e,t){typeof Sortable>`u`||Sortable.create(e,{animation:200,handle:`.drag-handle`,ghostClass:`sortable-ghost`,dragClass:`sortable-drag`,forceFallback:!0,fallbackOnBody:!0,swapThreshold:.65,onEnd:e=>{let{oldIndex:n,newIndex:r}=e;if(n===r)return;let[i]=v.splice(n,1);v.splice(r,0,i);let a=new Set;y.forEach(e=>{if(e===n)a.add(r);else{let t=e;n<r?e>n&&e<=r&&(t=e-1):e>=r&&e<n&&(t=e+1),a.add(t)}}),y=a,b(t)}})}async function be(){if(v.length<2){X(c(`merge.needTwo`),`error`);return}Q(c(`merge.processing`));try{f(await ie(v.map(e=>e.buffer)),`merged.pdf`),X(c(`merge.success`),`success`)}catch(e){X(c(`common.error`)+`: `+e.message,`error`)}finally{$()}}var xe=e({render:()=>Ce}),x=null,Se=``,S=0,C=new Set,w=[],T=[];function Ce(e){x=null,Se=``,S=0,C=new Set,w=[],T=[],e.innerHTML=`
    <div class="drop-zone" id="delete-drop-zone">
      <input type="file" id="delete-file-input" accept=".pdf" />
      <div class="drop-zone-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
        </svg>
      </div>
      <div class="drop-zone-text">${c(`delete.dropText`)}</div>
      <div class="drop-zone-hint">${c(`delete.reorderHint`)}</div>
    </div>
    <div class="page-grid" id="delete-page-grid"></div>
    <div class="action-bar" id="delete-action-bar" style="display:none;">
      <span class="selection-info" id="delete-info"></span>
      <button class="btn btn-ghost" id="delete-select-all">${c(`delete.selectAll`)}</button>
      <button class="btn btn-ghost" id="delete-deselect-all">${c(`delete.deselectAll`)}</button>
      <button class="btn btn-danger" id="delete-btn" disabled>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
        ${c(`delete.deleteBtn`)}
      </button>
    </div>
  `,we(e)}function we(e){let t=e.querySelector(`#delete-drop-zone`),n=e.querySelector(`#delete-file-input`);t.addEventListener(`dragover`,e=>{e.preventDefault(),t.classList.add(`drag-over`)}),t.addEventListener(`dragleave`,()=>t.classList.remove(`drag-over`)),t.addEventListener(`drop`,n=>{n.preventDefault(),t.classList.remove(`drag-over`);let r=Array.from(n.dataTransfer.files).find(e=>e.type===`application/pdf`||e.name.endsWith(`.pdf`));r&&Te(r,e)}),n.addEventListener(`change`,t=>{t.target.files[0]&&Te(t.target.files[0],e),t.target.value=``}),e.querySelector(`#delete-btn`)?.addEventListener(`click`,()=>De()),e.querySelector(`#delete-select-all`)?.addEventListener(`click`,()=>{for(let e=0;e<S;e++)C.add(e);E(e)}),e.querySelector(`#delete-deselect-all`)?.addEventListener(`click`,()=>{C.clear(),E(e)})}async function Te(e,t){Q(c(`common.loading`));try{x=new Uint8Array(await u(e)),Se=e.name,S=await d(x),C.clear(),w=Array.from({length:S},(e,t)=>t),T=[],t.querySelector(`#delete-drop-zone`).style.display=`none`,t.querySelector(`#delete-action-bar`).style.display=`flex`,await Ee(t),E(t)}catch(e){X(c(`common.readError`)+`: `+e.message,`error`)}finally{$()}}async function Ee(e){let t=e.querySelector(`#delete-page-grid`);T.length===0&&(T=await p(x)),t.innerHTML=w.map((e,t)=>`
    <div class="page-card ${C.has(e)?`selected`:``}" draggable="true" data-display="${t}" data-orig="${e}" id="delete-page-${t}">
      <div class="page-card-overlay">
        <button class="view-btn" data-view="${t}" title="${c(`delete.viewPage`)}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
      <div class="page-canvas-wrapper"></div>
      <div class="page-card-number">${c(`delete.pageNum`,{n:e+1})}</div>
    </div>
  `).join(``),w.forEach((e,n)=>{let r=t.querySelector(`#delete-page-${n} .page-canvas-wrapper`),i=T[e];r.innerHTML=``,r.appendChild(i)}),t.querySelectorAll(`.page-card`).forEach(t=>{t.addEventListener(`click`,n=>{if(n.target.closest(`.view-btn`))return;let r=parseInt(t.dataset.orig);C.has(r)?C.delete(r):C.add(r),E(e)})}),t.querySelectorAll(`.view-btn`).forEach(t=>{t.addEventListener(`click`,n=>{n.stopPropagation();let r=parseInt(t.dataset.view),i=w[r];g({pdfBuffer:x,pageIndex:i,totalPages:S,renderActions:(t,n)=>{let r=C.has(t),i=document.createElement(`button`);i.className=`btn ${r?`btn-danger`:`btn-ghost`}`,i.innerHTML=r?`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg> ${c(`viewer.deselect`)}`:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> ${c(`viewer.select`)}`,i.addEventListener(`click`,()=>{C.has(t)?C.delete(t):C.add(t),E(e),n.innerHTML=``;let r=C.has(t);i.className=`btn ${r?`btn-danger`:`btn-ghost`}`,i.innerHTML=r?`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg> ${c(`viewer.deselect`)}`:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> ${c(`viewer.select`)}`,n.appendChild(i)}),n.appendChild(i)}})})});let n=null;t.querySelectorAll(`.page-card`).forEach(r=>{r.addEventListener(`dragstart`,e=>{n=parseInt(r.dataset.display),r.classList.add(`dragging`),e.dataTransfer.effectAllowed=`move`}),r.addEventListener(`dragend`,()=>{r.classList.remove(`dragging`),t.querySelectorAll(`.page-card`).forEach(e=>e.classList.remove(`drag-over-page`))}),r.addEventListener(`dragover`,e=>{e.preventDefault(),n!==null&&(t.querySelectorAll(`.page-card`).forEach(e=>e.classList.remove(`drag-over-page`)),r.classList.add(`drag-over-page`))}),r.addEventListener(`drop`,t=>{t.preventDefault();let i=parseInt(r.dataset.display);if(n!==null&&n!==i){let[t]=w.splice(n,1);w.splice(i,0,t),Ee(e)}n=null})})}function E(e){let t=e.querySelector(`#delete-page-grid`),n=e.querySelector(`#delete-info`),r=e.querySelector(`#delete-btn`);t.querySelectorAll(`.page-card`).forEach(e=>{let t=parseInt(e.dataset.orig);e.classList.toggle(`selected`,C.has(t))}),n.innerHTML=`${c(`delete.selected`)} <strong>${C.size}</strong> ${c(`delete.of`)} <strong>${S}</strong> ${c(`delete.pagesLabel`)}`,r.disabled=C.size===0||C.size>=S,C.size>=S&&(n.innerHTML+=` <span style="color:var(--warning)">${c(`delete.minWarning`)}</span>`)}async function De(){if(C.size!==0){Q(c(`delete.processing`));try{let e=w.filter(e=>!C.has(e)),t=await ae(x,e);f(t,Se.replace(`.pdf`,`_edited.pdf`));let n=C.size;x=t,S=e.length,w=Array.from({length:S},(e,t)=>t),C.clear(),T=[];let r=document.getElementById(`content-area`);await Ee(r),E(r),X(c(`delete.success`,{n}),`success`)}catch(e){X(c(`common.error`)+`: `+e.message,`error`)}finally{$()}}}var Oe=e({render:()=>Ae}),D=null,ke=``,O=[],k=[];function Ae(e){D=null,ke=``,O=[],k=[],e.innerHTML=`
    <div class="drop-zone" id="reorder-drop-zone">
      <input type="file" id="reorder-file-input" accept=".pdf" />
      <div class="drop-zone-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 2l4 4H8l4-4zM12 22l-4-4h8l-4 4zM2 12l4-4v8l-4-4zM22 12l-4 4V8l4 4z"/>
        </svg>
      </div>
      <div class="drop-zone-text">${c(`reorder.dropText`)}</div>
      <div class="drop-zone-hint">${c(`reorder.dropHint`)}</div>
    </div>
    <div class="page-grid" id="reorder-page-grid"></div>
    <div class="action-bar" id="reorder-action-bar" style="display:none;">
      <span class="selection-info" id="reorder-info"></span>
      <button class="btn btn-ghost" id="reorder-reset">${c(`reorder.reset`)}</button>
      <button class="btn btn-primary" id="reorder-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>
        ${c(`reorder.saveBtn`)}
      </button>
    </div>
  `,je(e)}function je(e){let t=e.querySelector(`#reorder-drop-zone`),n=e.querySelector(`#reorder-file-input`);t.addEventListener(`dragover`,e=>{e.preventDefault(),t.classList.add(`drag-over`)}),t.addEventListener(`dragleave`,()=>t.classList.remove(`drag-over`)),t.addEventListener(`drop`,n=>{n.preventDefault(),t.classList.remove(`drag-over`);let r=Array.from(n.dataTransfer.files).find(e=>e.type===`application/pdf`||e.name.endsWith(`.pdf`));r&&Me(r,e)}),n.addEventListener(`change`,t=>{t.target.files[0]&&Me(t.target.files[0],e),t.target.value=``}),e.querySelector(`#reorder-btn`)?.addEventListener(`click`,()=>Ne()),e.querySelector(`#reorder-reset`)?.addEventListener(`click`,()=>{O=O.map((e,t)=>t),A(e)})}async function Me(e,t){Q(c(`common.loading`));try{D=new Uint8Array(await u(e)),ke=e.name;let n=await d(D);O=Array.from({length:n},(e,t)=>t),k=[],t.querySelector(`#reorder-drop-zone`).style.display=`none`,t.querySelector(`#reorder-action-bar`).style.display=`flex`,await A(t)}catch(e){X(c(`common.readError`)+`: `+e.message,`error`)}finally{$()}}async function A(e){let t=e.querySelector(`#reorder-page-grid`),n=e.querySelector(`#reorder-info`);k.length===0&&(k=await p(D)),n.innerHTML=c(`reorder.info`,{n:`<strong>${O.length}</strong>`}),t.innerHTML=O.map((e,t)=>`
    <div class="page-card" draggable="true" data-display="${t}" id="reorder-page-${t}">
      <div class="page-card-overlay">
        <button class="view-btn" data-view="${t}" title="${c(`reorder.viewPage`)}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
      <div class="page-canvas-wrapper"></div>
      <div class="page-card-number">${c(`reorder.pageNum`,{n:e+1})}</div>
      <div class="page-move-actions">
        <button class="btn-move" data-move-back="${t}" ${t===0?`disabled`:``}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button class="btn-move" data-move-fwd="${t}" ${t===O.length-1?`disabled`:``}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  `).join(``),O.forEach((e,n)=>{let r=t.querySelector(`#reorder-page-${n} .page-canvas-wrapper`),i=k[e];r.innerHTML=``,r.appendChild(i)}),t.querySelectorAll(`.view-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=parseInt(e.dataset.view),r=O[n];g({pdfBuffer:D,pageIndex:r,totalPages:O.length})})}),t.querySelectorAll(`[data-move-back]`).forEach(t=>{t.addEventListener(`click`,n=>{n.stopPropagation();let r=parseInt(t.dataset.moveBack);if(r>0){let[t]=O.splice(r,1);O.splice(r-1,0,t),A(e)}})}),t.querySelectorAll(`[data-move-fwd]`).forEach(t=>{t.addEventListener(`click`,n=>{n.stopPropagation();let r=parseInt(t.dataset.moveFwd);if(r<O.length-1){let[t]=O.splice(r,1);O.splice(r+1,0,t),A(e)}})}),typeof Sortable<`u`&&Sortable.create(t,{animation:200,ghostClass:`sortable-ghost`,dragClass:`sortable-drag`,forceFallback:!0,fallbackOnBody:!0,swapThreshold:.65,onEnd:t=>{let{oldIndex:n,newIndex:r}=t;if(n===r)return;let[i]=O.splice(n,1);O.splice(r,0,i),A(e)}})}async function Ne(){Q(c(`reorder.processing`));try{f(await ae(D,O),ke.replace(`.pdf`,`_reordered.pdf`)),X(c(`reorder.success`),`success`)}catch(e){X(c(`common.error`)+`: `+e.message,`error`)}finally{$()}}var Pe=e({render:()=>Ie}),j=null,Fe=``,M=0,N=[{start:1,end:1}];function Ie(e){j=null,Fe=``,M=0,N=[{start:1,end:1}],e.innerHTML=`
    <div class="drop-zone" id="split-drop-zone">
      <input type="file" id="split-file-input" accept=".pdf" />
      <div class="drop-zone-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="18" rx="1"/>
        </svg>
      </div>
      <div class="drop-zone-text">${c(`split.dropText`)}</div>
      <div class="drop-zone-hint">${c(`split.dropHint`)}</div>
    </div>
    <div class="page-grid" id="split-page-grid" style="margin-bottom:4px;"></div>
    <div id="split-config-area"></div>
  `,Le(e)}function Le(e){let t=e.querySelector(`#split-drop-zone`),n=e.querySelector(`#split-file-input`);t.addEventListener(`dragover`,e=>{e.preventDefault(),t.classList.add(`drag-over`)}),t.addEventListener(`dragleave`,()=>t.classList.remove(`drag-over`)),t.addEventListener(`drop`,n=>{n.preventDefault(),t.classList.remove(`drag-over`);let r=Array.from(n.dataTransfer.files).find(e=>e.type===`application/pdf`||e.name.endsWith(`.pdf`));r&&Re(r,e)}),n.addEventListener(`change`,t=>{t.target.files[0]&&Re(t.target.files[0],e),t.target.value=``})}async function Re(e,t){Q(c(`common.loading`));try{j=new Uint8Array(await u(e)),Fe=e.name,M=await d(j),N=[{start:1,end:M}],t.querySelector(`#split-drop-zone`).style.display=`none`,await ze(t),Be(t)}catch(e){X(c(`common.readError`)+`: `+e.message,`error`)}finally{$()}}async function ze(e){let t=e.querySelector(`#split-page-grid`),n=await p(j);t.innerHTML=n.map((e,t)=>`
    <div class="page-card" data-page="${t}" id="split-page-${t}" style="cursor:default;">
      <div class="page-card-overlay">
        <button class="view-btn" data-view="${t}" title="${c(`split.viewPage`)}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
      <div class="page-canvas-wrapper"></div>
      <div class="page-card-number">${c(`delete.pageNum`,{n:t+1})}</div>
    </div>
  `).join(``),n.forEach((e,n)=>{t.querySelector(`#split-page-${n} .page-canvas-wrapper`).appendChild(e)}),t.querySelectorAll(`.view-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=parseInt(e.dataset.view);g({pdfBuffer:j,pageIndex:n,totalPages:M})})})}function Be(e){let t=e.querySelector(`#split-config-area`);t.innerHTML=`
    <div class="split-config">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
        <div>
          <h3 style="font-size:1.05rem;font-weight:600;">${Fe}</h3>
          <p style="color:var(--text-muted);font-size:0.85rem;margin-top:4px;">${c(`split.totalPages`,{n:M})}</p>
        </div>
        <button class="btn btn-ghost" id="split-even-btn">${c(`split.splitEvery`)}</button>
      </div>
      <label>${c(`split.rangeLabel`)}</label>
      <div class="range-group" id="split-ranges"></div>
      <div style="display:flex;gap:8px;margin-top:12px;">
        <button class="btn btn-ghost" id="split-add-range">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
          ${c(`split.addRange`)}
        </button>
      </div>
    </div>
    <div class="action-bar" style="margin-top:16px;">
      <span class="selection-info" id="split-info"></span>
      <button class="btn btn-primary" id="split-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="18" rx="1"/></svg>
        ${c(`split.splitBtn`)}
      </button>
    </div>
  `,Ve(t),t.querySelector(`#split-add-range`).addEventListener(`click`,()=>{N.push({start:1,end:M}),Ve(t)}),t.querySelector(`#split-even-btn`).addEventListener(`click`,()=>{N=[];for(let e=1;e<=M;e++)N.push({start:e,end:e});Ve(t)}),t.querySelector(`#split-btn`).addEventListener(`click`,()=>Ue()),He(t)}function Ve(e){let t=e.querySelector(`#split-ranges`);t.innerHTML=N.map((e,t)=>`
    <div class="range-row">
      <span>${c(`split.file`)} ${t+1}:</span>
      <input type="number" min="1" max="${M}" value="${e.start}" data-range="${t}" data-field="start" />
      <span>${c(`split.to`)}</span>
      <input type="number" min="1" max="${M}" value="${e.end}" data-range="${t}" data-field="end" />
      ${N.length>1?`<button class="btn-icon danger" data-remove-range="${t}" title="${c(`split.removeRange`)}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>`:``}
    </div>
  `).join(``),t.querySelectorAll(`input`).forEach(t=>{t.addEventListener(`change`,()=>{let n=parseInt(t.dataset.range);N[n][t.dataset.field]=parseInt(t.value)||1,He(e)})}),t.querySelectorAll(`[data-remove-range]`).forEach(t=>{t.addEventListener(`click`,()=>{N.splice(parseInt(t.dataset.removeRange),1),Ve(e)})}),He(e)}function He(e){let t=e.querySelector(`#split-info`);t.innerHTML=c(`split.info`,{n:`<strong>${N.length}</strong>`})}async function Ue(){for(let e=0;e<N.length;e++){let t=N[e];if(t.start<1||t.end>M||t.start>t.end){X(c(`split.invalidRange`,{n:e+1,max:M}),`error`);return}}Q(c(`split.processing`));try{let e=N.map(e=>({start:e.start-1,end:e.end-1})),t=await oe(j,e);t.forEach((e,t)=>{f(e,`${Fe.replace(`.pdf`,``)}_part${t+1}.pdf`)}),X(c(`split.success`,{n:t.length}),`success`)}catch(e){X(c(`common.error`)+`: `+e.message,`error`)}finally{$()}}var We=e({render:()=>Ke}),P=null,Ge=``,F=0,I=new Map;function Ke(e){P=null,Ge=``,F=0,I=new Map,e.innerHTML=`
    <div class="drop-zone" id="rotate-drop-zone">
      <input type="file" id="rotate-file-input" accept=".pdf" />
      <div class="drop-zone-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M1 4v6h6M23 20v-6h-6"/>
          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
        </svg>
      </div>
      <div class="drop-zone-text">${c(`rotate.dropText`)}</div>
      <div class="drop-zone-hint">${c(`rotate.dropHint`)}</div>
    </div>
    <div class="page-grid" id="rotate-page-grid"></div>
    <div class="action-bar" id="rotate-action-bar" style="display:none;">
      <span class="selection-info" id="rotate-info"></span>
      <button class="btn btn-ghost" id="rotate-all-90">${c(`rotate.allRotate90`)}</button>
      <button class="btn btn-ghost" id="rotate-reset">${c(`rotate.reset`)}</button>
      <button class="btn btn-primary" id="rotate-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>
        ${c(`rotate.saveBtn`)}
      </button>
    </div>
  `,qe(e)}function qe(e){let t=e.querySelector(`#rotate-drop-zone`),n=e.querySelector(`#rotate-file-input`);t.addEventListener(`dragover`,e=>{e.preventDefault(),t.classList.add(`drag-over`)}),t.addEventListener(`dragleave`,()=>t.classList.remove(`drag-over`)),t.addEventListener(`drop`,n=>{n.preventDefault(),t.classList.remove(`drag-over`);let r=Array.from(n.dataTransfer.files).find(e=>e.type===`application/pdf`||e.name.endsWith(`.pdf`));r&&Je(r,e)}),n.addEventListener(`change`,t=>{t.target.files[0]&&Je(t.target.files[0],e),t.target.value=``}),e.querySelector(`#rotate-btn`)?.addEventListener(`click`,()=>Xe()),e.querySelector(`#rotate-all-90`)?.addEventListener(`click`,()=>{for(let e=0;e<F;e++)I.set(e,((I.get(e)||0)+90)%360);L(e)}),e.querySelector(`#rotate-reset`)?.addEventListener(`click`,()=>{I.clear(),L(e)})}async function Je(e,t){Q(c(`common.loading`));try{P=new Uint8Array(await u(e)),Ge=e.name,F=await d(P),I.clear(),t.querySelector(`#rotate-drop-zone`).style.display=`none`,t.querySelector(`#rotate-action-bar`).style.display=`flex`,await Ye(t),L(t)}catch(e){X(c(`common.readError`)+`: `+e.message,`error`)}finally{$()}}async function Ye(e){let t=e.querySelector(`#rotate-page-grid`),n=await p(P);t.innerHTML=n.map((e,t)=>`
    <div class="page-card" data-page="${t}" id="rotate-page-${t}" title="${c(`rotate.dropHint`)}">
      <div class="page-card-overlay">
        <button class="view-btn" data-view="${t}" title="${c(`rotate.viewPage`)}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
      <div class="page-canvas-wrapper" style="transition:transform 0.3s ease;"></div>
      <div class="page-card-number">${c(`rotate.pageNum`,{n:t+1})}</div>
    </div>
  `).join(``),n.forEach((e,n)=>{t.querySelector(`#rotate-page-${n} .page-canvas-wrapper`).appendChild(e)}),t.querySelectorAll(`.page-card`).forEach(t=>{t.addEventListener(`click`,n=>{if(n.target.closest(`.view-btn`))return;let r=parseInt(t.dataset.page);I.set(r,((I.get(r)||0)+90)%360),L(e)})}),t.querySelectorAll(`.view-btn`).forEach(t=>{t.addEventListener(`click`,n=>{n.stopPropagation();let r=parseInt(t.dataset.view);g({pdfBuffer:P,pageIndex:r,totalPages:F,renderActions:(t,n)=>{let r=document.createElement(`button`);r.className=`btn btn-ghost`,r.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg> ${c(`viewer.rotate`)}`,r.addEventListener(`click`,()=>{I.set(t,((I.get(t)||0)+90)%360),L(e)}),n.appendChild(r)}})})})}function L(e){let t=e.querySelector(`#rotate-page-grid`),n=e.querySelector(`#rotate-info`);n.innerHTML=`<strong>${Array.from(I.values()).filter(e=>e!==0).length}</strong> ${c(`rotate.info`,{n:``}).trim()}`,t.querySelectorAll(`.page-card`).forEach(e=>{let t=parseInt(e.dataset.page),n=I.get(t)||0;e.querySelector(`.page-canvas-wrapper`).style.transform=`rotate(${n}deg)`;let r=e.querySelector(`.rotate-badge`);n===0?(r&&r.remove(),e.classList.remove(`selected`)):(r||(r=document.createElement(`div`),r.className=`rotate-badge`,e.appendChild(r)),r.textContent=`${n}°`,e.classList.add(`selected`))})}async function Xe(){let e=new Map;if(I.forEach((t,n)=>{t!==0&&e.set(n,t)}),e.size===0){X(c(`rotate.noRotation`),`info`);return}Q(c(`rotate.processing`));try{f(await se(P,e),Ge.replace(`.pdf`,`_rotated.pdf`)),X(c(`rotate.success`,{n:e.size}),`success`)}catch(e){X(c(`common.error`)+`: `+e.message,`error`)}finally{$()}}var Ze=e({render:()=>$e}),R=null,Qe=``,z=0,B=new Set;function $e(e){R=null,Qe=``,z=0,B=new Set,e.innerHTML=`
    <div class="drop-zone" id="extract-drop-zone">
      <input type="file" id="extract-file-input" accept=".pdf" />
      <div class="drop-zone-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3"/>
        </svg>
      </div>
      <div class="drop-zone-text">${c(`extract.dropText`)}</div>
      <div class="drop-zone-hint">${c(`extract.dropHint`)}</div>
    </div>
    <div class="page-grid" id="extract-page-grid"></div>
    <div class="action-bar" id="extract-action-bar" style="display:none;">
      <span class="selection-info" id="extract-info"></span>
      <button class="btn btn-ghost" id="extract-select-all">${c(`extract.selectAll`)}</button>
      <button class="btn btn-ghost" id="extract-deselect-all">${c(`extract.deselectAll`)}</button>
      <button class="btn btn-primary" id="extract-btn" disabled>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 18v-6M9 15l3 3 3-3"/><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
        ${c(`extract.extractBtn`)}
      </button>
    </div>
  `,et(e)}function et(e){let t=e.querySelector(`#extract-drop-zone`),n=e.querySelector(`#extract-file-input`);t.addEventListener(`dragover`,e=>{e.preventDefault(),t.classList.add(`drag-over`)}),t.addEventListener(`dragleave`,()=>t.classList.remove(`drag-over`)),t.addEventListener(`drop`,n=>{n.preventDefault(),t.classList.remove(`drag-over`);let r=Array.from(n.dataTransfer.files).find(e=>e.type===`application/pdf`||e.name.endsWith(`.pdf`));r&&tt(r,e)}),n.addEventListener(`change`,t=>{t.target.files[0]&&tt(t.target.files[0],e),t.target.value=``}),e.querySelector(`#extract-btn`)?.addEventListener(`click`,()=>rt()),e.querySelector(`#extract-select-all`)?.addEventListener(`click`,()=>{for(let e=0;e<z;e++)B.add(e);V(e)}),e.querySelector(`#extract-deselect-all`)?.addEventListener(`click`,()=>{B.clear(),V(e)})}async function tt(e,t){Q(c(`common.loading`));try{R=new Uint8Array(await u(e)),Qe=e.name,z=await d(R),B.clear(),t.querySelector(`#extract-drop-zone`).style.display=`none`,t.querySelector(`#extract-action-bar`).style.display=`flex`,await nt(t),V(t)}catch(e){X(c(`common.readError`)+`: `+e.message,`error`)}finally{$()}}async function nt(e){let t=e.querySelector(`#extract-page-grid`),n=await p(R);t.innerHTML=n.map((e,t)=>`
    <div class="page-card" data-page="${t}" id="extract-page-${t}">
      <div class="page-card-overlay">
        <button class="view-btn" data-view="${t}" title="${c(`extract.viewPage`)}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
      <div class="page-canvas-wrapper"></div>
      <div class="page-card-number">${c(`extract.pageNum`,{n:t+1})}</div>
    </div>
  `).join(``),n.forEach((e,n)=>{t.querySelector(`#extract-page-${n} .page-canvas-wrapper`).appendChild(e)}),t.querySelectorAll(`.page-card`).forEach(t=>{t.addEventListener(`click`,n=>{if(n.target.closest(`.view-btn`))return;let r=parseInt(t.dataset.page);B.has(r)?B.delete(r):B.add(r),V(e)})}),t.querySelectorAll(`.view-btn`).forEach(t=>{t.addEventListener(`click`,n=>{n.stopPropagation();let r=parseInt(t.dataset.view);g({pdfBuffer:R,pageIndex:r,totalPages:z,renderActions:(t,n)=>{let r=B.has(t),i=document.createElement(`button`);i.className=`btn ${r?`btn-primary`:`btn-ghost`}`,i.innerHTML=r?`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> ${c(`viewer.deselect`)}`:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg> ${c(`viewer.select`)}`,i.addEventListener(`click`,()=>{B.has(t)?B.delete(t):B.add(t),V(e);let n=B.has(t);i.className=`btn ${n?`btn-primary`:`btn-ghost`}`,i.innerHTML=n?`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> ${c(`viewer.deselect`)}`:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg> ${c(`viewer.select`)}`}),n.appendChild(i)}})})})}function V(e){let t=e.querySelector(`#extract-page-grid`),n=e.querySelector(`#extract-info`),r=e.querySelector(`#extract-btn`);t.querySelectorAll(`.page-card`).forEach(e=>{let t=parseInt(e.dataset.page);e.classList.toggle(`selected`,B.has(t))}),n.innerHTML=`${c(`extract.selected`)} <strong>${B.size}</strong> ${c(`extract.of`)} <strong>${z}</strong> ${c(`extract.pagesLabel`)}`,r.disabled=B.size===0}async function rt(){if(B.size!==0){Q(c(`extract.processing`));try{let e=Array.from(B).sort((e,t)=>e-t);f(await ce(R,e),Qe.replace(`.pdf`,`_extracted.pdf`)),X(c(`extract.success`,{n:e.length}),`success`)}catch(e){X(c(`common.error`)+`: `+e.message,`error`)}finally{$()}}}var it=e({render:()=>st}),at=[{id:`organize`,icon:`organize`,color:`#6366F1`},{id:`merge`,icon:`merge`,color:`#6C5CE7`},{id:`delete`,icon:`delete`,color:`#EF4444`},{id:`reorder`,icon:`reorder`,color:`#F59E0B`},{id:`split`,icon:`split`,color:`#10B981`},{id:`rotate`,icon:`rotate`,color:`#3B82F6`},{id:`extract`,icon:`extract`,color:`#A855F7`},{id:`img2pdf`,icon:`img2pdf`,color:`#EC4899`},{id:`compress`,icon:`compress`,color:`#F97316`}],ot={merge:`<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/><path d="M12 8v8M8 12h8"/></svg>`,delete:`<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>`,reorder:`<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l4 4H8l4-4zM12 22l-4-4h8l-4 4zM2 12l4-4v8l-4-4zM22 12l-4 4V8l4 4z"/></svg>`,split:`<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="18" rx="1"/></svg>`,rotate:`<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>`,extract:`<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3"/></svg>`,organize:`<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,img2pdf:`<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,compress:`<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 14l6-6 6 6M4 10l6-6 6 6"/><path d="M10 4v16"/></svg>`};function st(e){e.innerHTML=`
    <div class="dashboard-hero">
      <h1 class="hero-title">${c(`dashboard.welcome`)}</h1>
      <p class="hero-sub">${c(`dashboard.sub`)}</p>
    </div>
    <div class="dashboard-grid">
      ${at.map(e=>`
        <div class="tool-card glass" data-feature="${e.id}">
          <div class="tool-icon-circle" style="background: ${e.color}15; color: ${e.color}">
            ${ot[e.id]}
          </div>
          <div class="tool-info">
            <h3 class="tool-name">${c(`nav.${e.id}`)}</h3>
            <p class="tool-desc">${c(`${e.id}.title`)}</p>
          </div>
          <div class="tool-arrow">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>
      `).join(``)}
    </div>
    
    <div class="security-info-box glass">
       <div class="sib-icon">🔒</div>
       <div class="sib-text">
          <h4>${c(`security.badge`)}</h4>
          <p>${c(`security.desc`)}</p>
       </div>
    </div>
  `,e.querySelectorAll(`.tool-card`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.feature;window.dispatchEvent(new CustomEvent(`load-feature`,{detail:t}))})})}var ct=e({render:()=>ut}),H=null,lt=``,U=0,W=[];function ut(e){H=null,lt=``,U=0,W=[],e.innerHTML=`
    <div class="drop-zone" id="org-drop-zone">
      <input type="file" id="org-file-input" accept=".pdf" />
      <div class="drop-zone-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
           <path d="M12 2l4 4H8l4-4zM12 22l-4-4h8l-4 4zM2 12l4-4v8l-4-4zM22 12l-4 4V8l4 4z"/>
        </svg>
      </div>
      <div class="drop-zone-text">${c(`reorder.dropText`)}</div>
      <div class="drop-zone-hint">${c(`delete.reorderHint`)}</div>
    </div>
    <div class="page-grid" id="org-page-grid"></div>
    <div class="action-bar" id="org-action-bar" style="display:none;">
      <span class="selection-info" id="org-info"></span>
      <button class="btn btn-ghost" id="org-reset">${c(`reorder.reset`)}</button>
      <button class="btn btn-primary" id="org-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>
        ${c(`reorder.saveBtn`)}
      </button>
    </div>
  `,dt(e)}function dt(e){let t=e.querySelector(`#org-drop-zone`),n=e.querySelector(`#org-file-input`);t.addEventListener(`dragover`,e=>{e.preventDefault(),t.classList.add(`drag-over`)}),t.addEventListener(`dragleave`,()=>t.classList.remove(`drag-over`)),t.addEventListener(`drop`,n=>{n.preventDefault(),t.classList.remove(`drag-over`);let r=Array.from(n.dataTransfer.files).find(e=>e.type===`application/pdf`||e.name.endsWith(`.pdf`));r&&pt(r,e)}),n.addEventListener(`change`,t=>{t.target.files[0]&&pt(t.target.files[0],e),t.target.value=``}),e.querySelector(`#org-btn`)?.addEventListener(`click`,()=>ht()),e.querySelector(`#org-reset`)?.addEventListener(`click`,()=>{ft(),K(e),G(e)})}function ft(){W=[];for(let e=0;e<U;e++)W.push({originalIndex:e,rotation:0,isDeleted:!1})}async function pt(e,t){Q(c(`common.loading`));try{H=new Uint8Array(await u(e)),lt=e.name,U=await d(H),ft(),t.querySelector(`#org-drop-zone`).style.display=`none`,t.querySelector(`#org-action-bar`).style.display=`flex`,await G(t),K(t)}catch(e){X(c(`common.readError`)+`: `+e.message,`error`)}finally{$()}}async function G(e){let t=e.querySelector(`#org-page-grid`),n=await p(H);t.innerHTML=W.map((e,t)=>`
    <div class="page-card org-card" data-index="${t}" id="org-page-${t}" draggable="true">
      <div class="page-card-overlay">
        <button class="view-btn" data-view="${t}" title="${c(`common.viewPage`)}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
        <button class="org-action-btn rotate-btn" data-rotate="${t}" title="${c(`viewer.rotate`)}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
        </button>
        <button class="org-action-btn delete-btn" data-delete="${t}" title="${c(`viewer.delete`)}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </div>
      <div class="page-canvas-wrapper" style="transition:transform 0.3s ease;"></div>
      <div class="page-card-number">${e.originalIndex+1}</div>
      <div class="page-move-actions">
        <button class="btn-move" data-move-back="${t}" ${t===0?`disabled`:``}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button class="btn-move" data-move-fwd="${t}" ${t===W.length-1?`disabled`:``}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  `).join(``),W.forEach((e,r)=>{let i=t.querySelector(`#org-page-${r}`);i.querySelector(`.page-canvas-wrapper`).appendChild(n[e.originalIndex]),e.rotation!==0&&(i.querySelector(`.page-canvas-wrapper`).style.transform=`rotate(${e.rotation}deg)`)}),mt(t,e)}function mt(e,t){typeof Sortable<`u`&&Sortable.create(e,{animation:200,ghostClass:`sortable-ghost`,dragClass:`sortable-drag`,forceFallback:!0,fallbackOnBody:!0,swapThreshold:.65,onEnd:e=>{let{oldIndex:n,newIndex:r}=e;if(n===r)return;let[i]=W.splice(n,1);W.splice(r,0,i),G(t),K(t)}}),e.querySelectorAll(`.org-card`).forEach(e=>{e.querySelector(`.rotate-btn`).addEventListener(`click`,n=>{n.stopPropagation();let r=parseInt(e.dataset.index);W[r].rotation=(W[r].rotation+90)%360,G(t),K(t)}),e.querySelector(`.delete-btn`).addEventListener(`click`,n=>{n.stopPropagation();let r=parseInt(e.dataset.index);if(W.filter(e=>!e.isDeleted).length<=1&&!W[r].isDeleted){X(c(`common.deleteAll`),`error`);return}W[r].isDeleted=!W[r].isDeleted,e.classList.toggle(`is-deleted`,W[r].isDeleted),K(t)}),e.querySelector(`.view-btn`).addEventListener(`click`,t=>{t.stopPropagation();let n=parseInt(e.dataset.index);g({pdfBuffer:H,pageIndex:W[n].originalIndex,totalPages:U})}),e.querySelector(`[data-move-back]`)?.addEventListener(`click`,n=>{n.stopPropagation();let r=parseInt(e.dataset.index);if(r>0){let[e]=W.splice(r,1);W.splice(r-1,0,e),G(t),K(t)}}),e.querySelector(`[data-move-fwd]`)?.addEventListener(`click`,n=>{n.stopPropagation();let r=parseInt(e.dataset.index);if(r<W.length-1){let[e]=W.splice(r,1);W.splice(r+1,0,e),G(t),K(t)}})})}function K(e){let t=e.querySelector(`#org-info`);t.innerHTML=`<strong>${W.filter(e=>!e.isDeleted).length}</strong> ${c(`delete.pagesLabel`)} · ${c(`reorder.dragReorder`)}`,e.querySelectorAll(`.org-card`).forEach(e=>{let t=parseInt(e.dataset.index);e.style.opacity=W[t].isDeleted?`0.3`:`1`,e.style.filter=W[t].isDeleted?`grayscale(1)`:`none`})}async function ht(){let e=W.filter(e=>!e.isDeleted);if(e.length!==0){Q(c(`reorder.processing`));try{let t=e.map(e=>e.originalIndex),n=await ae(H,t),r=new Map;e.forEach((e,t)=>{e.rotation!==0&&r.set(t,e.rotation)}),r.size>0&&(n=await se(n,r)),f(n,lt.replace(`.pdf`,`_organized.pdf`)),X(c(`reorder.success`),`success`)}catch(e){X(c(`common.error`)+`: `+e.message,`error`)}finally{$()}}}var gt=e({render:()=>_t}),q=[];function _t(e){q=[],e.innerHTML=`
    <div class="drop-zone" id="img-drop-zone">
      <input type="file" id="img-file-input" accept="image/jpeg,image/png" multiple />
      <div class="drop-zone-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
           <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
        </svg>
      </div>
      <div class="drop-zone-text">${c(`img2pdf.dropText`)}</div>
      <div class="drop-zone-hint">${c(`img2pdf.dropHint`)}</div>
    </div>
    <div class="page-grid" id="img-grid"></div>
    <div class="action-bar" id="img-action-bar" style="display:none;">
      <span class="selection-info" id="img-info"></span>
      <button class="btn btn-ghost" id="img-clear-btn">${c(`merge.clearAll`)}</button>
      <button class="btn btn-primary" id="img-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3"/></svg>
        ${c(`img2pdf.btn`)}
      </button>
    </div>
  `,vt(e)}function vt(e){let t=e.querySelector(`#img-drop-zone`),n=e.querySelector(`#img-file-input`);t.addEventListener(`dragover`,e=>{e.preventDefault(),t.classList.add(`drag-over`)}),t.addEventListener(`dragleave`,()=>t.classList.remove(`drag-over`)),t.addEventListener(`drop`,n=>{n.preventDefault(),t.classList.remove(`drag-over`),yt(n.dataTransfer.files,e)}),n.addEventListener(`change`,t=>{yt(t.target.files,e),t.target.value=``}),e.querySelector(`#img-btn`)?.addEventListener(`click`,()=>St()),e.querySelector(`#img-clear-btn`)?.addEventListener(`click`,()=>{q=[],J(e)})}async function yt(e,t){let n=Array.from(e).filter(e=>e.type.startsWith(`image/`));if(n.length!==0){for(let e of n){let t=await bt(e);q.push({name:e.name,size:e.size,type:e.type,dataUrl:t})}J(t)}}function bt(e){return new Promise(t=>{let n=new FileReader;n.onload=()=>t(n.result),n.readAsDataURL(e)})}function J(e){let t=e.querySelector(`#img-grid`),n=e.querySelector(`#img-action-bar`),r=e.querySelector(`#img-info`);if(q.length===0){t.innerHTML=``,n.style.display=`none`;return}n.style.display=`flex`,r.innerHTML=`<strong>${q.length}</strong> ${c(`merge.files`)} · ${c(`reorder.dragReorder`)}`,t.innerHTML=q.map((e,t)=>`
    <div class="page-card" draggable="true" data-index="${t}" id="img-card-${t}">
      <div class="page-canvas-wrapper">
        <img src="${e.dataUrl}" style="width:100%; height:100%; object-fit:cover;" />
      </div>
      <div class="page-card-number">${t+1}</div>
      <button class="btn-icon danger" style="position:absolute; top:8px; right:8px; z-index:10; background:rgba(0,0,0,0.5); border-radius:50%;" data-remove="${t}">
         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
      <div class="page-move-actions">
        <button class="btn-move" data-move-back="${t}" ${t===0?`disabled`:``}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button class="btn-move" data-move-fwd="${t}" ${t===q.length-1?`disabled`:``}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  `).join(``),t.querySelectorAll(`[data-remove]`).forEach(t=>{t.addEventListener(`click`,n=>{n.stopPropagation(),q.splice(parseInt(t.dataset.remove),1),J(e)})}),t.querySelectorAll(`[data-move-back]`).forEach(t=>{t.addEventListener(`click`,n=>{n.stopPropagation();let r=parseInt(t.dataset.moveBack);if(r>0){let[t]=q.splice(r,1);q.splice(r-1,0,t),J(e)}})}),t.querySelectorAll(`[data-move-fwd]`).forEach(t=>{t.addEventListener(`click`,n=>{n.stopPropagation();let r=parseInt(t.dataset.moveFwd);if(r<q.length-1){let[t]=q.splice(r,1);q.splice(r+1,0,t),J(e)}})}),xt(t,e)}function xt(e,t){typeof Sortable<`u`&&Sortable.create(e,{animation:200,ghostClass:`sortable-ghost`,dragClass:`sortable-drag`,forceFallback:!0,fallbackOnBody:!0,swapThreshold:.65,onEnd:e=>{let{oldIndex:n,newIndex:r}=e;if(n===r)return;let[i]=q.splice(n,1);q.splice(r,0,i),J(t)}})}async function St(){if(q.length!==0){Q(c(`common.loading`));try{let e=await n.create();for(let t of q){let n=await fetch(t.dataUrl).then(e=>e.arrayBuffer()),r;if(t.type===`image/jpeg`)r=await e.embedJpg(n);else if(t.type===`image/png`)r=await e.embedPng(n);else continue;e.addPage([r.width,r.height]).drawImage(r,{x:0,y:0,width:r.width,height:r.height})}f(await e.save(),`images_to_pdf.pdf`),X(c(`merge.success`),`success`)}catch(e){X(c(`common.error`)+`: `+e.message,`error`)}finally{$()}}}var Ct=e({render:()=>Dt}),wt=null,Tt=``,Et=0;function Dt(e){wt=null,e.innerHTML=`
    <div class="drop-zone" id="comp-drop-zone">
      <input type="file" id="comp-file-input" accept=".pdf" />
      <div class="drop-zone-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
           <path d="M4 14l6-6 6 6M4 10l6-6 6 6"/><path d="M10 4v16"/>
        </svg>
      </div>
      <div class="drop-zone-text">${c(`compress.dropText`)}</div>
      <div class="drop-zone-hint">${c(`compress.dropHint`)}</div>
    </div>
    <div id="comp-result" style="display:none; margin-top:20px;">
       <div class="file-card glass">
          <div class="file-card-icon">📄</div>
          <div class="file-card-info">
             <div class="file-card-name" id="comp-file-name"></div>
             <div class="file-card-meta" id="comp-file-meta"></div>
          </div>
       </div>
       <div class="action-bar">
          <button class="btn btn-primary" id="comp-btn" style="width:100%">${c(`compress.btn`)}</button>
       </div>
    </div>
  `,Ot(e)}function Ot(e){let t=e.querySelector(`#comp-drop-zone`),n=e.querySelector(`#comp-file-input`);t.addEventListener(`dragover`,e=>{e.preventDefault(),t.classList.add(`drag-over`)}),t.addEventListener(`dragleave`,()=>t.classList.remove(`drag-over`)),t.addEventListener(`drop`,n=>{n.preventDefault(),t.classList.remove(`drag-over`),n.dataTransfer.files[0]&&kt(n.dataTransfer.files[0],e)}),n.addEventListener(`change`,t=>{t.target.files[0]&&kt(t.target.files[0],e)}),e.querySelector(`#comp-btn`)?.addEventListener(`click`,()=>At())}async function kt(e,t){wt=new Uint8Array(await u(e)),Tt=e.name,Et=e.size,t.querySelector(`#comp-drop-zone`).style.display=`none`,t.querySelector(`#comp-result`).style.display=`block`,t.querySelector(`#comp-file-name`).textContent=Tt,t.querySelector(`#comp-file-meta`).textContent=re(Et)}async function At(){Q(c(`compress.processing`));try{let e=await(await n.load(wt)).save({useObjectStreams:!0,addDefaultPage:!1}),t=e.length,r=((Et-t)/Et*100).toFixed(1);f(e,Tt.replace(`.pdf`,`_compressed.pdf`)),X(c(`compress.success`,{n:r>0?r:0}),`success`)}catch(e){X(c(`common.error`)+`: `+e.message,`error`)}finally{$()}}var jt={home:{module:it,titleKey:`nav.home`},organize:{module:ct,titleKey:`nav.organize`},img2pdf:{module:gt,titleKey:`nav.img2pdf`},compress:{module:Ct,titleKey:`nav.compress`},merge:{module:me,titleKey:`nav.merge`},delete:{module:xe,titleKey:`nav.delete`},reorder:{module:Oe,titleKey:`nav.reorder`},split:{module:Pe,titleKey:`nav.split`},rotate:{module:We,titleKey:`nav.rotate`},extract:{module:Ze,titleKey:`nav.extract`}},Mt=`home`;document.addEventListener(`DOMContentLoaded`,()=>{It(),Rt(),Pt(),Nt(),Lt(`home`),window.addEventListener(`load-feature`,e=>{Lt(e.detail)}),l(()=>{Nt(),Lt(Mt)})});function Nt(){for(let[e,t]of Object.entries({"nav-home":`nav.home`,"nav-organize":`nav.organize`,"nav-img2pdf":`nav.img2pdf`,"nav-compress":`nav.compress`,"nav-merge":`nav.merge`,"nav-delete":`nav.delete`,"nav-reorder":`nav.reorder`,"nav-split":`nav.split`,"nav-rotate":`nav.rotate`,"nav-extract":`nav.extract`})){let n=document.getElementById(e);if(n){let e=n.querySelector(`span`);e&&(e.textContent=c(t))}}let e=document.getElementById(`security-badge`);if(e){let t=e.querySelector(`span`);t&&(t.textContent=c(`security.badge`))}Ft()}function Pt(){let e=document.getElementById(`top-bar-actions`),t=document.createElement(`button`);t.className=`lang-toggle`,t.id=`lang-toggle-btn`,t.addEventListener(`click`,e=>{e.stopPropagation(),ne()}),e.appendChild(t),Ft()}function Ft(){let e=document.getElementById(`lang-toggle-btn`);e&&(e.innerHTML=ee()===`th`?`<span class="active-lang">TH</span> / <span>EN</span>`:`<span>TH</span> / <span class="active-lang">EN</span>`)}function It(){document.getElementById(`sidebar-nav`).querySelectorAll(`.nav-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.feature;t&&t!==Mt&&Lt(t)})})}function Lt(e){Mt=e;let t=jt[e];if(!t)return;document.querySelectorAll(`.nav-btn`).forEach(t=>{t.classList.toggle(`active`,t.dataset.feature===e)}),document.getElementById(`page-title`).textContent=c(t.titleKey);let n=document.getElementById(`content-area`);n.innerHTML=``,t.module.render(n),document.getElementById(`sidebar`).classList.remove(`open`)}function Rt(){let e=document.getElementById(`menu-toggle`),t=document.getElementById(`sidebar`);e.addEventListener(`click`,()=>{t.classList.toggle(`open`)}),document.addEventListener(`click`,n=>{window.innerWidth<=768&&t.classList.contains(`open`)&&!t.contains(n.target)&&!e.contains(n.target)&&t.classList.remove(`open`)})}var Y=null;function X(e,t=`info`){Y||(Y=document.createElement(`div`),Y.className=`toast-container`,document.body.appendChild(Y));let n={success:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`,error:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>`,info:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>`},r=document.createElement(`div`);r.className=`toast ${t}`,r.innerHTML=`${n[t]||n.info}<span>${e}</span>`,Y.appendChild(r),setTimeout(()=>{r.style.opacity=`0`,r.style.transform=`translateX(40px)`,r.style.transition=`all 0.3s ease`,setTimeout(()=>r.remove(),300)},4e3)}var Z=null;function Q(e=`Processing...`){Z||(Z=document.createElement(`div`),Z.className=`loading-overlay`,Z.innerHTML=`
    <div class="loading-spinner"></div>
    <div class="loading-text">${e}</div>
  `,document.body.appendChild(Z))}function $(){Z&&=(Z.remove(),null)}