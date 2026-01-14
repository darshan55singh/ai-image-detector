async function checkImage() {
  const fileInput = document.getElementById("imageInput");
  const resultDiv = document.getElementById("result");

  if (!fileInput.files.length) {
    resultDiv.innerHTML = "❌ Please upload an image";
    resultDiv.style.color = "red";
    return;
  }

  const formData = new FormData();
  formData.append("image", fileInput.files[0]);

  resultDiv.innerHTML = "🔍 Analyzing image...";
  resultDiv.style.color = "#00ffcc";

  try {
    const response = await fetch(
      "https://ai-image-detector-backend-z55k.onrender.com/detect",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();

    console.log("BACKEND RESPONSE:", data); // 🔥 IMPORTANT

    resultDiv.innerHTML = `
      <b>${data.result}</b><br>
      Confidence: ${data.confidence}
    `;

  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = "❌ Backend error";
    resultDiv.style.color = "red";
  }
}
