async function checkImage() {
  const input = document.getElementById("imageInput");
  const result = document.getElementById("result");

  if (input.files.length === 0) {
    result.innerText = "❌ Please upload an image first.";
    result.style.color = "red";
    return;
  }

  result.innerText = "🔍 Analyzing image...";
  result.style.color = "white";

  const file = input.files[0];

  const response = await fetch(
    "https://api-inference.huggingface.co/models/umm-maybe/AI-image-detector",
    {
      method: "POST",
      headers: {
        "Authorization": "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"
      },
      body: file
    }
  );

  const data = await response.json();

  if (data.error) {
    result.innerText = "⚠️ Error analyzing image.";
    result.style.color = "red";
    return;
  }

  const score = data[0].score;

  if (score > 0.5) {
    result.innerText = "🤖 AI-Generated Image Detected";
    result.style.color = "orange";
  } else {
    result.innerText = "✅ Real Image Detected";
    result.style.color = "lightgreen";
  }
}
