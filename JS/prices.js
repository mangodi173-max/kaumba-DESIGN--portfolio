const items = [
  "Web Development",
  "Logo Design",
  "Branding",
  "Photo Editing",
  "Video Editing",
  "Banner Design",
  "SEO Optimization",
  "Content Writing",
  "Social Media Management",
  "UI/UX Design",
  "Copywriting",
  "App Development"
];

const tbody = document.querySelector("#pricingTable tbody");

items.forEach((item, index) => {
  const row = document.createElement("tr");

  const col1 = document.createElement("td");
  col1.textContent = item;

  const col2 = document.createElement("td");
  col2.textContent = "-";

  const col3 = document.createElement("td");
  col3.textContent = "-";

  row.appendChild(col1);
  row.appendChild(col2);
  row.appendChild(col3);

  tbody.appendChild(row);
});

const messageRow = document.createElement("tr");
messageRow.className = "message-row";

const messageCell = document.createElement("td");
messageCell.colSpan = 3;

const messageLink = document.createElement("a");
messageLink.className = "send-message-btn";
messageLink.href = "https://wa.me/254119213772";
messageLink.target = "_blank";
messageLink.rel = "noopener noreferrer";
messageLink.textContent = "Send Message on WhatsApp";

messageCell.appendChild(messageLink);
messageRow.appendChild(messageCell);
tbody.appendChild(messageRow);