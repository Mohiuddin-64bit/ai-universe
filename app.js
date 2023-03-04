const loadData = () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools));
};

const displayData = (data) => {
  // console.log(data);
  const cards = document.getElementById("cards");
  data.forEach((allData) => {
    const { image, name, features, published_in, id } = allData;
    const list = features.map((feature) => `<li>${feature}</li>`).join("");
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
          <label for="ai-modal" onclick="singleData('${id}')" class="btn btn-secondary btn-outline"><i class="fa-solid fa-right-to-bracket"></i></label>
        </div>
      </div>
    </div>
    `;
  });
};

// Data for Modal section

const singleData = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => singleDataDisplay(data.data));
};

const singleDataDisplay = (data) => {
  console.log(data);
  const {image_link,description,published_in,pricing,id,} = data;
  const PricingSection = pricing.map((item) => `<div class="text-center bg-pink-300 text-pink-500 rounded">${item.price} ${item.plan} </div>`).join('');
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
  <div class="grid grid-cols-2 p-12">
    <div class="w-56">
      <h3 class="font-bold text-lg">${description}</h3>
    </div>
    <div class="mx-auto">
      <img class="w-56" src="${image_link[0]}" />
    </div>
    <div class="flex gap-2">
      ${PricingSection}
    </div>
    <div id="modal-action" class="modal-action">
      <label for="ai-modal" class="btn btn-secondary btn-outline">close!</label>
    </div>

  </div>
  `;
};

loadData();
