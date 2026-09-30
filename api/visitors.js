<script>
async function trackVisitor() {
  let visitorId = localStorage.getItem("tomato_visitor_id");

  // First time this browser visits
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("tomato_visitor_id", visitorId);
  }

  try {
    const response = await fetch("/api/visitors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        visitorId: visitorId
      })
    });

    const data = await response.json();

    if (data.count !== undefined) {
      document.getElementById("users").textContent = data.count;
    }

  } catch (error) {
    console.error("Visitor counter error:", error);
  }
}

trackVisitor();
</script>
