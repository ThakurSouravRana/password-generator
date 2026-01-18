import React, { useEffect, useState } from "react";
import "./PasswordGen.css";

function PasswordGen() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isSymbol, setIsSymbol] = useState(false);
  const [isCopy, setIsCopy] = useState(true);

  const copyStyle = {
    backgroundColor: "#ef4444",
    color: "white",
  };

  const copiedStyle = {
    backgroundColor: "#22c55e",
    color: "white",
  };

  function passwordGenerator() {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (isNumber) chars += "0123456789";
    if (isSymbol) chars += "!@#$%^&*()[]{}";

    let generated = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generated += chars[randomIndex];
    }
    return generated;
  }

  useEffect(() => {
    setPassword(passwordGenerator());
    setIsCopy(true);
  }, [length, isNumber, isSymbol]);

  function handleCopy() {
    navigator.clipboard.writeText(password);
    setIsCopy(false);

    setTimeout(() => setIsCopy(true), 1500);
  }

  return (
    <div className="password-container">
      <h1>{password}</h1>

      <div className="controls">
        <label>Password Length : {length}</label>
        <input
          type="range"
          min={8}
          max={30}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </div>

      <div className="options">
        <label>
          <input
            type="checkbox"
            checked={isNumber}
            onChange={() => setIsNumber(!isNumber)}
          />
          Numbers
        </label>

        <label>
          <input
            type="checkbox"
            checked={isSymbol}
            onChange={() => setIsSymbol(!isSymbol)}
          />
          Symbols
        </label>
      </div>

      <button
        style={isCopy ? copyStyle : copiedStyle}
        onClick={handleCopy}
      >
        {isCopy ? "Copy Password" : "Copied ✓"}
      </button>
    </div>
  );
}

export default PasswordGen;
