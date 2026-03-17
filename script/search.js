document.querySelector("#btn-search").addEventListener("click", async () => {
  removeActive();
  const input = document.querySelector("#input-search");
  const searchValue = input.value.trim().toLowerCase();
  input.value = ""

  const url = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`
  );
  const res = await url.json();

  const resIssues = res.data;


  const filterIssues = resIssues.filter((issue) =>
    issue.title.toLowerCase().includes(searchValue)
  );

  displayCards(filterIssues)

});
