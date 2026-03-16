// assignee: "jane_smith";
// author: "john_doe";
// createdAt: "2024-01-15T10:30:00Z";
// description: "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.";
// id: 1;
// labels: (2)[("bug", "help wanted")];
// priority: "high";
// status: "open";
// title: "Fix navigation menu on mobile devices";
// updatedAt: "2024-01-15T10:30:00Z";

const renderCards = async () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const response = await fetch(url);
  const data = await response.json();
  displayCards(data.data);
};

const createElement = (arr) => {
  const htmlElements = arr.map(
    (el) =>
      `<span class="btn text-xs font-light rounded-full bg-[#dab936]">${el.toUpperCase()}</span>`
  );
  return htmlElements.join(" ");
};

const displayCards = (data) => {
  const cards = document.querySelector("#cards");
  cards.innerHTML = "";

  data.forEach((el) => {
    const card = document.createElement("div");

    card.innerHTML = `
    <div class="card gap-1 shadow-lg">
  <div class="card-first bg-base-100 rounded-t-md p-4 space-y-3 border-t-4">
    <div class="card-status flex justify-between items-center">
      <img class="w-[24px]" src="./assets/Open-Status.png" alt="" />
      <p class="w-20 text-[#EF4444] bg-[#FEECEC] rounded-full text-center">
        High
      </p>
    </div>
    <div class="card-info space-y-2">
      <h2 class="text-[#1F2937] text-sm font-semibold">
        ${el.title}
      </h2>
      <p class="text-xs text-[#64748B]">
        ${el.description}
      </p>
    </div>
    <div class="card-labels flex gap-1 flex-wrap">${createElement(
      el.labels
    )}</div>
  </div>
  <div class="card-second bg-base-100 p-4 rounded-b-md flex justify-between">
  <div class="space-y-4">
    <p class="text-xs text-[#64748B]"><span>${el.id}</span> by ${el.author}</p>
    <p class="text-xs text-[#64748B]">Assignee: <span>${
      el.assignee.length ? el.assignee : "Unassigned"
    }</span></p>
  </div>
  <div class="space-y-4">
    <p class="text-xs text-[#64748B]">${new Date(
      el.createdAt
    ).toLocaleDateString("en-US")}</p>
    <p class="text-xs text-[#64748B]">Updated: <span>${new Date(
      el.updatedAt
    ).toLocaleDateString("en-US")}</span></p>
  </div>
  </div>
</div>
    `;

    cards.append(card);
  });
};

renderCards();
