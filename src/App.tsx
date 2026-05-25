import { useState } from "react";

const COLORS = {
  bg: "#0f0e17",
  surface: "#1a1828",
  card: "#211f30",
  accent: "#f7c94b",
  success: "#4ade80",
  error: "#f87171",
  text: "#fffffe",
  muted: "#a7a9be",
  border: "#2e2c3e",
};

const QUESTIONS = [
  { a: 367, b: 245, op: "+", answer: 612 },
  { a: 528, b: 174, op: "+", answer: 702 },
  { a: 843, b: 257, op: "−", answer: 586 },
  { a: 921, b: 486, op: "−", answer: 435 },
  { a: 132, b: 215, op: "×", answer: 28380 },
  { a: 204, b: 136, op: "×", answer: 27744 },
];

const SECTIONS = [
  { label: "Penjumlahan (3 digit)", indices: [0, 1] },
  { label: "Pengurangan (3 digit)", indices: [2, 3] },
  { label: "Perkalian (3 digit)", indices: [4, 5] },
];

const opColor = { "+": "#60a5fa", "−": "#f472b6", "×": "#a78bfa" };

const GRADES = [
  "Ayo berlatih lagi!",
  "Ayo berlatih lagi!",
  "Ayo berlatih lagi!",
  "Bagus!",
  "Hebat!",
  "Hebat!",
  "Sempurna! 🎉",
];

export default function MathQuiz() {
  const [inputs, setInputs] = useState(Array(6).fill(""));
  const [result, setResult] = useState(null);

  const allFilled = inputs.every((v) => v.trim() !== "");

  const handleChange = (i, val) => {
    if (result) return;
    setInputs((prev) => {
      const next = [...prev];
      next[i] = val;
      return next;
    });
  };

  const handleSubmit = () => {
    if (!allFilled || result) return;
    const checked = QUESTIONS.map((q, i) => {
      const userAnswer = parseInt(inputs[i].trim(), 10);
      return { ...q, userAnswer, correct: userAnswer === q.answer };
    });
    setResult(checked);
    const allCorrect = checked.every((r) => r.correct);
    if (allCorrect) {
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  };

  const handleRestart = () => {
    setInputs(Array(6).fill(""));
    setResult(null);
  };

  const score = result ? result.filter((r) => r.correct).length : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2.5rem 1rem",
        boxSizing: "border-box",
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
            fontWeight: "700",
            color: COLORS.accent,
            letterSpacing: "0.08em",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          POS 1
        </h1>
        <p
          style={{
            fontSize: "0.78rem",
            color: COLORS.muted,
            letterSpacing: "0.15em",
            marginTop: "0.4rem",
            textTransform: "uppercase",
          }}
        >
          Penjumlahan · Pengurangan · Perkalian
        </p>
      </div>

      {/* Score banner */}
      {result && (
        <div
          style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: "14px",
            padding: "1.2rem 2rem",
            marginBottom: "1.5rem",
            textAlign: "center",
            width: "100%",
            maxWidth: "560px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontSize: "clamp(2.5rem, 10vw, 4rem)",
              fontWeight: "700",
              color: COLORS.accent,
              lineHeight: 1,
            }}
          >
            {score}/6
          </div>
          <div
            style={{
              color: COLORS.muted,
              fontSize: "0.8rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginTop: "0.3rem",
            }}
          >
            {GRADES[score]}
          </div>
          {score === 6 && (
            <div
              style={{
                marginTop: "1rem",
                padding: "0.8rem 1rem",
                background: COLORS.surface,
                border: `1px solid ${COLORS.success}`,
                borderRadius: "10px",
                color: COLORS.success,
                fontSize: "0.85rem",
                fontWeight: "700",
                letterSpacing: "0.05em",
                lineHeight: "1.5",
              }}
            >
              🔓 Gabungkan semua jawaban untuk membuka kode soal pos ke 2
            </div>
          )}
        </div>
      )}

      {/* Questions */}
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          display: "flex",
          flexDirection: "column",
          gap: "0",
        }}
      >
        {SECTIONS.map((section) => (
          <div key={section.label}>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: "700",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: COLORS.muted,
                margin: "1.2rem 0 0.5rem",
              }}
            >
              {section.label}
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.7rem",
              }}
            >
              {section.indices.map((qi) => {
                const q = QUESTIONS[qi];
                const res = result ? result[qi] : null;
                const borderColor = res
                  ? res.correct
                    ? COLORS.success
                    : COLORS.error
                  : COLORS.border;

                return (
                  <div
                    key={qi}
                    style={{
                      background: COLORS.card,
                      border: `1px solid ${borderColor}`,
                      borderRadius: "14px",
                      padding: "1.1rem 1.4rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      flexWrap: "wrap",
                      transition: "border-color 0.3s",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: COLORS.muted,
                        letterSpacing: "0.15em",
                        minWidth: "20px",
                      }}
                    >
                      {qi + 1}.
                    </span>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        flex: "1 1 auto",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "clamp(1.3rem, 4vw, 1.7rem)",
                          fontWeight: "700",
                          color: COLORS.text,
                        }}
                      >
                        {q.a}
                      </span>
                      <span
                        style={{
                          fontSize: "clamp(1.3rem, 4vw, 1.7rem)",
                          fontWeight: "700",
                          color: opColor[q.op],
                        }}
                      >
                        {q.op}
                      </span>
                      <span
                        style={{
                          fontSize: "clamp(1.3rem, 4vw, 1.7rem)",
                          fontWeight: "700",
                          color: COLORS.text,
                        }}
                      >
                        {q.b}
                      </span>
                      <span
                        style={{
                          fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
                          color: COLORS.muted,
                        }}
                      >
                        =
                      </span>
                    </div>

                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="?"
                      value={inputs[qi]}
                      onChange={(e) => handleChange(qi, e.target.value)}
                      disabled={!!result}
                      style={{
                        width: "110px",
                        background: COLORS.surface,
                        border: `1.5px solid ${
                          res ? borderColor : COLORS.border
                        }`,
                        borderRadius: "8px",
                        color: res
                          ? res.correct
                            ? COLORS.success
                            : COLORS.error
                          : COLORS.text,
                        fontSize: "1.2rem",
                        padding: "0.5rem 0.75rem",
                        outline: "none",
                        fontFamily: "inherit",
                        fontWeight: "700",
                        textAlign: "center",
                        boxSizing: "border-box",
                      }}
                    />

                    {res && (
                      <div
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: "700",
                          letterSpacing: "0.05em",
                          color: res.correct ? COLORS.success : COLORS.error,
                          minWidth: "fit-content",
                        }}
                      >
                        {res.correct ? "✓ Benar" : "✗ Salah"}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Tombol */}
      <div style={{ marginTop: "1.8rem", width: "100%", maxWidth: "560px" }}>
        {!result ? (
          <button
            onClick={handleSubmit}
            disabled={!allFilled}
            style={{
              width: "100%",
              padding: "0.9rem",
              borderRadius: "12px",
              border: "none",
              background: allFilled ? COLORS.accent : COLORS.border,
              color: allFilled ? COLORS.bg : COLORS.muted,
              fontFamily: "inherit",
              fontWeight: "700",
              fontSize: "1rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: allFilled ? "pointer" : "not-allowed",
              opacity: allFilled ? 1 : 0.6,
              transition: "background 0.2s, opacity 0.2s",
            }}
          >
            Periksa Semua Jawaban
          </button>
        ) : (
          <button
            onClick={handleRestart}
            style={{
              width: "100%",
              padding: "0.9rem",
              borderRadius: "12px",
              border: "none",
              background: COLORS.accent,
              color: COLORS.bg,
              fontFamily: "inherit",
              fontWeight: "700",
              fontSize: "1rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Mulai Ulang
          </button>
        )}
      </div>

      {!result && (
        <p
          style={{
            color: COLORS.muted,
            fontSize: "0.72rem",
            marginTop: "1rem",
            letterSpacing: "0.1em",
          }}
        >
          Isi semua jawaban lalu klik periksa
        </p>
      )}
    </div>
  );
}
