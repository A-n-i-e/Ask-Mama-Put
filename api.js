export async function askMamaPut(question) {
  const res = await fetch("http://127.0.0.1:8000/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: question }),
  });

  const data = await res.json();
  return data.response;
}
