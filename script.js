const analyzeBtn = document.getElementById("analyzeBtn");
const imageInput = document.getElementById("imageInput");
const loading = document.getElementById("loading");
const resultText = document.getElementById("resultText");
const confidenceText = document.getElementById("confidenceText");
const progressBar = document.getElementById("progressBar");

analyzeBtn.addEventListener("click", () => {
  const file = imageInput.files[0];
  if (!file) {
    alert("Please select an image");
    return;
  }

  loading.classList.remove("hidden");
  resultText.textContent = "";
  confidenceText.textContent = "";
  progressBar.style.width = "0%";

  setTimeout(() => {
    loading.classList.add("hidden");

    // Demo AI logic
    const sizeMB = file.size / (1024 * 1024);
    let confidence;

    if (sizeMB < 0.5) confidence = 78;
    else if (sizeMB < 1.5) confidence = 55;
    else confidence = 35;

    const isAI = confidence > 60;

    resultText.textContent = isAI
      ? "⚠️ Likely AI-Generated Image"
      : "✅ Likely Real Image";

    confidenceText.textContent = `Confidence: ${confidence}%`;
    progressBar.style.width = confidence + "%";

  }, 1500);
});
