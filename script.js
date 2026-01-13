async function checkImage() {
  const fileInput = document.getElementById("imageInput");
  const result = document.getElementById("result");

  if (!fileInput.files.length) {
    result.innerHTML = "❌ Please upload an image first.";
    result.style.color = "red";
    return;
  }

  const formData = new FormData();
  formData.append("image", fileInput.files[0]);

  result.innerHTML = "🔍 Checking image...";
  result.style.color = "#00ffcc";

  try {
    const response = await fetch(
      "https://ai-image-detector-backend.onrender.com/detect",
      {
        method: "POST",
        body: formData
      }
    );

    if (!response.ok) {
      throw new Error("API failed");
    }

    const data = await response.json();

    result.innerHTML = `
      ✅ ${data.result}<br>
      Confidence: ${data.confidence}%
    `;
    result.style.color = "#00ffcc";

  } catch (error) {
    console.error(error);
    result.innerHTML = "❌ Backend not responding";
    result.style.color = "red";
  }
}
