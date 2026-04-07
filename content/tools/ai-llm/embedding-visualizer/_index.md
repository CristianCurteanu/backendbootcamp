---
title: 'Embedding Dimension Visualizer'
linkTitle: 'Embedding Visualizer'
description: 'Understand vector embeddings and cosine similarity with visual examples, code snippets, and embedding model comparisons. Free reference for AI engineers.'
date: '2026-01-01'
lastmod: '2026-04-01'
toc: true
---

Vector embeddings turn text into numbers — and cosine similarity measures how "close" two pieces of text are in meaning. This page explains how both work, how to compute them, and how to choose the right embedding model for your use case.

---

## What Is a Vector Embedding?

An embedding is a fixed-length array of floating-point numbers that represents the semantic meaning of a piece of text. The key property: **semantically similar text produces numerically similar vectors**.

```
"I love dogs"   → [0.21, -0.54, 0.88, 0.03, ...]   (1536 numbers)
"I adore dogs"  → [0.23, -0.51, 0.85, 0.04, ...]   (1536 numbers)
"Python syntax" → [-0.67, 0.12, -0.33, 0.91, ...]  (1536 numbers)
```

The first two are close together. The third is far away. That "closeness" is measured with cosine similarity.

---

## What Is Cosine Similarity?

Cosine similarity measures the angle between two vectors. The result is always between **-1** (opposite meaning) and **1** (identical meaning):

| Score | Meaning |
|-------|---------|
| `0.95–1.00` | Near-identical meaning |
| `0.80–0.95` | Very similar — paraphrases, synonyms |
| `0.60–0.80` | Related topic area |
| `0.30–0.60` | Loosely related |
| `0.00–0.30` | Unrelated |
| `< 0` | Opposing/contradictory concepts |

**Formula:**

```
cosine_similarity(A, B) = (A · B) / (|A| × |B|)
```

Where `A · B` is the dot product and `|A|`, `|B|` are the vector magnitudes.

### Why Cosine, Not Euclidean Distance?

Euclidean distance is sensitive to the *magnitude* of vectors. Cosine similarity only cares about *direction* — which means two sentences of different lengths but identical meaning still score ~1.0. For text, that's almost always what you want.

---

## Compute Cosine Similarity in Code

### Python — NumPy

```python
import numpy as np

def cosine_similarity(a: list[float], b: list[float]) -> float:
    a, b = np.array(a), np.array(b)
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

# Example
vec_a = [0.21, -0.54, 0.88, 0.03]
vec_b = [0.23, -0.51, 0.85, 0.04]
print(cosine_similarity(vec_a, vec_b))  # → ~0.998
```

### Python — with OpenAI embeddings

```python
from openai import OpenAI
import numpy as np

client = OpenAI()

def get_embedding(text: str) -> list[float]:
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text,
    )
    return response.data[0].embedding

def cosine_similarity(a: list[float], b: list[float]) -> float:
    a, b = np.array(a), np.array(b)
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

a = get_embedding("I love dogs")
b = get_embedding("I adore dogs")
c = get_embedding("Python syntax rules")

print(cosine_similarity(a, b))  # → ~0.97
print(cosine_similarity(a, c))  # → ~0.30
```

### Python — with Anthropic embeddings (via Voyage AI)

```python
import voyageai

vo = voyageai.Client()

result = vo.embed(
    ["I love dogs", "I adore dogs"],
    model="voyage-3",
    input_type="document",
)

embeddings = result.embeddings  # list of float arrays
```

### Python — with local models (sentence-transformers)

```python
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer("all-MiniLM-L6-v2")  # 80MB, runs on CPU

sentences = ["I love dogs", "I adore dogs", "Python syntax rules"]
embeddings = model.encode(sentences)

# Pairwise similarity
for i in range(len(sentences)):
    for j in range(i + 1, len(sentences)):
        score = util.cos_sim(embeddings[i], embeddings[j]).item()
        print(f"{sentences[i]!r} ↔ {sentences[j]!r}: {score:.3f}")
```

---

## Embedding Model Comparison

| Model | Provider | Dimensions | Max Tokens | Cost ($/1M tokens) | Strengths |
|-------|----------|-----------|-----------|-------------------|-----------|
| `text-embedding-3-large` | OpenAI | 3072 | 8191 | $0.13 | Best OpenAI quality |
| `text-embedding-3-small` | OpenAI | 1536 | 8191 | $0.02 | Fast, cheap, good quality |
| `voyage-3` | Voyage AI (Anthropic) | 1024 | 32000 | $0.06 | Top retrieval benchmarks |
| `voyage-3-lite` | Voyage AI | 512 | 32000 | $0.02 | Fast, low cost |
| `embed-english-v3.0` | Cohere | 1024 | 512 | $0.10 | Strong English retrieval |
| `embed-multilingual-v3.0` | Cohere | 1024 | 512 | $0.10 | 100+ languages |
| `gemini-embedding-exp-03-07` | Google | 3072 | 8192 | — | State-of-art MTEB score |
| `all-MiniLM-L6-v2` | Sentence Transformers | 384 | 256 | Free | Local, CPU-friendly |
| `bge-large-en-v1.5` | BAAI | 1024 | 512 | Free | Strong open-source quality |
| `nomic-embed-text` | Nomic | 768 | 8192 | Free | Long context, open source |

**Choosing by use case:**

| Use Case | Recommended Model |
|----------|------------------|
| Production RAG (English) | `voyage-3` or `text-embedding-3-large` |
| High-volume RAG (cost-sensitive) | `text-embedding-3-small` or `voyage-3-lite` |
| Multilingual RAG | `embed-multilingual-v3.0` (Cohere) |
| Local / air-gapped | `nomic-embed-text` (8K context) or `bge-large-en-v1.5` |
| Prototyping / experiments | `all-MiniLM-L6-v2` (fast, free, CPU) |

---

## Dimensionality Reduction for Visualization

Embedding vectors have hundreds or thousands of dimensions — impossible to visualize directly. Two algorithms reduce them to 2D or 3D for plotting:

### PCA (Principal Component Analysis)

Fast, deterministic. Good for a quick look. Preserves global structure.

```python
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
from openai import OpenAI
import numpy as np

client = OpenAI()

texts = [
    "machine learning", "deep learning", "neural networks",
    "SQL queries", "database indexing", "PostgreSQL",
    "Docker containers", "Kubernetes", "CI/CD pipelines",
]

embeddings = [
    client.embeddings.create(model="text-embedding-3-small", input=t).data[0].embedding
    for t in texts
]

pca = PCA(n_components=2)
coords = pca.fit_transform(embeddings)

plt.figure(figsize=(8, 6))
for (x, y), label in zip(coords, texts):
    plt.scatter(x, y)
    plt.annotate(label, (x, y), fontsize=9)

plt.title("Text embeddings projected to 2D (PCA)")
plt.tight_layout()
plt.savefig("embeddings_pca.png")
```

### t-SNE

Slower, non-deterministic. Better at preserving local cluster structure — related concepts clump together more visually.

```python
from sklearn.manifold import TSNE

tsne = TSNE(n_components=2, perplexity=5, random_state=42)
coords = tsne.fit_transform(np.array(embeddings))
```

**Rule of thumb:** Use PCA for quick checks during development. Use t-SNE for exploratory analysis of large embedding datasets (>500 vectors).

---

## Practical Patterns

### Semantic Search

```python
import numpy as np

def semantic_search(query_embedding, doc_embeddings, texts, top_k=3):
    scores = [
        cosine_similarity(query_embedding, doc_emb)
        for doc_emb in doc_embeddings
    ]
    ranked = sorted(zip(scores, texts), reverse=True)
    return ranked[:top_k]
```

### Clustering Documents

```python
from sklearn.cluster import KMeans

kmeans = KMeans(n_clusters=5, random_state=42)
labels = kmeans.fit_predict(np.array(embeddings))

for label, text in zip(labels, texts):
    print(f"Cluster {label}: {text}")
```

### Deduplication

```python
DEDUP_THRESHOLD = 0.95

def find_near_duplicates(embeddings, texts, threshold=DEDUP_THRESHOLD):
    duplicates = []
    for i in range(len(embeddings)):
        for j in range(i + 1, len(embeddings)):
            score = cosine_similarity(embeddings[i], embeddings[j])
            if score >= threshold:
                duplicates.append((texts[i], texts[j], score))
    return duplicates
```

---

## Common Pitfalls

**Mixing embedding models** — Never compare vectors from different models. A `voyage-3` embedding and a `text-embedding-3-small` embedding of the same text are in completely different vector spaces. If you change models, re-embed your entire corpus.

**Token truncation** — Most embedding models have a token limit (256–8192 tokens). Text exceeding the limit is silently truncated. For long documents, chunk first, embed chunks, then aggregate (average pooling is common).

**Normalizing vectors** — Many vector databases (Pinecone, Weaviate, pgvector) assume unit-normalized vectors. OpenAI's embeddings are already normalized. For local models, normalize explicitly:

```python
def normalize(vec: list[float]) -> list[float]:
    arr = np.array(vec)
    return (arr / np.linalg.norm(arr)).tolist()
```

**Sentence vs. document embeddings** — Models like `all-MiniLM-L6-v2` are optimized for short sentences. For long documents, use a model with a larger token limit (`nomic-embed-text`, `voyage-3`), or chunk and average-pool.

---

## Related Tools

{{< cards >}}
  {{< card link="../token-counter" title="LLM Token Counter & Cost Estimator" subtitle="Estimate how many tokens your text chunks will consume before embedding" >}}
  {{< card link="../rag-chunking-simulator" title="RAG Chunking Simulator" subtitle="Preview how chunking strategies split your document before embedding" >}}
  {{< card link="../model-comparison" title="AI Model Comparison Table" subtitle="Compare embedding models alongside LLMs for cost and capability" >}}
  {{< card link="../system-prompt-analyzer" title="System Prompt Analyzer" subtitle="Score your RAG system prompt for clarity and injection risks" >}}
{{< /cards >}}