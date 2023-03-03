const loadData = () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools));
};

const displayData = (data) => {
  console.log(data);
  const cards = document.getElementById("cards");
  data.forEach((singleData) => {
    const { image, name, description, features, published_in } = singleData;
    const list = features.map((feature) => `<li>${feature}</li>`).join("");
    console.log(singleData);
    cards.innerHTML += `
    <div class="card card-compact w-96 bg-base-100 shadow-xl mx-auto">
      <figure><img src='${image}' alt="Shoes" /></figure>
      <div class="card-body">
        <h3 class="font-bold text-lg">Features</h3>
        <ol class="list-decimal ml-5">
          ${list}
        </ol>
        <hr class="my-5"/>
        <div class="card-actions justify-between">
        <div>
          <h2 class="card-title">${name}</h2>
          <div class="flex items-center gap-3">
            <i class="fa-regular fa-calendar-days"></i>
            <p>${published_in}</p>
          </div>
          </div>
          <button class="btn btn-secondary btn-outline"><i class="fa-solid fa-right-to-bracket"></i></button>
        </div>
      </div>
    </div>
    `;
  });
};

loadData();
