---
title: 'Embedding Dimension Visualizer'
linkTitle: 'Embedding Visualizer'
description: 'Compute real cosine similarity between two texts in your browser using all-MiniLM-L6-v2. Visual 2D vector diagram, no API key needed.'
date: '2026-01-01'
lastmod: '2026-04-01'
toc: true
---

Compute real semantic similarity between two pieces of text — entirely in your browser using `all-MiniLM-L6-v2`. No API key, no server, no data sent anywhere.

<!-- ═══════════════════════════════════════════════════════ TOOL ═══ -->
<div id="emb-tool" style="margin:2rem 0;border:1px solid var(--tw-prose-hr,#e5e7eb);border-radius:12px;overflow:hidden;font-family:inherit">

  <!-- header -->
  <div style="background:var(--tw-prose-pre-bg,#f9fafb);padding:1rem 1.5rem;border-bottom:1px solid var(--tw-prose-hr,#e5e7eb);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem">
    <div>
      <span style="font-weight:600;font-size:.95rem">Embedding Similarity Visualizer</span>
      <span id="model-badge" style="margin-left:.75rem;font-size:.7rem;padding:.2rem .55rem;border-radius:999px;background:#dbeafe;color:#1d4ed8;font-weight:500">all-MiniLM-L6-v2 · 23 MB · browser-only</span>
    </div>
    <span style="font-size:.72rem;color:#6b7280">100% client-side — no data leaves your browser</span>
  </div>

  <!-- inputs -->
  <div style="padding:1.25rem 1.5rem;display:grid;grid-template-columns:1fr 1fr;gap:1rem">
    <div>
      <label style="display:block;font-size:.8rem;font-weight:600;margin-bottom:.4rem;color:#3b82f6">Text A</label>
      <textarea id="text-a" rows="3"
        placeholder="e.g. I love dogs"
        style="width:100%;box-sizing:border-box;border:1.5px solid #d1d5db;border-radius:8px;padding:.65rem .75rem;font-size:.85rem;resize:vertical;font-family:inherit;outline:none;transition:border-color .15s"
        onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'"></textarea>
    </div>
    <div>
      <label style="display:block;font-size:.8rem;font-weight:600;margin-bottom:.4rem;color:#10b981">Text B</label>
      <textarea id="text-b" rows="3"
        placeholder="e.g. I adore dogs"
        style="width:100%;box-sizing:border-box;border:1.5px solid #d1d5db;border-radius:8px;padding:.65rem .75rem;font-size:.85rem;resize:vertical;font-family:inherit;outline:none;transition:border-color .15s"
        onfocus="this.style.borderColor='#10b981'" onblur="this.style.borderColor='#d1d5db'"></textarea>
    </div>
  </div>

  <!-- presets -->
  <div style="padding:0 1.5rem .75rem">
    <span style="font-size:.72rem;color:#9ca3af;margin-right:.5rem">Try an example:</span>
    <button onclick="embSetPreset(0)" style="font-size:.72rem;padding:.2rem .65rem;border-radius:999px;border:1px solid #d1d5db;background:transparent;cursor:pointer;margin-right:.35rem">🟢 High similarity</button>
    <button onclick="embSetPreset(1)" style="font-size:.72rem;padding:.2rem .65rem;border-radius:999px;border:1px solid #d1d5db;background:transparent;cursor:pointer;margin-right:.35rem">🟡 Medium similarity</button>
    <button onclick="embSetPreset(2)" style="font-size:.72rem;padding:.2rem .65rem;border-radius:999px;border:1px solid #d1d5db;background:transparent;cursor:pointer">🔴 Low similarity</button>
  </div>

  <!-- action row -->
  <div style="padding:.5rem 1.5rem 1.25rem">
    <button id="emb-btn" onclick="embCompare()"
      style="width:100%;background:#2563eb;color:#fff;border:none;border-radius:8px;padding:.8rem 1.25rem;font-size:.9rem;font-weight:600;cursor:pointer;transition:background .15s"
      onmouseover="this.style.background='#1d4ed8'" onmouseout="this.style.background='#2563eb'">
      Compare Embeddings
    </button>
    <div id="emb-status" style="display:none;margin-top:.75rem;font-size:.8rem;color:#6b7280;text-align:center"></div>
  </div>

  <!-- results (hidden until computed) -->
  <div id="emb-results" style="display:none;border-top:1px solid #e5e7eb">
    <div style="padding:1.5rem;display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;align-items:center">

      <!-- score panel -->
      <div style="text-align:center">
        <div id="emb-score" style="font-size:3.5rem;font-weight:700;font-family:monospace;letter-spacing:-.02em">0.00</div>
        <div id="emb-badge" style="display:inline-block;margin-top:.5rem;padding:.3rem .85rem;border-radius:999px;font-size:.78rem;font-weight:600"></div>
        <div style="margin-top:.5rem;font-size:.7rem;color:#9ca3af">cosine similarity · −1 to 1</div>
        <div id="emb-dim-info" style="margin-top:.35rem;font-size:.7rem;color:#9ca3af"></div>

        <!-- share + CTA -->
        <div style="margin-top:1.25rem;display:flex;flex-direction:column;gap:.5rem;align-items:center">
          <button id="emb-share-btn" onclick="embShare()"
            style="font-size:.78rem;padding:.4rem 1rem;border-radius:8px;border:1px solid #d1d5db;background:transparent;cursor:pointer;width:100%;max-width:200px">
            📋 Copy shareable link
          </button>
          <div id="emb-cta" style="display:none;width:100%;max-width:240px;border:1.5px solid #f59e0b;border-radius:8px;padding:.65rem;background:#fffbeb;font-size:.72rem;color:#92400e;line-height:1.4;text-align:left">
            <strong>Building a RAG system?</strong><br>
            Get the free <em>RAG Architecture Decision Guide</em> — chunking strategies, embedding model selection, reranking patterns.<br>
            <a href="/guides/llm-cost-optimization" style="color:#b45309;font-weight:600;text-decoration:underline;display:block;margin-top:.4rem">Download free guide →</a>
          </div>
        </div>
      </div>

      <!-- canvas visualization -->
      <div style="display:flex;flex-direction:column;align-items:center;gap:.5rem">
        <canvas id="emb-canvas" width="240" height="240" style="max-width:100%;border-radius:8px"></canvas>
        <div style="font-size:.68rem;color:#9ca3af;text-align:center">vectors projected to 2D unit circle<br>angle = arccos(similarity)</div>
      </div>

    </div>

    <!-- interpretation bar -->
    <div style="padding:0 1.5rem 1.5rem">
      <div style="font-size:.72rem;color:#6b7280;margin-bottom:.4rem">Similarity scale</div>
      <div style="display:flex;height:6px;border-radius:999px;overflow:hidden">
        <div style="flex:1;background:#ef4444"></div>
        <div style="flex:1;background:#f97316"></div>
        <div style="flex:1;background:#eab308"></div>
        <div style="flex:1;background:#84cc16"></div>
        <div style="flex:1;background:#22c55e"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:.65rem;color:#9ca3af;margin-top:.25rem">
        <span>−1 opposite</span><span>0 unrelated</span><span>1 identical</span>
      </div>
      <div id="emb-scale-marker" style="display:none;margin-top:.35rem;font-size:.72rem;color:#374151;font-weight:500"></div>
    </div>
  </div>

</div>
<!-- ═══════════════════════════════════════════════════════════════ -->

<script type="module">
// ── Transformers.js (runs all-MiniLM-L6-v2 in browser via WASM) ──────────────
import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';
env.backends.onnx.wasm.numThreads = 1;

const PRESETS = [
  ['I love dogs', 'I adore dogs'],
  ['Python programming language', 'JavaScript coding'],
  ['quantum physics equations', 'chocolate cake recipe'],
];

let extractor = null;

window.embSetPreset = (i) => {
  document.getElementById('text-a').value = PRESETS[i][0];
  document.getElementById('text-b').value = PRESETS[i][1];
};

// Read URL params on load
const params = new URLSearchParams(location.search);
if (params.get('a')) document.getElementById('text-a').value = decodeURIComponent(params.get('a'));
if (params.get('b')) document.getElementById('text-b').value = decodeURIComponent(params.get('b'));

function cosineSim(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i]*b[i]; na += a[i]*a[i]; nb += b[i]*b[i]; }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

function badge(score) {
  if (score >= 0.95) return ['Near-identical meaning',   '#166534','#dcfce7'];
  if (score >= 0.80) return ['Very similar',             '#14532d','#bbf7d0'];
  if (score >= 0.60) return ['Related topic',            '#713f12','#fef9c3'];
  if (score >= 0.30) return ['Loosely related',          '#7c2d12','#ffedd5'];
  if (score >= 0.00) return ['Unrelated',                '#1e1b4b','#e0e7ff'];
  return                    ['Opposing / contradictory', '#7f1d1d','#fee2e2'];
}

function drawViz(similarity) {
  const canvas = document.getElementById('emb-canvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const cx = W / 2, cy = H / 2;
  const R = Math.min(W, H) * 0.36;

  ctx.clearRect(0, 0, W, H);

  // background
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('color-scheme').includes('dark')
    ? '#111827' : '#f9fafb';
  ctx.fillRect(0, 0, W, H);

  // unit circle
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // axes (light)
  ctx.strokeStyle = '#f3f4f6';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cx - R - 12, cy); ctx.lineTo(cx + R + 12, cy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx, cy - R - 12); ctx.lineTo(cx, cy + R + 12); ctx.stroke();

  // angle between vectors
  const theta = Math.acos(Math.max(-1, Math.min(1, similarity)));

  // angle arc
  if (theta > 0.05) {
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.28, 0, theta, false);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.stroke();
    // arc label
    const midA = theta / 2;
    const lx = cx + R * 0.38 * Math.cos(midA);
    const ly = cy + R * 0.38 * Math.sin(midA);
    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(theta.toFixed(2) + 'rad', lx, ly);
  }

  function drawArrow(angle, color, label) {
    const tx = cx + R * Math.cos(angle);
    const ty = cy + R * Math.sin(angle);
    const hLen = 11;
    const hAngle = Math.atan2(ty - cy, tx - cx);

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(tx, ty);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // arrowhead
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(tx - hLen * Math.cos(hAngle - Math.PI / 6), ty - hLen * Math.sin(hAngle - Math.PI / 6));
    ctx.lineTo(tx - hLen * Math.cos(hAngle + Math.PI / 6), ty - hLen * Math.sin(hAngle + Math.PI / 6));
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    // label at tip
    const offset = 18;
    ctx.fillStyle = color;
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, tx + offset * Math.cos(hAngle), ty + offset * Math.sin(hAngle) + 4);
  }

  // Vector A at angle 0 (right)
  drawArrow(0, '#3b82f6', 'A');
  // Vector B at angle theta (clockwise from A in canvas coords)
  drawArrow(theta, '#10b981', 'B');

  // origin dot
  ctx.beginPath();
  ctx.arc(cx, cy, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#6b7280';
  ctx.fill();
}

window.embCompare = async () => {
  const textA = document.getElementById('text-a').value.trim();
  const textB = document.getElementById('text-b').value.trim();
  if (!textA || !textB) { alert('Enter text in both fields.'); return; }

  const btn = document.getElementById('emb-btn');
  const status = document.getElementById('emb-status');

  btn.disabled = true;
  btn.style.background = '#93c5fd';
  btn.textContent = 'Loading model…';
  status.style.display = 'block';
  status.textContent = 'Downloading all-MiniLM-L6-v2 (~23 MB) — cached after first load…';

  try {
    if (!extractor) {
      extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
        progress_callback: (p) => {
          if (p.status === 'downloading') {
            const pct = p.total ? ((p.loaded / p.total) * 100).toFixed(0) : '…';
            status.textContent = 'Downloading model: ' + pct + '%';
          }
        }
      });
    }

    status.textContent = 'Computing embeddings…';

    const [outA, outB] = await Promise.all([
      extractor(textA, { pooling: 'mean', normalize: true }),
      extractor(textB, { pooling: 'mean', normalize: true }),
    ]);

    const vecA = Array.from(outA.data);
    const vecB = Array.from(outB.data);
    const sim = cosineSim(vecA, vecB);
    const dims = vecA.length;

    // update score
    document.getElementById('emb-score').textContent = sim.toFixed(4);
    const [label, color, bg] = badge(sim);
    const badgeEl = document.getElementById('emb-badge');
    badgeEl.textContent = label;
    badgeEl.style.color = color;
    badgeEl.style.background = bg;

    document.getElementById('emb-dim-info').textContent = dims + ' dimensions · normalized';

    // scale marker
    const marker = document.getElementById('emb-scale-marker');
    marker.style.display = 'block';
    marker.textContent = 'Your score ' + sim.toFixed(4) + ' falls in: ' + label;

    // draw canvas
    drawViz(sim);

    // show CTA after use
    document.getElementById('emb-cta').style.display = 'block';

    document.getElementById('emb-results').style.display = 'block';
    status.style.display = 'none';

  } catch (err) {
    status.textContent = 'Error: ' + err.message;
    console.error(err);
  } finally {
    btn.disabled = false;
    btn.style.background = '#2563eb';
    btn.textContent = 'Compare Embeddings';
  }
};

window.embShare = () => {
  const a = encodeURIComponent(document.getElementById('text-a').value);
  const b = encodeURIComponent(document.getElementById('text-b').value);
  const url = location.origin + location.pathname + '?a=' + a + '&b=' + b;
  navigator.clipboard.writeText(url).then(() => {
    const btn = document.getElementById('emb-share-btn');
    btn.textContent = '✅ Copied!';
    setTimeout(() => { btn.textContent = '📋 Copy shareable link'; }, 2000);
  });
};

// Auto-run if URL params present
if (params.get('a') && params.get('b')) {
  window.embCompare();
}
</script>

---

## How It Works

The tool runs [`all-MiniLM-L6-v2`](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) directly in your browser via [Transformers.js](https://huggingface.co/docs/transformers.js) and WebAssembly. The model (~23 MB) is downloaded once and cached permanently — subsequent runs are instant.

1. Both texts are encoded into **384-dimensional vectors** (normalized to unit length)
2. **Cosine similarity** is computed: `dot(A, B) / (|A| × |B|)`
3. The result is projected onto a **2D unit circle** where the angle between the two arrows equals `arccos(similarity)`

The visualization shows the geometric meaning of cosine similarity: **the smaller the angle between vectors, the more similar the meaning**.

---

## Understanding the Score

| Score | Interpretation | Example pair |
|-------|---------------|-------------|
| `0.95 – 1.00` | Near-identical meaning | "I love dogs" / "I adore dogs" |
| `0.80 – 0.95` | Very similar — paraphrases | "fix the bug" / "resolve the issue" |
| `0.60 – 0.80` | Related topic | "Python programming" / "JavaScript coding" |
| `0.30 – 0.60` | Loosely related | "database indexing" / "cloud storage" |
| `0.00 – 0.30` | Unrelated | "JWT token" / "chocolate cake" |
| `< 0.00` | Opposing / contradictory | "increase performance" / "degrade performance" |

> **Why not 1.0 for identical text?** `all-MiniLM-L6-v2` uses float32 arithmetic — identical inputs should score exactly `1.0000`. Small deviations indicate floating-point rounding in the WASM runtime.

---

## Use This in Your Code

### Python — sentence-transformers (same model, local)

```python
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('all-MiniLM-L6-v2')

texts = ['I love dogs', 'I adore dogs', 'quantum physics equations']
embeddings = model.encode(texts, normalize_embeddings=True)

for i in range(len(texts)):
    for j in range(i + 1, len(texts)):
        score = util.cos_sim(embeddings[i], embeddings[j]).item()
        print(f'{texts[i]!r} ↔ {texts[j]!r}: {score:.4f}')
```

### JavaScript — same model, same library

```javascript
import { pipeline } from '@xenova/transformers';

const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

async function similarity(textA, textB) {
  const [a, b] = await Promise.all([
    extractor(textA, { pooling: 'mean', normalize: true }),
    extractor(textB, { pooling: 'mean', normalize: true }),
  ]);
  const va = Array.from(a.data), vb = Array.from(b.data);
  return va.reduce((s, v, i) => s + v * vb[i], 0); // dot product of normalized vecs = cosine sim
}

console.log(await similarity('I love dogs', 'I adore dogs')); // ~0.97
```

### Python — OpenAI embeddings (higher quality, paid)

```python
from openai import OpenAI
import numpy as np

client = OpenAI()

def embed(text: str) -> list[float]:
    return client.embeddings.create(
        model='text-embedding-3-small',
        input=text
    ).data[0].embedding

def cosine(a, b):
    a, b = np.array(a), np.array(b)
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

print(cosine(embed('I love dogs'), embed('I adore dogs')))  # ~0.97
```

---

## Choosing an Embedding Model

| Model | Dims | Max Tokens | Cost | Best For |
|-------|------|-----------|------|---------|
| `all-MiniLM-L6-v2` | 384 | 256 | Free (in-browser) | Prototyping, client-side tools |
| `text-embedding-3-small` | 1536 | 8191 | $0.02/1M | Production RAG, cost-sensitive |
| `text-embedding-3-large` | 3072 | 8191 | $0.13/1M | Best OpenAI quality |
| `voyage-3` | 1024 | 32000 | $0.06/1M | Top retrieval benchmarks |
| `nomic-embed-text` | 768 | 8192 | Free (local) | Long-context open source |

---

## Related Tools

{{< cards >}}
  {{< card link="../token-counter" title="LLM Token Counter & Cost Estimator" subtitle="Estimate how many tokens your text chunks consume before embedding" >}}
  {{< card link="../rag-chunking-simulator" title="RAG Chunking Simulator" subtitle="Preview how chunking strategies split your document before indexing" >}}
  {{< card link="../model-comparison" title="AI Model Comparison Table" subtitle="Compare embedding models alongside LLMs for cost and capability" >}}
  {{< card link="../system-prompt-analyzer" title="System Prompt Analyzer" subtitle="Score your RAG system prompt for clarity and injection risks" >}}
{{< /cards >}}