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

  result.innerHTML = "🔍 Analyzing image...";

  try {
    const response = await fetch(
      "https://ai-image-detector-backend-z55k.onrender.com/detect",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();

    result.innerHTML = `
      <b>${data.result}</b><br>
      Confidence: ${data.confidence}
    `;
    result.style.color = "#00ffcc";

  } catch (err) {
    console.error(err);
    result.innerHTML = "❌ Backend not responding";
    result.style.color = "red";
  }
}
