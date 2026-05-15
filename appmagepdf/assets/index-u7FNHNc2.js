import{n as e}from"./rolldown-runtime-S-ySWqyJ.js";import{n as t,t as n}from"./pdflib-qVFFl0zM.js";import{n as r,t as i}from"./pdfjs-ChQ4HP4S.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var a={th:{"nav.merge":`รวมไฟล์ PDF`,"nav.delete":`ลบหน้า`,"nav.reorder":`จัดเรียงหน้า`,"nav.split":`แยกไฟล์ PDF`,"nav.rotate":`หมุนหน้า`,"nav.extract":`แยกหน้าที่เลือก`,"security.badge":`ประมวลผลในเครื่องเท่านั้น`,"merge.title":`รวมไฟล์ PDF`,"merge.dropText":`ลากไฟล์ PDF มาวางที่นี่ หรือคลิกเพื่อเลือก`,"merge.dropHint":`รองรับหลายไฟล์พร้อมกัน`,"merge.files":`ไฟล์`,"merge.totalPages":`หน้ารวม`,"merge.clearAll":`ล้างทั้งหมด`,"merge.mergeBtn":`รวมไฟล์ PDF`,"merge.needTwo":`ต้องมีอย่างน้อย 2 ไฟล์เพื่อรวม`,"merge.processing":`กำลังรวมไฟล์ PDF...`,"merge.success":`รวมไฟล์สำเร็จ! ✓`,"merge.dragReorder":`ลากเพื่อจัดเรียง`,"merge.removeFile":`ลบไฟล์`,"merge.pages":`หน้า`,"merge.expandPages":`ดูหน้า`,"merge.collapsePages":`ซ่อนหน้า`,"merge.viewPage":`ดูหน้า`,"delete.title":`ลบหน้า`,"delete.dropText":`เลือกไฟล์ PDF ที่ต้องการลบหน้า`,"delete.dropHint":`ลากไฟล์มาวาง หรือคลิกเพื่อเลือก`,"delete.selectAll":`เลือกทั้งหมด`,"delete.deselectAll":`ยกเลิกทั้งหมด`,"delete.deleteBtn":`ลบหน้าที่เลือก`,"delete.selected":`เลือก`,"delete.of":`จาก`,"delete.pagesLabel":`หน้า`,"delete.minWarning":`(ต้องเหลืออย่างน้อย 1 หน้า)`,"delete.processing":`กำลังลบหน้า...`,"delete.success":`ลบ {n} หน้าสำเร็จ! ✓`,"delete.pageNum":`หน้า {n}`,"delete.viewPage":`ดูหน้า`,"delete.reorderHint":`ลากเพื่อจัดเรียง · คลิกเพื่อเลือก`,"reorder.title":`จัดเรียงหน้า`,"reorder.dropText":`เลือกไฟล์ PDF ที่ต้องการจัดเรียงหน้า`,"reorder.dropHint":`ลากเพื่อสลับตำแหน่งหน้า`,"reorder.info":`{n} หน้า — ลากเพื่อจัดเรียงลำดับ`,"reorder.reset":`รีเซ็ต`,"reorder.saveBtn":`บันทึก PDF`,"reorder.processing":`กำลังจัดเรียงหน้า...`,"reorder.success":`จัดเรียงหน้าสำเร็จ! ✓`,"reorder.pageNum":`หน้า {n}`,"reorder.viewPage":`ดูหน้า`,"split.title":`แยกไฟล์ PDF`,"split.dropText":`เลือกไฟล์ PDF ที่ต้องการแยก`,"split.dropHint":`แบ่ง PDF เป็นหลายไฟล์ตามช่วงหน้า`,"split.viewPage":`ดูหน้า`,"split.totalPages":`ทั้งหมด {n} หน้า`,"split.splitEvery":`แยกทุกหน้า (1 หน้า/ไฟล์)`,"split.rangeLabel":`กำหนดช่วงหน้า (1-indexed)`,"split.addRange":`เพิ่มช่วง`,"split.file":`ไฟล์`,"split.to":`ถึง`,"split.removeRange":`ลบช่วง`,"split.info":`จะแยกเป็น {n} ไฟล์`,"split.splitBtn":`แยกไฟล์ PDF`,"split.invalidRange":`ช่วงที่ {n} ไม่ถูกต้อง (1-{max})`,"split.processing":`กำลังแยกไฟล์ PDF...`,"split.success":`แยกเป็น {n} ไฟล์สำเร็จ! ✓`,"rotate.title":`หมุนหน้า`,"rotate.dropText":`เลือกไฟล์ PDF ที่ต้องการหมุนหน้า`,"rotate.dropHint":`คลิกที่หน้าเพื่อหมุน 90° ตามเข็มนาฬิกา`,"rotate.allRotate90":`หมุนทุกหน้า 90°`,"rotate.reset":`รีเซ็ต`,"rotate.saveBtn":`บันทึก PDF`,"rotate.info":`{n} หน้าถูกหมุน`,"rotate.noRotation":`ยังไม่ได้หมุนหน้าใด`,"rotate.processing":`กำลังหมุนหน้า...`,"rotate.success":`หมุน {n} หน้าสำเร็จ! ✓`,"rotate.pageNum":`หน้า {n}`,"rotate.viewPage":`ดูหน้า`,"extract.title":`แยกหน้าที่เลือก`,"extract.dropText":`เลือกไฟล์ PDF ที่ต้องการแยกหน้า`,"extract.dropHint":`เลือกเฉพาะหน้าที่ต้องการเป็นไฟล์ใหม่`,"extract.selectAll":`เลือกทั้งหมด`,"extract.deselectAll":`ยกเลิกทั้งหมด`,"extract.extractBtn":`แยกหน้าที่เลือก`,"extract.selected":`เลือก`,"extract.of":`จาก`,"extract.pagesLabel":`หน้า`,"extract.processing":`กำลังแยกหน้า...`,"extract.success":`แยก {n} หน้าสำเร็จ! ✓`,"extract.pageNum":`หน้า {n}`,"extract.viewPage":`ดูหน้า`,"viewer.close":`ปิด`,"viewer.prev":`หน้าก่อน`,"viewer.next":`หน้าถัดไป`,"viewer.pageOf":`{current} / {total}`,"viewer.select":`เลือก`,"viewer.deselect":`ยกเลิกเลือก`,"viewer.rotate":`หมุน 90°`,"viewer.delete":`ลบหน้านี้`,"common.loading":`กำลังโหลด PDF...`,"common.readError":`ไม่สามารถอ่านไฟล์ PDF`,"common.error":`เกิดข้อผิดพลาด`,"common.selectPdf":`กรุณาเลือกไฟล์ PDF`,"common.viewPage":`ดูหน้า`,"common.deleteAll":`ไม่สามารถลบทุกหน้าได้ — ต้องเหลืออย่างน้อย 1 หน้า`},en:{"nav.merge":`Merge PDFs`,"nav.delete":`Delete Pages`,"nav.reorder":`Reorder Pages`,"nav.split":`Split PDF`,"nav.rotate":`Rotate Pages`,"nav.extract":`Extract Pages`,"security.badge":`Processed locally only`,"merge.title":`Merge PDFs`,"merge.dropText":`Drag PDF files here or click to select`,"merge.dropHint":`Supports multiple files`,"merge.files":`files`,"merge.totalPages":`total pages`,"merge.clearAll":`Clear all`,"merge.mergeBtn":`Merge PDFs`,"merge.needTwo":`Need at least 2 files to merge`,"merge.processing":`Merging PDFs...`,"merge.success":`Files merged successfully! ✓`,"merge.dragReorder":`Drag to reorder`,"merge.removeFile":`Remove file`,"merge.pages":`pages`,"merge.expandPages":`View pages`,"merge.collapsePages":`Hide pages`,"merge.viewPage":`View page`,"delete.title":`Delete Pages`,"delete.dropText":`Select a PDF to delete pages from`,"delete.dropHint":`Drag a file here or click to select`,"delete.selectAll":`Select all`,"delete.deselectAll":`Deselect all`,"delete.deleteBtn":`Delete selected`,"delete.selected":`Selected`,"delete.of":`of`,"delete.pagesLabel":`pages`,"delete.minWarning":`(Must keep at least 1 page)`,"delete.processing":`Deleting pages...`,"delete.success":`Deleted {n} pages! ✓`,"delete.pageNum":`Page {n}`,"delete.viewPage":`View page`,"delete.reorderHint":`Drag to reorder · Click to select`,"reorder.title":`Reorder Pages`,"reorder.dropText":`Select a PDF to reorder pages`,"reorder.dropHint":`Drag to swap page positions`,"reorder.info":`{n} pages — drag to reorder`,"reorder.reset":`Reset`,"reorder.saveBtn":`Save PDF`,"reorder.processing":`Reordering pages...`,"reorder.success":`Pages reordered! ✓`,"reorder.pageNum":`Page {n}`,"reorder.viewPage":`View page`,"split.title":`Split PDF`,"split.dropText":`Select a PDF to split`,"split.dropHint":`Split PDF into multiple files by page ranges`,"split.viewPage":`View page`,"split.totalPages":`Total {n} pages`,"split.splitEvery":`Split every page (1 page/file)`,"split.rangeLabel":`Define page ranges (1-indexed)`,"split.addRange":`Add range`,"split.file":`File`,"split.to":`to`,"split.removeRange":`Remove range`,"split.info":`Will split into {n} files`,"split.splitBtn":`Split PDF`,"split.invalidRange":`Range {n} is invalid (1-{max})`,"split.processing":`Splitting PDF...`,"split.success":`Split into {n} files! ✓`,"rotate.title":`Rotate Pages`,"rotate.dropText":`Select a PDF to rotate pages`,"rotate.dropHint":`Click a page to rotate 90° clockwise`,"rotate.allRotate90":`Rotate all 90°`,"rotate.reset":`Reset`,"rotate.saveBtn":`Save PDF`,"rotate.info":`{n} pages rotated`,"rotate.noRotation":`No pages rotated yet`,"rotate.processing":`Rotating pages...`,"rotate.success":`Rotated {n} pages! ✓`,"rotate.pageNum":`Page {n}`,"rotate.viewPage":`View page`,"extract.title":`Extract Pages`,"extract.dropText":`Select a PDF to extract pages from`,"extract.dropHint":`Pick specific pages for a new PDF`,"extract.selectAll":`Select all`,"extract.deselectAll":`Deselect all`,"extract.extractBtn":`Extract selected`,"extract.selected":`Selected`,"extract.of":`of`,"extract.pagesLabel":`pages`,"extract.processing":`Extracting pages...`,"extract.success":`Extracted {n} pages! ✓`,"extract.pageNum":`Page {n}`,"extract.viewPage":`View page`,"viewer.close":`Close`,"viewer.prev":`Previous`,"viewer.next":`Next`,"viewer.pageOf":`{current} / {total}`,"viewer.select":`Select`,"viewer.deselect":`Deselect`,"viewer.rotate":`Rotate 90°`,"viewer.delete":`Delete this page`,"common.loading":`Loading PDF...`,"common.readError":`Cannot read PDF file`,"common.error":`Error occurred`,"common.selectPdf":`Please select a PDF file`,"common.viewPage":`View page`,"common.deleteAll":`Cannot delete all pages — at least 1 must remain`}},o=localStorage.getItem(`pdf-manager-lang`)||`th`,s=[];function c(e,t={}){let n=a[o]?.[e]||a.th[e]||e;for(let[e,r]of Object.entries(t))n=n.replace(`{${e}}`,r);return n}function l(){return o}function ee(e){e!==`th`&&e!==`en`||(o=e,localStorage.setItem(`pdf-manager-lang`,e),s.forEach(t=>t(e)))}function u(){ee(o===`th`?`en`:`th`)}function d(e){return s.push(e),()=>{s=s.filter(t=>t!==e)}}function f(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(r.result),r.onerror=n,r.readAsArrayBuffer(e)})}function te(e){if(e===0)return`0 B`;let t=1024,n=[`B`,`KB`,`MB`,`GB`],r=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/t**+r).toFixed(1))+` `+n[r]}async function p(e){return(await n.load(e)).getPageCount()}async function ne(e){let t=await n.create();for(let r of e){let e=await n.load(r);(await t.copyPages(e,e.getPageIndices())).forEach(e=>t.addPage(e))}return t.save()}async function re(e,t){let r=await n.load(e),i=await n.create();return(await i.copyPages(r,t)).forEach(e=>i.addPage(e)),i.save()}async function ie(e,t){let r=await n.load(e),i=[];for(let e of t){let t=await n.create(),a=[];for(let t=e.start;t<=e.end;t++)a.push(t);(await t.copyPages(r,a)).forEach(e=>t.addPage(e)),i.push(await t.save())}return i}async function ae(e,r){let i=await n.load(e);for(let[e,n]of r){let r=i.getPage(e),a=r.getRotation().angle;r.setRotation(t((a+n)%360))}return i.save()}async function oe(e,t){let r=await n.load(e),i=await n.create();return(await i.copyPages(r,t)).forEach(e=>i.addPage(e)),i.save()}function m(e,t){let n=new Blob([e],{type:`application/pdf`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=t,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(r)}i.workerSrc=new URL(``+new URL(`pdf.worker-xSiVJ7U_.mjs`,import.meta.url).href,``+import.meta.url).toString();async function se(e){return r({data:new Uint8Array(e)}).promise}async function ce(e,t,n,r=200){let i=await e.getPage(t),a=r/i.getViewport({scale:1}).width,o=i.getViewport({scale:a});n.width=o.width,n.height=o.height;let s=n.getContext(`2d`);s.clearRect(0,0,n.width,n.height),s.fillStyle=`#fff`,s.fillRect(0,0,n.width,n.height),await i.render({canvasContext:s,viewport:o}).promise}function h(e,t=200){return new Promise(async(n,r)=>{try{let r=await se(e),i=Array.from({length:r.numPages},()=>{let e=document.createElement(`canvas`);return e.width=210,e.height=297,e});n(i),(async()=>{for(let e=1;e<=r.numPages;e+=5){let n=[];for(let a=e;a<e+5&&a<=r.numPages;a++)n.push(ce(r,a,i[a-1],t));await Promise.all(n),await new Promise(e=>setTimeout(e,0))}})()}catch(e){r(e)}})}var g=null,_=null;function v({pdfBuffer:e,pageIndex:t,totalPages:n,onClose:r,renderActions:i}){b(),_={pdfBuffer:e,pageIndex:t,totalPages:n,onClose:r,renderActions:i,pdfDoc:null},g=document.createElement(`div`),g.className=`page-viewer-overlay`,g.innerHTML=`
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
  `,document.body.appendChild(g),g.offsetHeight,g.classList.add(`open`),g.querySelector(`.page-viewer-close`).addEventListener(`click`,b),g.querySelector(`.page-viewer-prev`).addEventListener(`click`,()=>y(-1)),g.querySelector(`.page-viewer-next`).addEventListener(`click`,()=>y(1)),g.addEventListener(`click`,e=>{e.target===g&&b()}),document.addEventListener(`keydown`,le),ue()}function le(e){g&&(e.key===`Escape`&&b(),e.key===`ArrowLeft`&&y(-1),e.key===`ArrowRight`&&y(1))}function y(e){if(!_)return;let t=_.pageIndex+e;t<0||t>=_.totalPages||(_.pageIndex=t,ue())}async function ue(){if(!g||!_)return;let{pdfBuffer:e,pageIndex:t,totalPages:n,renderActions:i}=_,a=g.querySelector(`.page-viewer-canvas`),o=g.querySelector(`.page-viewer-info`),s=g.querySelector(`.page-viewer-actions`),c=g.querySelector(`.page-viewer-prev`),l=g.querySelector(`.page-viewer-next`);o.textContent=`${t+1} / ${n}`,c.disabled=t===0,l.disabled=t===n-1;try{if(!_.pdfDoc){let t=r({data:new Uint8Array(e)});_.pdfDoc=await t.promise}let n=await _.pdfDoc.getPage(t+1),i=n.getViewport({scale:1}),o=Math.min(window.innerWidth*.75,800),s=window.innerHeight*.78,c=o/i.width,l=s/i.height,ee=Math.min(c,l),u=n.getViewport({scale:ee});a.width=u.width,a.height=u.height;let d=a.getContext(`2d`);d.clearRect(0,0,a.width,a.height),d.fillStyle=`#fff`,d.fillRect(0,0,a.width,a.height),await n.render({canvasContext:d,viewport:u}).promise}catch(e){console.error(`Viewer render error:`,e)}s.innerHTML=``,i&&i(t,s)}function b(){document.removeEventListener(`keydown`,le),g&&(g.classList.remove(`open`),setTimeout(()=>{g?.remove(),g=null},250)),_?.onClose&&_.onClose(),_?.pdfDoc&&_.pdfDoc.destroy(),_=null}var de=e({render:()=>fe}),x=[],S=new Set;function fe(e){x=[],S=new Set,e.innerHTML=`
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
  `,pe(e)}function pe(e){let t=e.querySelector(`#merge-drop-zone`),n=e.querySelector(`#merge-file-input`);t.addEventListener(`dragover`,e=>{e.preventDefault(),t.classList.add(`drag-over`)}),t.addEventListener(`dragleave`,()=>t.classList.remove(`drag-over`)),t.addEventListener(`drop`,n=>{n.preventDefault(),t.classList.remove(`drag-over`),me(n.dataTransfer.files,e)}),n.addEventListener(`change`,t=>{me(t.target.files,e),t.target.value=``}),e.querySelector(`#merge-btn`)?.addEventListener(`click`,()=>_e()),e.querySelector(`#merge-clear-btn`)?.addEventListener(`click`,()=>{x=[],S.clear(),C(e)})}async function me(e,t){let n=Array.from(e).filter(e=>e.type===`application/pdf`||e.name.endsWith(`.pdf`));if(n.length===0){X(c(`common.selectPdf`),`error`);return}for(let e of n){let t=new Uint8Array(await f(e)),n=await p(t);x.push({name:e.name,size:e.size,buffer:t,pageCount:n,cachedCanvases:null})}C(t)}function C(e){let t=e.querySelector(`#merge-file-list`),n=e.querySelector(`#merge-action-bar`),r=e.querySelector(`#merge-info`);if(x.length===0){t.innerHTML=``,n.style.display=`none`;return}n.style.display=`flex`;let i=x.reduce((e,t)=>e+t.pageCount,0);r.innerHTML=`<strong>${x.length}</strong> ${c(`merge.files`)} · <strong>${i}</strong> ${c(`merge.totalPages`)}`,t.innerHTML=x.map((e,t)=>`
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
          <div class="file-card-meta">${te(e.size)} · ${e.pageCount} ${c(`merge.pages`)}</div>
        </div>
        <div class="file-card-actions">
          <button class="file-card-expand ${S.has(t)?`expanded`:``}" data-expand="${t}" title="${S.has(t)?c(`merge.collapsePages`):c(`merge.expandPages`)}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            <span>${e.pageCount} ${c(`merge.pages`)}</span>
          </button>
          <button class="btn-icon danger" data-remove="${t}" title="${c(`merge.removeFile`)}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>
      <div class="merge-page-preview" id="merge-preview-${t}" style="${S.has(t)?``:`display:none;`}"></div>
    </div>
  `).join(``),t.querySelectorAll(`[data-remove]`).forEach(t=>{t.addEventListener(`click`,()=>{let n=parseInt(t.dataset.remove);S.delete(n),x.splice(n,1);let r=new Set;S.forEach(e=>{e>n?r.add(e-1):e<n&&r.add(e)}),S=r,C(e)})}),t.querySelectorAll(`[data-expand]`).forEach(n=>{n.addEventListener(`click`,async()=>{let r=parseInt(n.dataset.expand);if(S.has(r)){S.delete(r);let e=t.querySelector(`#merge-preview-${r}`);e&&(e.style.display=`none`),n.classList.remove(`expanded`)}else S.add(r),n.classList.add(`expanded`),await he(r,e)})}),S.forEach(t=>{he(t,e)}),ge(t,e)}async function he(e,t){let n=x[e];if(!n)return;let r=t.querySelector(`#merge-preview-${e}`);r&&(r.style.display=``,n.cachedCanvases||=await h(n.buffer,100),r.innerHTML=n.cachedCanvases.map((t,n)=>`
    <div class="merge-page-thumb" data-file="${e}" data-page="${n}" title="${c(`merge.viewPage`)}">
      <div class="page-card-overlay" style="border-radius: 6px;">
        <button class="view-btn merge-view-btn" data-file="${e}" data-page="${n}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
      <div class="merge-page-thumb-num">${n+1}</div>
    </div>
  `).join(``),n.cachedCanvases.forEach((t,n)=>{let i=r.querySelector(`.merge-page-thumb[data-file="${e}"][data-page="${n}"]`);i&&(i.firstChild.tagName===`CANVAS`&&i.removeChild(i.firstChild),i.insertBefore(t,i.firstChild))}),r.querySelectorAll(`.merge-view-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=parseInt(e.dataset.file),r=parseInt(e.dataset.page),i=x[n];i&&v({pdfBuffer:i.buffer,pageIndex:r,totalPages:i.pageCount})})}))}function ge(e,t){let n=null;e.querySelectorAll(`.file-card`).forEach(r=>{r.addEventListener(`dragstart`,e=>{n=parseInt(r.dataset.index),r.classList.add(`dragging`),e.dataTransfer.effectAllowed=`move`}),r.addEventListener(`dragend`,()=>{r.classList.remove(`dragging`),e.querySelectorAll(`.file-card`).forEach(e=>e.classList.remove(`drag-over-card`))}),r.addEventListener(`dragover`,t=>{t.preventDefault(),n!==null&&(e.querySelectorAll(`.file-card`).forEach(e=>e.classList.remove(`drag-over-card`)),r.classList.add(`drag-over-card`))}),r.addEventListener(`drop`,e=>{e.preventDefault();let i=parseInt(r.dataset.index);if(n!==null&&n!==i){let[e]=x.splice(n,1);x.splice(i,0,e);let r=new Set;S.forEach(e=>{if(e===n)r.add(i);else{let t=e;n<i?e>n&&e<=i&&(t=e-1):e>=i&&e<n&&(t=e+1),r.add(t)}}),S=r,C(t)}n=null})})}async function _e(){if(x.length<2){X(c(`merge.needTwo`),`error`);return}Q(c(`merge.processing`));try{m(await ne(x.map(e=>e.buffer)),`merged.pdf`),X(c(`merge.success`),`success`)}catch(e){X(c(`common.error`)+`: `+e.message,`error`)}finally{$()}}var ve=e({render:()=>be}),w=null,ye=``,T=0,E=new Set,D=[],O=[];function be(e){w=null,ye=``,T=0,E=new Set,D=[],O=[],e.innerHTML=`
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
  `,xe(e)}function xe(e){let t=e.querySelector(`#delete-drop-zone`),n=e.querySelector(`#delete-file-input`);t.addEventListener(`dragover`,e=>{e.preventDefault(),t.classList.add(`drag-over`)}),t.addEventListener(`dragleave`,()=>t.classList.remove(`drag-over`)),t.addEventListener(`drop`,n=>{n.preventDefault(),t.classList.remove(`drag-over`);let r=Array.from(n.dataTransfer.files).find(e=>e.type===`application/pdf`||e.name.endsWith(`.pdf`));r&&Se(r,e)}),n.addEventListener(`change`,t=>{t.target.files[0]&&Se(t.target.files[0],e),t.target.value=``}),e.querySelector(`#delete-btn`)?.addEventListener(`click`,()=>Ce()),e.querySelector(`#delete-select-all`)?.addEventListener(`click`,()=>{for(let e=0;e<T;e++)E.add(e);A(e)}),e.querySelector(`#delete-deselect-all`)?.addEventListener(`click`,()=>{E.clear(),A(e)})}async function Se(e,t){Q(c(`common.loading`));try{w=new Uint8Array(await f(e)),ye=e.name,T=await p(w),E.clear(),D=Array.from({length:T},(e,t)=>t),O=[],t.querySelector(`#delete-drop-zone`).style.display=`none`,t.querySelector(`#delete-action-bar`).style.display=`flex`,await k(t),A(t)}catch(e){X(c(`common.readError`)+`: `+e.message,`error`)}finally{$()}}async function k(e){let t=e.querySelector(`#delete-page-grid`);O.length===0&&(O=await h(w)),t.innerHTML=D.map((e,t)=>`
    <div class="page-card ${E.has(e)?`selected`:``}" draggable="true" data-display="${t}" data-orig="${e}" id="delete-page-${t}">
      <div class="page-card-overlay">
        <button class="view-btn" data-view="${t}" title="${c(`delete.viewPage`)}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
      <div class="page-canvas-wrapper"></div>
      <div class="page-card-number">${c(`delete.pageNum`,{n:e+1})}</div>
    </div>
  `).join(``),D.forEach((e,n)=>{let r=t.querySelector(`#delete-page-${n} .page-canvas-wrapper`),i=O[e];r.innerHTML=``,r.appendChild(i)}),t.querySelectorAll(`.page-card`).forEach(t=>{t.addEventListener(`click`,n=>{if(n.target.closest(`.view-btn`))return;let r=parseInt(t.dataset.orig);E.has(r)?E.delete(r):E.add(r),A(e)})}),t.querySelectorAll(`.view-btn`).forEach(t=>{t.addEventListener(`click`,n=>{n.stopPropagation();let r=parseInt(t.dataset.view),i=D[r];v({pdfBuffer:w,pageIndex:i,totalPages:T,renderActions:(t,n)=>{let r=E.has(t),i=document.createElement(`button`);i.className=`btn ${r?`btn-danger`:`btn-ghost`}`,i.innerHTML=r?`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg> ${c(`viewer.deselect`)}`:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> ${c(`viewer.select`)}`,i.addEventListener(`click`,()=>{E.has(t)?E.delete(t):E.add(t),A(e),n.innerHTML=``;let r=E.has(t);i.className=`btn ${r?`btn-danger`:`btn-ghost`}`,i.innerHTML=r?`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg> ${c(`viewer.deselect`)}`:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> ${c(`viewer.select`)}`,n.appendChild(i)}),n.appendChild(i)}})})});let n=null;t.querySelectorAll(`.page-card`).forEach(r=>{r.addEventListener(`dragstart`,e=>{n=parseInt(r.dataset.display),r.classList.add(`dragging`),e.dataTransfer.effectAllowed=`move`}),r.addEventListener(`dragend`,()=>{r.classList.remove(`dragging`),t.querySelectorAll(`.page-card`).forEach(e=>e.classList.remove(`drag-over-page`))}),r.addEventListener(`dragover`,e=>{e.preventDefault(),n!==null&&(t.querySelectorAll(`.page-card`).forEach(e=>e.classList.remove(`drag-over-page`)),r.classList.add(`drag-over-page`))}),r.addEventListener(`drop`,t=>{t.preventDefault();let i=parseInt(r.dataset.display);if(n!==null&&n!==i){let[t]=D.splice(n,1);D.splice(i,0,t),k(e)}n=null})})}function A(e){let t=e.querySelector(`#delete-page-grid`),n=e.querySelector(`#delete-info`),r=e.querySelector(`#delete-btn`);t.querySelectorAll(`.page-card`).forEach(e=>{let t=parseInt(e.dataset.orig);e.classList.toggle(`selected`,E.has(t))}),n.innerHTML=`${c(`delete.selected`)} <strong>${E.size}</strong> ${c(`delete.of`)} <strong>${T}</strong> ${c(`delete.pagesLabel`)}`,r.disabled=E.size===0||E.size>=T,E.size>=T&&(n.innerHTML+=` <span style="color:var(--warning)">${c(`delete.minWarning`)}</span>`)}async function Ce(){if(E.size!==0){Q(c(`delete.processing`));try{let e=D.filter(e=>!E.has(e)),t=await re(w,e);m(t,ye.replace(`.pdf`,`_edited.pdf`));let n=E.size;w=t,T=e.length,D=Array.from({length:T},(e,t)=>t),E.clear(),O=[];let r=document.getElementById(`content-area`);await k(r),A(r),X(c(`delete.success`,{n}),`success`)}catch(e){X(c(`common.error`)+`: `+e.message,`error`)}finally{$()}}}var we=e({render:()=>Te}),j=null,M=``,N=[],P=[];function Te(e){j=null,M=``,N=[],P=[],e.innerHTML=`
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
  `,Ee(e)}function Ee(e){let t=e.querySelector(`#reorder-drop-zone`),n=e.querySelector(`#reorder-file-input`);t.addEventListener(`dragover`,e=>{e.preventDefault(),t.classList.add(`drag-over`)}),t.addEventListener(`dragleave`,()=>t.classList.remove(`drag-over`)),t.addEventListener(`drop`,n=>{n.preventDefault(),t.classList.remove(`drag-over`);let r=Array.from(n.dataTransfer.files).find(e=>e.type===`application/pdf`||e.name.endsWith(`.pdf`));r&&De(r,e)}),n.addEventListener(`change`,t=>{t.target.files[0]&&De(t.target.files[0],e),t.target.value=``}),e.querySelector(`#reorder-btn`)?.addEventListener(`click`,()=>Oe()),e.querySelector(`#reorder-reset`)?.addEventListener(`click`,()=>{N=N.map((e,t)=>t),F(e)})}async function De(e,t){Q(c(`common.loading`));try{j=new Uint8Array(await f(e)),M=e.name;let n=await p(j);N=Array.from({length:n},(e,t)=>t),P=[],t.querySelector(`#reorder-drop-zone`).style.display=`none`,t.querySelector(`#reorder-action-bar`).style.display=`flex`,await F(t)}catch(e){X(c(`common.readError`)+`: `+e.message,`error`)}finally{$()}}async function F(e){let t=e.querySelector(`#reorder-page-grid`),n=e.querySelector(`#reorder-info`);P.length===0&&(P=await h(j)),n.innerHTML=c(`reorder.info`,{n:`<strong>${N.length}</strong>`}),t.innerHTML=N.map((e,t)=>`
    <div class="page-card" draggable="true" data-display="${t}" id="reorder-page-${t}">
      <div class="page-card-overlay">
        <button class="view-btn" data-view="${t}" title="${c(`reorder.viewPage`)}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
      <div class="page-canvas-wrapper"></div>
      <div class="page-card-number">${c(`reorder.pageNum`,{n:e+1})}</div>
    </div>
  `).join(``),N.forEach((e,n)=>{let r=t.querySelector(`#reorder-page-${n} .page-canvas-wrapper`),i=P[e];r.innerHTML=``,r.appendChild(i)}),t.querySelectorAll(`.view-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=parseInt(e.dataset.view),r=N[n];v({pdfBuffer:j,pageIndex:r,totalPages:N.length})})});let r=null;t.querySelectorAll(`.page-card`).forEach(n=>{n.addEventListener(`dragstart`,e=>{r=parseInt(n.dataset.display),n.classList.add(`dragging`),e.dataTransfer.effectAllowed=`move`}),n.addEventListener(`dragend`,()=>{n.classList.remove(`dragging`),t.querySelectorAll(`.page-card`).forEach(e=>e.classList.remove(`drag-over-page`))}),n.addEventListener(`dragover`,e=>{e.preventDefault(),r!==null&&(t.querySelectorAll(`.page-card`).forEach(e=>e.classList.remove(`drag-over-page`)),n.classList.add(`drag-over-page`))}),n.addEventListener(`drop`,t=>{t.preventDefault();let i=parseInt(n.dataset.display);if(r!==null&&r!==i){let[t]=N.splice(r,1);N.splice(i,0,t),F(e)}r=null})})}async function Oe(){Q(c(`reorder.processing`));try{m(await re(j,N),M.replace(`.pdf`,`_reordered.pdf`)),X(c(`reorder.success`),`success`)}catch(e){X(c(`common.error`)+`: `+e.message,`error`)}finally{$()}}var ke=e({render:()=>Ae}),I=null,L=``,R=0,z=[{start:1,end:1}];function Ae(e){I=null,L=``,R=0,z=[{start:1,end:1}],e.innerHTML=`
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
  `,je(e)}function je(e){let t=e.querySelector(`#split-drop-zone`),n=e.querySelector(`#split-file-input`);t.addEventListener(`dragover`,e=>{e.preventDefault(),t.classList.add(`drag-over`)}),t.addEventListener(`dragleave`,()=>t.classList.remove(`drag-over`)),t.addEventListener(`drop`,n=>{n.preventDefault(),t.classList.remove(`drag-over`);let r=Array.from(n.dataTransfer.files).find(e=>e.type===`application/pdf`||e.name.endsWith(`.pdf`));r&&Me(r,e)}),n.addEventListener(`change`,t=>{t.target.files[0]&&Me(t.target.files[0],e),t.target.value=``})}async function Me(e,t){Q(c(`common.loading`));try{I=new Uint8Array(await f(e)),L=e.name,R=await p(I),z=[{start:1,end:R}],t.querySelector(`#split-drop-zone`).style.display=`none`,await Ne(t),Pe(t)}catch(e){X(c(`common.readError`)+`: `+e.message,`error`)}finally{$()}}async function Ne(e){let t=e.querySelector(`#split-page-grid`),n=await h(I);t.innerHTML=n.map((e,t)=>`
    <div class="page-card" data-page="${t}" id="split-page-${t}" style="cursor:default;">
      <div class="page-card-overlay">
        <button class="view-btn" data-view="${t}" title="${c(`split.viewPage`)}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
      <div class="page-canvas-wrapper"></div>
      <div class="page-card-number">${c(`delete.pageNum`,{n:t+1})}</div>
    </div>
  `).join(``),n.forEach((e,n)=>{t.querySelector(`#split-page-${n} .page-canvas-wrapper`).appendChild(e)}),t.querySelectorAll(`.view-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=parseInt(e.dataset.view);v({pdfBuffer:I,pageIndex:n,totalPages:R})})})}function Pe(e){let t=e.querySelector(`#split-config-area`);t.innerHTML=`
    <div class="split-config">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
        <div>
          <h3 style="font-size:1.05rem;font-weight:600;">${L}</h3>
          <p style="color:var(--text-muted);font-size:0.85rem;margin-top:4px;">${c(`split.totalPages`,{n:R})}</p>
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
  `,B(t),t.querySelector(`#split-add-range`).addEventListener(`click`,()=>{z.push({start:1,end:R}),B(t)}),t.querySelector(`#split-even-btn`).addEventListener(`click`,()=>{z=[];for(let e=1;e<=R;e++)z.push({start:e,end:e});B(t)}),t.querySelector(`#split-btn`).addEventListener(`click`,()=>Ie()),Fe(t)}function B(e){let t=e.querySelector(`#split-ranges`);t.innerHTML=z.map((e,t)=>`
    <div class="range-row">
      <span>${c(`split.file`)} ${t+1}:</span>
      <input type="number" min="1" max="${R}" value="${e.start}" data-range="${t}" data-field="start" />
      <span>${c(`split.to`)}</span>
      <input type="number" min="1" max="${R}" value="${e.end}" data-range="${t}" data-field="end" />
      ${z.length>1?`<button class="btn-icon danger" data-remove-range="${t}" title="${c(`split.removeRange`)}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>`:``}
    </div>
  `).join(``),t.querySelectorAll(`input`).forEach(t=>{t.addEventListener(`change`,()=>{let n=parseInt(t.dataset.range);z[n][t.dataset.field]=parseInt(t.value)||1,Fe(e)})}),t.querySelectorAll(`[data-remove-range]`).forEach(t=>{t.addEventListener(`click`,()=>{z.splice(parseInt(t.dataset.removeRange),1),B(e)})}),Fe(e)}function Fe(e){let t=e.querySelector(`#split-info`);t.innerHTML=c(`split.info`,{n:`<strong>${z.length}</strong>`})}async function Ie(){for(let e=0;e<z.length;e++){let t=z[e];if(t.start<1||t.end>R||t.start>t.end){X(c(`split.invalidRange`,{n:e+1,max:R}),`error`);return}}Q(c(`split.processing`));try{let e=z.map(e=>({start:e.start-1,end:e.end-1})),t=await ie(I,e);t.forEach((e,t)=>{m(e,`${L.replace(`.pdf`,``)}_part${t+1}.pdf`)}),X(c(`split.success`,{n:t.length}),`success`)}catch(e){X(c(`common.error`)+`: `+e.message,`error`)}finally{$()}}var Le=e({render:()=>ze}),V=null,Re=``,H=0,U=new Map;function ze(e){V=null,Re=``,H=0,U=new Map,e.innerHTML=`
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
  `,Be(e)}function Be(e){let t=e.querySelector(`#rotate-drop-zone`),n=e.querySelector(`#rotate-file-input`);t.addEventListener(`dragover`,e=>{e.preventDefault(),t.classList.add(`drag-over`)}),t.addEventListener(`dragleave`,()=>t.classList.remove(`drag-over`)),t.addEventListener(`drop`,n=>{n.preventDefault(),t.classList.remove(`drag-over`);let r=Array.from(n.dataTransfer.files).find(e=>e.type===`application/pdf`||e.name.endsWith(`.pdf`));r&&Ve(r,e)}),n.addEventListener(`change`,t=>{t.target.files[0]&&Ve(t.target.files[0],e),t.target.value=``}),e.querySelector(`#rotate-btn`)?.addEventListener(`click`,()=>Ue()),e.querySelector(`#rotate-all-90`)?.addEventListener(`click`,()=>{for(let e=0;e<H;e++)U.set(e,((U.get(e)||0)+90)%360);W(e)}),e.querySelector(`#rotate-reset`)?.addEventListener(`click`,()=>{U.clear(),W(e)})}async function Ve(e,t){Q(c(`common.loading`));try{V=new Uint8Array(await f(e)),Re=e.name,H=await p(V),U.clear(),t.querySelector(`#rotate-drop-zone`).style.display=`none`,t.querySelector(`#rotate-action-bar`).style.display=`flex`,await He(t),W(t)}catch(e){X(c(`common.readError`)+`: `+e.message,`error`)}finally{$()}}async function He(e){let t=e.querySelector(`#rotate-page-grid`),n=await h(V);t.innerHTML=n.map((e,t)=>`
    <div class="page-card" data-page="${t}" id="rotate-page-${t}" title="${c(`rotate.dropHint`)}">
      <div class="page-card-overlay">
        <button class="view-btn" data-view="${t}" title="${c(`rotate.viewPage`)}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
      <div class="page-canvas-wrapper" style="transition:transform 0.3s ease;"></div>
      <div class="page-card-number">${c(`rotate.pageNum`,{n:t+1})}</div>
    </div>
  `).join(``),n.forEach((e,n)=>{t.querySelector(`#rotate-page-${n} .page-canvas-wrapper`).appendChild(e)}),t.querySelectorAll(`.page-card`).forEach(t=>{t.addEventListener(`click`,n=>{if(n.target.closest(`.view-btn`))return;let r=parseInt(t.dataset.page);U.set(r,((U.get(r)||0)+90)%360),W(e)})}),t.querySelectorAll(`.view-btn`).forEach(t=>{t.addEventListener(`click`,n=>{n.stopPropagation();let r=parseInt(t.dataset.view);v({pdfBuffer:V,pageIndex:r,totalPages:H,renderActions:(t,n)=>{let r=document.createElement(`button`);r.className=`btn btn-ghost`,r.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg> ${c(`viewer.rotate`)}`,r.addEventListener(`click`,()=>{U.set(t,((U.get(t)||0)+90)%360),W(e)}),n.appendChild(r)}})})})}function W(e){let t=e.querySelector(`#rotate-page-grid`),n=e.querySelector(`#rotate-info`);n.innerHTML=`<strong>${Array.from(U.values()).filter(e=>e!==0).length}</strong> ${c(`rotate.info`,{n:``}).trim()}`,t.querySelectorAll(`.page-card`).forEach(e=>{let t=parseInt(e.dataset.page),n=U.get(t)||0;e.querySelector(`.page-canvas-wrapper`).style.transform=`rotate(${n}deg)`;let r=e.querySelector(`.rotate-badge`);n===0?(r&&r.remove(),e.classList.remove(`selected`)):(r||(r=document.createElement(`div`),r.className=`rotate-badge`,e.appendChild(r)),r.textContent=`${n}°`,e.classList.add(`selected`))})}async function Ue(){let e=new Map;if(U.forEach((t,n)=>{t!==0&&e.set(n,t)}),e.size===0){X(c(`rotate.noRotation`),`info`);return}Q(c(`rotate.processing`));try{m(await ae(V,e),Re.replace(`.pdf`,`_rotated.pdf`)),X(c(`rotate.success`,{n:e.size}),`success`)}catch(e){X(c(`common.error`)+`: `+e.message,`error`)}finally{$()}}var We=e({render:()=>Ke}),G=null,Ge=``,K=0,q=new Set;function Ke(e){G=null,Ge=``,K=0,q=new Set,e.innerHTML=`
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
  `,qe(e)}function qe(e){let t=e.querySelector(`#extract-drop-zone`),n=e.querySelector(`#extract-file-input`);t.addEventListener(`dragover`,e=>{e.preventDefault(),t.classList.add(`drag-over`)}),t.addEventListener(`dragleave`,()=>t.classList.remove(`drag-over`)),t.addEventListener(`drop`,n=>{n.preventDefault(),t.classList.remove(`drag-over`);let r=Array.from(n.dataTransfer.files).find(e=>e.type===`application/pdf`||e.name.endsWith(`.pdf`));r&&Je(r,e)}),n.addEventListener(`change`,t=>{t.target.files[0]&&Je(t.target.files[0],e),t.target.value=``}),e.querySelector(`#extract-btn`)?.addEventListener(`click`,()=>Xe()),e.querySelector(`#extract-select-all`)?.addEventListener(`click`,()=>{for(let e=0;e<K;e++)q.add(e);J(e)}),e.querySelector(`#extract-deselect-all`)?.addEventListener(`click`,()=>{q.clear(),J(e)})}async function Je(e,t){Q(c(`common.loading`));try{G=new Uint8Array(await f(e)),Ge=e.name,K=await p(G),q.clear(),t.querySelector(`#extract-drop-zone`).style.display=`none`,t.querySelector(`#extract-action-bar`).style.display=`flex`,await Ye(t),J(t)}catch(e){X(c(`common.readError`)+`: `+e.message,`error`)}finally{$()}}async function Ye(e){let t=e.querySelector(`#extract-page-grid`),n=await h(G);t.innerHTML=n.map((e,t)=>`
    <div class="page-card" data-page="${t}" id="extract-page-${t}">
      <div class="page-card-overlay">
        <button class="view-btn" data-view="${t}" title="${c(`extract.viewPage`)}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
      <div class="page-canvas-wrapper"></div>
      <div class="page-card-number">${c(`extract.pageNum`,{n:t+1})}</div>
    </div>
  `).join(``),n.forEach((e,n)=>{t.querySelector(`#extract-page-${n} .page-canvas-wrapper`).appendChild(e)}),t.querySelectorAll(`.page-card`).forEach(t=>{t.addEventListener(`click`,n=>{if(n.target.closest(`.view-btn`))return;let r=parseInt(t.dataset.page);q.has(r)?q.delete(r):q.add(r),J(e)})}),t.querySelectorAll(`.view-btn`).forEach(t=>{t.addEventListener(`click`,n=>{n.stopPropagation();let r=parseInt(t.dataset.view);v({pdfBuffer:G,pageIndex:r,totalPages:K,renderActions:(t,n)=>{let r=q.has(t),i=document.createElement(`button`);i.className=`btn ${r?`btn-primary`:`btn-ghost`}`,i.innerHTML=r?`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> ${c(`viewer.deselect`)}`:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg> ${c(`viewer.select`)}`,i.addEventListener(`click`,()=>{q.has(t)?q.delete(t):q.add(t),J(e);let n=q.has(t);i.className=`btn ${n?`btn-primary`:`btn-ghost`}`,i.innerHTML=n?`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> ${c(`viewer.deselect`)}`:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg> ${c(`viewer.select`)}`}),n.appendChild(i)}})})})}function J(e){let t=e.querySelector(`#extract-page-grid`),n=e.querySelector(`#extract-info`),r=e.querySelector(`#extract-btn`);t.querySelectorAll(`.page-card`).forEach(e=>{let t=parseInt(e.dataset.page);e.classList.toggle(`selected`,q.has(t))}),n.innerHTML=`${c(`extract.selected`)} <strong>${q.size}</strong> ${c(`extract.of`)} <strong>${K}</strong> ${c(`extract.pagesLabel`)}`,r.disabled=q.size===0}async function Xe(){if(q.size!==0){Q(c(`extract.processing`));try{let e=Array.from(q).sort((e,t)=>e-t);m(await oe(G,e),Ge.replace(`.pdf`,`_extracted.pdf`)),X(c(`extract.success`,{n:e.length}),`success`)}catch(e){X(c(`common.error`)+`: `+e.message,`error`)}finally{$()}}}var Ze={merge:{module:de,titleKey:`nav.merge`},delete:{module:ve,titleKey:`nav.delete`},reorder:{module:we,titleKey:`nav.reorder`},split:{module:ke,titleKey:`nav.split`},rotate:{module:Le,titleKey:`nav.rotate`},extract:{module:We,titleKey:`nav.extract`}},Qe=`merge`;document.addEventListener(`DOMContentLoaded`,()=>{nt(),it(),et(),$e(),rt(`merge`),d(()=>{$e(),rt(Qe)})});function $e(){for(let[e,t]of Object.entries({"nav-merge":`nav.merge`,"nav-delete":`nav.delete`,"nav-reorder":`nav.reorder`,"nav-split":`nav.split`,"nav-rotate":`nav.rotate`,"nav-extract":`nav.extract`})){let n=document.getElementById(e);if(n){let e=n.querySelector(`span`);e&&(e.textContent=c(t))}}let e=document.getElementById(`security-badge`);if(e){let t=e.querySelector(`span`);t&&(t.textContent=c(`security.badge`))}tt()}function et(){let e=document.getElementById(`top-bar-actions`),t=document.createElement(`button`);t.className=`lang-toggle`,t.id=`lang-toggle-btn`,t.addEventListener(`click`,e=>{e.stopPropagation(),u()}),e.appendChild(t),tt()}function tt(){let e=document.getElementById(`lang-toggle-btn`);e&&(e.innerHTML=l()===`th`?`<span class="active-lang">TH</span> / <span>EN</span>`:`<span>TH</span> / <span class="active-lang">EN</span>`)}function nt(){document.getElementById(`sidebar-nav`).querySelectorAll(`.nav-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.feature;t&&t!==Qe&&rt(t)})})}function rt(e){Qe=e;let t=Ze[e];if(!t)return;document.querySelectorAll(`.nav-btn`).forEach(t=>{t.classList.toggle(`active`,t.dataset.feature===e)}),document.getElementById(`page-title`).textContent=c(t.titleKey);let n=document.getElementById(`content-area`);n.innerHTML=``,t.module.render(n),document.getElementById(`sidebar`).classList.remove(`open`)}function it(){let e=document.getElementById(`menu-toggle`),t=document.getElementById(`sidebar`);e.addEventListener(`click`,()=>{t.classList.toggle(`open`)}),document.addEventListener(`click`,n=>{window.innerWidth<=768&&t.classList.contains(`open`)&&!t.contains(n.target)&&!e.contains(n.target)&&t.classList.remove(`open`)})}var Y=null;function X(e,t=`info`){Y||(Y=document.createElement(`div`),Y.className=`toast-container`,document.body.appendChild(Y));let n={success:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`,error:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>`,info:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>`},r=document.createElement(`div`);r.className=`toast ${t}`,r.innerHTML=`${n[t]||n.info}<span>${e}</span>`,Y.appendChild(r),setTimeout(()=>{r.style.opacity=`0`,r.style.transform=`translateX(40px)`,r.style.transition=`all 0.3s ease`,setTimeout(()=>r.remove(),300)},4e3)}var Z=null;function Q(e=`Processing...`){Z||(Z=document.createElement(`div`),Z.className=`loading-overlay`,Z.innerHTML=`
    <div class="loading-spinner"></div>
    <div class="loading-text">${e}</div>
  `,document.body.appendChild(Z))}function $(){Z&&=(Z.remove(),null)}