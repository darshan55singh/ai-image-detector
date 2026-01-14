async function checkImage() {
  const file = document.getElementById("imageInput").files[0];
  const result = document.getElementById("result");

  if (!file) {
    result.innerHTML = "❌ Upload an image first";
    return;
  }

  result.innerHTML = "🔍 AI analyzing image...";

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(
      "https://ai-image-detector-backend-z55k.onrender.com",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();

    result.innerHTML = `
      <b>${data.label}</b><br>
      Confidence: ${data.confidence}
    `;
  } catch (e) {
    result.innerHTML = "❌ AI service not responding";
  }
}
