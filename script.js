const input = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const result = document.getElementById("result");

input.addEventListener("change", () => {
  const file = input.files[0];
  if (!file) return;

  preview.src = URL.createObjectURL(file);
  preview.style.display = "block";
  result.innerHTML = "";
});

async function checkImage() {
  if (!input.files.length) {
    result.innerHTML = "❌ Please upload an image first.";
    result.className = "result error";
    return;
  }

  result.innerHTML = "⏳ Analyzing image...";
  result.className = "result";

  const formData = new FormData();
  formData.append("image", input.files[0]);

  try {
    const res = await fetch(
      "https://ai-image-detector-backend-z55k.onrender.com/detect",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();

    if (data.result.includes("AI")) {
      result.className = "result warning";
    } else {
      result.className = "result success";
    }

    result.innerHTML = `${data.result}<br>Confidence: ${data.confidence}`;
  } catch (e) {
    result.innerHTML = "❌ AI service unavailable.";
    result.className = "result error";
  }
}
