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


const manageSpinner = (status) => {
  if (status) {
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#details-container").classList.add("hidden");
  } else {
    document.querySelector("#details-container").classList.remove("hidden");
    document.querySelector("#spinner").classList.add("hidden");
  }
};


const renderCards = async (status) => {
  manageSpinner(true)
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const response = await fetch(url);
  const data = await response.json();

  if(status === 'All') { 
    activeBtn(status)
    displayCards(data.data);
  }
  else if (status === 'Open') {
    activeBtn(status);
    const openData = data.data
    let openArr = openData.filter(data => data.status === 'open')
    displayCards(openArr)
  }
  else if(status === 'Closed') {
    activeBtn(status);
    const openData = data.data;
    let openArr = openData.filter((data) => data.status === "closed");
    displayCards(openArr);
  }
  else displayCards(data.data);
  manageSpinner(false)
};

const activeBtn= (status)=> {
  const allBtn = document.querySelector("#All")
  const openBtn = document.querySelector("#Open")
  const closedBtn = document.querySelector("#Closed")

  allBtn.classList.remove("btn-primary");
  openBtn.classList.remove("btn-primary");
  closedBtn.classList.remove("btn-primary");

  const target = document.querySelector(`#${status}`)
  target.classList.add("btn-primary");

}

const createElement = (arr) => {
  const htmlElements = arr.map(
    (el) =>
      `<span class="btn text-xs font-light rounded-full bg-[#dab936]">${el.toUpperCase()}</span>`
  );
  return htmlElements.join(" ");
};

const createImage = (status)=> {
  if(status === 'open') return `<img class="w-[24px]" src="./assets/Open-Status.png" alt="" />`;
  else return `<img class="w-[24px]" src="./assets/Closed-Status.png" alt="" />`;
}

const displayCards = (data) => {
  document.querySelector("#total-issues").innerText = data.length
  const cards = document.querySelector("#cards");
  cards.innerHTML = "";

  data.forEach((el) => {
    const card = document.createElement("div");

    card.innerHTML = `
    <div onclick="loadIssueDetail(${el.id})" class="card gap-1 shadow-lg">
  <div class="card-first bg-base-100 rounded-t-md p-4 space-y-3 border-t-4">
    <div class="card-status flex justify-between items-center">
      ${createImage(el.status)}
      <p class="card-p w-20 rounded-full text-center">
        ${el.priority.toUpperCase()}
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

    const cardStatus = card.querySelector(".card-first");

    if (el.status === "open") {
      cardStatus.classList.add("open");
    } else {
      cardStatus.classList.add("closed");
    }

    const cardPriority = card.querySelector(".card-p");

    if(el.priority === "high") cardPriority.classList.add("high")
    else if(el.priority === "medium") cardPriority.classList.add("medium")
    else if (el.priority === "low") cardPriority.classList.add("low")

    cards.append(card);
  });
};



const loadIssueDetail = async (id) => {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  );
  const data = await res.json();
  displayIssueDetails(data.data);
};

const displayIssueDetails = (issue) => {
  const detailsContainer = document.querySelector("#details-container");
  detailsContainer.innerHTML = `
  <div class="space-y-2">
    <h2 class="font-bold text-2xl">Fix broken image uploads</h2>
    <div class="text-[#64748B] flex items-center gap-2 flex-wrap">
      <p class="st-head p-2 text-xs font-medium text-white rounded-full">${issue.status.toUpperCase()}</p>
      <img src="./assets/Ellipse 5.png" alt="">
      <p>Opened by <span>${issue.author}</span></p>
      <img src="./assets/Ellipse 5.png" alt="">
      <p>${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>
    </div>
    </div>
    <div>${createElement(issue.labels)}</div>
    <p class="text-[#64748B] text-base">${issue.description}</p>
    <div class="modal-foot grid grid-cols-2 gap-[10px] p-4 bg-[#F8FAFC]">
      <div class="m-left">
        <p class="text-[#64748B] text-base">Assignee:</p>
        <p class="font-semibold text-base text-[#1F2937]">${
          issue.assignee.length ? issue.assignee : "Unassigned"
        }</p>
      </div>
      <div class="m-right">
        <p class="text-[#64748B] text-base">Priority:</p>
        <p class="modal-pr px-3 py-[6px] text-xs font-medium bg-[#EF4444] inline text-white rounded-full">${issue.priority.toUpperCase()}</p>
      </div>
    </div>
  `;

  if(issue.status === "open")
  {
    detailsContainer.querySelector(".st-head").classList.add("status-open")
  }
  else {
    detailsContainer.querySelector(".st-head").classList.add("status-close");
  }


  if (issue.priority === "high") detailsContainer.querySelector(".modal-pr").classList.add("high-modal");
  else if (issue.priority === "medium") detailsContainer.querySelector(".modal-pr").classList.add("medium-modal");
  else if (issue.priority === "low") detailsContainer.querySelector(".modal-pr").classList.add("low-modal");

  document.querySelector("#issue_modal").showModal();
};


renderCards();
