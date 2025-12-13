import React, { useState } from "react";
import Layout from "./../components/Layout";
import { Button, TextField } from "@mui/material";



const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Home() {
  const [text, setText] = useState("");
  const [intent, setIntent] = useState("");
  const [confidence, setConfidence] = useState("");   // ✅ NEW
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeEmail = async () => {
    if (!text.trim()) {
      alert("Please enter email text");
      return;
    }

    setLoading(true);
    setError("");
    setIntent("");
    setConfidence("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });

      if (!res.ok) throw new Error("Backend error");

      const data = await res.json();
      setIntent(data.intent);
      setConfidence(data.confidence);  // ✅ save confidence

    } catch (err) {
      setError("❌ Failed to analyze email. Is backend or ML service running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
    <div style={{ padding: "40px", maxWidth: "700px", margin: "auto", fontFamily: "Arial" }}>
      <h1>📧 Email Intent Classifier</h1>

      <TextField
        label="Enter email text"
        multiline
        rows={8}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ marginBottom: 2 }}
      />


      <Button 
        variant="contained" 
        color="primary"
        onClick={analyzeEmail}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </Button>

      {/* Error */}
      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}

      {/* Result */}
      {intent && (
        <div style={{ marginTop: "30px" }}>
          <h2>
            Predicted Intent:
            <span style={{ color: "green" }}> {intent}</span>
          </h2>

          {/* Display confidence */}
          <p style={{ fontSize: "18px" }}>
            Confidence: <strong>{(confidence * 100).toFixed(2)}%</strong>
          </p>
        </div>
      )}
    </div>
    </Layout>
  );
}

export default Home;
